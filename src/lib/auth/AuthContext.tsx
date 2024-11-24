import { createContext, useContext, ReactNode } from 'react';
import { useSession, SessionProvider } from 'next-auth/react';

interface AuthContextType {
  getSession: () => Promise<{
    user?: {
      id: string;
      email: string;
      name?: string;
    } | null;
  }>;
}

export const auth: AuthContextType = {
  getSession: async () => {
    const session = await useSession();
    return {
      user: session?.data?.user ? {
        id: session.data.user.id,
        email: session.data.user.email!,
        name: session.data.user.name || undefined
      } : null
    };
  }
};

const AuthContext = createContext<AuthContextType>(auth);

export function useAuth() {
  return useContext(AuthContext);
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
}
