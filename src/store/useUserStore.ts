import { create } from "zustand";
import { IUser } from "../components/models/IUser";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";

interface UserStore {
  currentUser: IUser | null;
  registration: (registerDto: UserRegisterDto) => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
}

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  isAuth: false,
  isLoading: false,
  registration: async (registerDto: UserRegisterDto) => {
    try {
      set({ isLoading: true });

      const randomId = Math.floor(Math.random() * 10000) + 1;

      await new Promise((resolve) => setTimeout(resolve, 3000));

      set({ currentUser: { ...registerDto, id: randomId } });
      set({ isAuth: true });

      const currentState = get();
      console.log("Текущее состояние после регистрации:", currentState);
      console.log("Рандомный сгенерированный id:", randomId);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
