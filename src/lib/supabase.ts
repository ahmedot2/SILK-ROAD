import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase environment variables");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Auth functions
export const auth = {
  // Store nonce for wallet auth
  storeNonce: async (address: string, nonce: string) => {
    const { error } = await supabase.from("wallet_nonces").upsert({
      address: address.toLowerCase(),
      nonce,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
    return nonce;
  },

  // Verify nonce
  verifyNonce: async (address: string, nonce: string) => {
    const { data, error } = await supabase
      .from("wallet_nonces")
      .select()
      .eq("address", address.toLowerCase())
      .eq("nonce", nonce)
      .single();

    if (error) throw error;
    return data;
  },

  // Delete used nonce
  deleteNonce: async (address: string) => {
    const { error } = await supabase
      .from("wallet_nonces")
      .delete()
      .eq("address", address.toLowerCase());

    if (error) throw error;
  },

  // Get or create user
  getOrCreateUser: async (address: string) => {
    // First try to get existing user
    let { data: user, error } = await supabase
      .from("users")
      .select("*, roles(*)")
      .eq("address", address.toLowerCase())
      .single();

    if (!user && !error) {
      // Create new user with default role
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert({
          address: address.toLowerCase(),
          role_id: "user", // default role
          kyc_status: "none",
          is_active: true,
        })
        .select("*, roles(*)")
        .single();

      if (createError) throw createError;
      user = newUser;
    } else if (error && error.code !== "PGRST116") {
      throw error;
    }

    return user;
  },

  // Submit KYC
  submitKYC: async (userId: string, data: FormData) => {
    // Upload document to storage
    const file = data.get("document") as File;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("kyc-documents")
      .upload(`${userId}/${file.name}`, file);

    if (uploadError) throw uploadError;

    // Create KYC record
    const { error: kycError } = await supabase.from("user_kyc").insert({
      user_id: userId,
      document_type: data.get("documentType"),
      document_number: data.get("documentNumber"),
      document_url: uploadData.path,
      status: "pending",
    });

    if (kycError) throw kycError;

    // Update user KYC status
    const { error: updateError } = await supabase
      .from("users")
      .update({ kyc_status: "pending" })
      .eq("id", userId);

    if (updateError) throw updateError;

    return { success: true };
  },

  // Create session
  createSession: async (userId: string) => {
    const { data: session, error } = await supabase
      .from("sessions")
      .insert({
        user_id: userId,
        token: crypto.randomUUID(),
        expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      })
      .select()
      .single();

    if (error) throw error;
    return session;
  },

  // Verify session
  verifySession: async (token: string) => {
    const { data: session, error } = await supabase
      .from("sessions")
      .select("*, users(*, roles(*))")
      .eq("token", token)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (error) throw error;
    return session;
  },

  // Delete session
  deleteSession: async (token: string) => {
    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("token", token);

    if (error) throw error;
  },
};
