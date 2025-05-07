import { create } from "zustand";
import { IProfile } from "../components/models/IUser";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { UserService } from "../api/UserService";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";
import axios from "axios";
import { AuthResponse } from "../components/models/response/AuthResponse";

interface UserStore {
  currentUser: IProfile | null;
  registration: (registerDto: UserRegisterDto) => Promise<void>;
  login: (loginDto: UserLoginDto) => Promise<void>;
  checkAuth: () => Promise<void>;
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

      const registerResponse = await UserService.registration(registerDto);

      localStorage.setItem("accessToken", registerResponse.data.access);

      console.log(registerResponse);

      set({ currentUser: registerResponse.data.user_info });

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

      const userResponse = await UserService.login(loginDto);
      console.log(userResponse);
      localStorage.setItem("accessToken", userResponse.data.access);

      const loggedUser = await UserService.getMe();

      console.log(loggedUser.data);

      set({ currentUser: loggedUser.data });
      set({ isAuth: true });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      // const response = await axios.get<AuthResponse>(
      //   `http://127.0.0.1:8000/api/token/`,
      //   { withCredentials: true }
      // );
      // console.log(response);
      //
      const authResponse = await UserService.getMe();
      console.log(authResponse);
      set({ isAuth: true });
      set({ currentUser: authResponse.data });
    } catch (e: any) {
      console.log(e.response?.data?.message);
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

      // const updatedUser = await UserService.addCarToUser(carDto, currentUser);

      // set({ currentUser: updatedUser });
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
