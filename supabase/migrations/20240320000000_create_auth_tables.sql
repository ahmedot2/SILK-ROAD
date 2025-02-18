-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create roles table
CREATE TABLE roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  permissions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create users table
CREATE TABLE users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  address TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  role_id TEXT REFERENCES roles(id) NOT NULL,
  kyc_status TEXT NOT NULL DEFAULT 'none',
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create wallet_nonces table for Web3 authentication
CREATE TABLE wallet_nonces (
  address TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_kyc table for KYC/AML verification
CREATE TABLE user_kyc (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  document_type TEXT NOT NULL,
  document_number TEXT NOT NULL,
  document_url TEXT NOT NULL,
  verification_notes TEXT,
  verified_by UUID REFERENCES users(id),
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create sessions table for session management
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  token TEXT NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default roles with permissions
INSERT INTO roles (id, name, permissions) VALUES
  ('admin', 'admin', '[
    "*",
    "manage:users",
    "manage:kyc",
    "manage:roles"
  ]'),
  ('user', 'user', '[
    "read:profile",
    "write:profile",
    "create:orders",
    "read:orders"
  ]'),
  ('merchant', 'merchant', '[
    "read:profile",
    "write:profile",
    "create:listing",
    "manage:listing",
    "read:orders",
    "manage:orders"
  ]');

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_nonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_kyc ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid()::text = id::text);

CREATE POLICY "Admins can read all profiles"
  ON users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM users u
    WHERE u.id::text = auth.uid()::text
    AND u.role_id = 'admin'
  ));

-- Wallet nonces policies
CREATE POLICY "Anyone can create nonces"
  ON wallet_nonces FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can read nonces"
  ON wallet_nonces FOR SELECT
  USING (true);

CREATE POLICY "Only owners can delete their nonces"
  ON wallet_nonces FOR DELETE
  USING (address = current_user);

-- KYC policies
CREATE POLICY "Users can read their own KYC"
  ON user_kyc FOR SELECT
  USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can create their own KYC"
  ON user_kyc FOR INSERT
  WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Admins can read and manage all KYC"
  ON user_kyc FOR ALL
  USING (EXISTS (
    SELECT 1 FROM users u
    WHERE u.id::text = auth.uid()::text
    AND u.role_id = 'admin'
  ));

-- Sessions policies
CREATE POLICY "Users can manage their own sessions"
  ON sessions FOR ALL
  USING (auth.uid()::text = user_id::text);

-- Create storage bucket for KYC documents
INSERT INTO storage.buckets (id, name, public) VALUES ('kyc-documents', 'KYC Documents', false);

-- Storage policies for KYC documents
CREATE POLICY "Users can upload their own KYC documents"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own KYC documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'kyc-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can read all KYC documents"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'kyc-documents' AND EXISTS (
    SELECT 1 FROM users u
    WHERE u.id::text = auth.uid()::text
    AND u.role_id = 'admin'
  ));
