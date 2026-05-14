import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUser, saveUser } from '../utils/storage';

type UserState = {
  isLoggedIn: boolean;
  name?: string;
  sex?: 'male' | 'female';
  hobbies?: string;
  genres?: string[];
  gems: number;
  tickets: number;
  storyProgress: Record<string, string>; // novelId -> lastSceneId
};

const UserContext = createContext<{
  user: UserState;
  setUser: (u: Partial<UserState>) => void;
  updateCurrency: (gems?: number, tickets?: number) => void;
  updateProgress: (novelId: string, sceneId: string) => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<UserState>({
    isLoggedIn: false,
    gems: 50,
    tickets: 3,
    storyProgress: {},
  });

  useEffect(() => {
    getUser().then(data => {
      if (data) setUserState(prev => ({ ...prev, ...data, isLoggedIn: true }));
    });
  }, []);

  const setUser = (updates: Partial<UserState>) => {
    const next = { ...user, ...updates };
    setUserState(next);
    saveUser(next);
  };

  const updateCurrency = (gems?: number, tickets?: number) => {
    const next = { ...user };
    if (gems !== undefined) next.gems = gems;
    if (tickets !== undefined) next.tickets = tickets;
    setUser(next);
  };

  const updateProgress = (novelId: string, sceneId: string) => {
    setUser({ storyProgress: { ...user.storyProgress, [novelId]: sceneId } });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateCurrency, updateProgress }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside UserProvider');
  return ctx;
};