import type { User } from "@supabase/supabase-js";
import { createContext } from "react";
import type { Tables } from "@/lib/supabase/database.types";

type Profile = Tables<"profiles">;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (userData: User) => void;
  signOut: () => void;
  setProfile: (profile: Profile | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type { AuthContextType };
export default AuthContext;
