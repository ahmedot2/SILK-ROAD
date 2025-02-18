import { supabase } from "./supabase";

export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from("roles").select("*").limit(1);

    if (error) throw error;
    console.log("Supabase connection successful:", data);
    return true;
  } catch (error) {
    console.error("Supabase connection failed:", error);
    return false;
  }
};
