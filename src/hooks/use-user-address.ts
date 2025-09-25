import { useAuth } from "@/context/AuthContext";

export async function useUserAddress() {
  const { user } = useAuth();
  if (!user) return null;
  const res = await fetch("/api/address", { headers: { "X-User-Id": user.id } });
  if (!res.ok) return null;
  return await res.json();
}
