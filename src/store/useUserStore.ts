import { create } from "zustand";
import { IUser } from "../components/models/IUser";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { UserService } from "../api/UserService";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";

interface UserStore {
  currentUser: IUser | null;
  registration: (registerDto: UserRegisterDto) => Promise<void>;
  login: (loginDto: UserLoginDto) => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  addCarToUser: (carDto: CarCreateDto) => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  isAuth: false,
  isLoading: false,
  registration: async (registerDto: UserRegisterDto) => {
    try {
      set({ isLoading: true });

      const registerUser = await UserService.registration(registerDto);

      set({ currentUser: registerUser });

      set({ isAuth: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (loginDto: UserLoginDto) => {
    try {
      set({ isLoading: true });

      const loggedUser = await UserService.login(loginDto);

      set({ currentUser: loggedUser });

      set({ isAuth: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  addCarToUser: async (carDto: CarCreateDto) => {
    try {
      set({ isLoading: true });

      const currentUser = get().currentUser;

      if (!currentUser) {
        throw new Error("Пользователь не авторизован");
      }

      const updatedUser = await UserService.addCarToUser(carDto, currentUser);

      set({ currentUser: updatedUser });
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
