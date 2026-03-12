import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase";
import type { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  role: string;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: "user",
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (data?.role) setRole(data.role);
    else setRole("user");
  };

  useEffect(() => {
    // Get current session on load
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user ?? null;

      setUser(sessionUser);

      if (sessionUser) {
        await fetchRole(sessionUser.id);
      }

      setLoading(false);
    };

    getSession();

    // Listen for login/logout/signup changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;

        setUser(sessionUser);

        if (sessionUser) {
          await fetchRole(sessionUser.id);
        } else {
          setRole("user");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole("user");
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);