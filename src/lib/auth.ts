import { User } from "@/types/auth";

// Generate a random nonce for wallet signature
export const generateNonce = () => {
  return Math.floor(Math.random() * 1000000).toString();
};

// Check user permissions
export const hasPermission = (user: User, permission: string): boolean => {
  return user.role.permissions.includes(permission);
};

// Parse JWT payload without verification (for client-side user info only)
export const parseToken = (token: string): any => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse token:", error);
    return null;
  }
};
