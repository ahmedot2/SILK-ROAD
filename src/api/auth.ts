import { ethers } from "ethers";
import { supabase, auth as supabaseAuth } from "@/lib/supabase";

// Verify wallet signature
const verifySignature = (
  message: string,
  signature: string,
  address: string,
): boolean => {
  try {
    const recoveredAddress = ethers.verifyMessage(message, signature);
    return recoveredAddress.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
};

// API handlers
export const authApi = {
  // Get nonce
  getNonce: async (address: string) => {
    const nonce = Math.floor(Math.random() * 1000000).toString();
    await supabaseAuth.storeNonce(address, nonce);
    return { nonce };
  },

  // Login
  login: async (address: string, signature: string, nonce: string) => {
    // Verify nonce
    const storedNonce = await supabaseAuth.verifyNonce(address, nonce);
    if (!storedNonce) {
      throw new Error("Invalid nonce");
    }

    const message = `Welcome to Silk Road!\n\nPlease sign this message to verify your wallet ownership.\n\nNonce: ${nonce}`;

    if (!verifySignature(message, signature, address)) {
      throw new Error("Invalid signature");
    }

    // Get or create user
    const user = await supabaseAuth.getOrCreateUser(address);

    // Generate session
    const {
      data: { session },
      error,
    } = await supabase.auth.signInWithPassword({
      email: `${address.toLowerCase()}@wallet.local`,
      password: signature.slice(0, 32), // Use first 32 chars of signature as password
    });

    if (error) throw error;

    // Clear used nonce
    await supabaseAuth.deleteNonce(address);

    return { user, token: session?.access_token };
  },

  // Submit KYC
  submitKYC: async (userId: string, data: FormData) => {
    return await supabaseAuth.submitKYC(userId, data);
  },
};
