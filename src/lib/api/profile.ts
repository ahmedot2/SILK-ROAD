import { supabase } from "../supabase";
import type {
  UserProfile,
  Transaction,
  ActivityLog,
  Notification,
} from "@/types/profile";

export const profileApi = {
  // Profile
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  updateProfile: async (userId: string, updates: Partial<UserProfile>) => {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return data as UserProfile;
  },

  // Transactions
  getTransactions: async (userId: string) => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Transaction[];
  },

  createTransaction: async (
    transaction: Omit<Transaction, "id" | "createdAt" | "updatedAt">,
  ) => {
    const { data, error } = await supabase
      .from("transactions")
      .insert(transaction)
      .select()
      .single();

    if (error) throw error;
    return data as Transaction;
  },

  // Activity Logs
  getActivityLogs: async (userId: string) => {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as ActivityLog[];
  },

  // Notifications
  getNotifications: async (userId: string) => {
    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Notification[];
  },

  markNotificationAsRead: async (notificationId: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) throw error;
  },

  // Real-time subscriptions
  subscribeToNotifications: (
    userId: string,
    callback: (notification: Notification) => void,
  ) => {
    return supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => callback(payload.new as Notification),
      )
      .subscribe();
  },

  // Global Settings
  getGlobalSettings: async () => {
    const { data, error } = await supabase.from("global_settings").select("*");

    if (error) throw error;
    return data;
  },
};
