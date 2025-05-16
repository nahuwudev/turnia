import { Database } from "@/lib/database.types";
import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

type Profile = Database["public"]["Views"]["user_details_view"]["Row"] | null;

export function useProfile(userId: string | undefined) {
  return useQuery<Profile, Error>({
    queryKey: ["profile", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .rpc("get_user_details", { p_user_id: userId })
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    enabled: !!userId,
  });
}
