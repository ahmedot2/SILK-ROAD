import { supabase } from "@/lib/supabase";

// Auth middleware
export const requireAuth = async (req: Request) => {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new Error("Unauthorized");
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) {
    throw new Error("Token expired");
  }

  return user;
};
