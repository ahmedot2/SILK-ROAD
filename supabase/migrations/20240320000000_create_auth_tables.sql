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

-- Create wallet_nonces table
CREATE TABLE wallet_nonces (
  address TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create user_kyc table
CREATE TABLE user_kyc (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  document_type TEXT NOT NULL,
  document_number TEXT NOT NULL,
  document_url TEXT NOT NULL,
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert default roles
INSERT INTO roles (id, name, permissions) VALUES
  ('admin', 'admin', '["*"]'),
  ('user', 'user', '["read:profile", "write:profile"]'),
  ('merchant', 'merchant', '["read:profile", "write:profile", "create:listing", "manage:listing"]');

-- Add RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_nonces ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_kyc ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

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
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own KYC"
  ON user_kyc FOR INSERT
  WITH CHECK (auth.uid() = user_id);
