import { create } from "zustand";
import { IProfile } from "../components/models/IUser";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { UserService } from "../api/UserService";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";
import axios from "axios";
import { API_URL } from "../api";
import { IRecord } from "../components/models/IRecord";
import { RecordService } from "../api/RecordService";
import { RecordCreateDto } from "../components/models/dtos/RecordCreateDto.dto";

interface UserStore {
  currentUser: IProfile | null;
  records: IRecord[] | [];
  registration: (registerDto: UserRegisterDto) => Promise<void>;
  login: (loginDto: UserLoginDto) => Promise<void>;
  checkAuth: () => Promise<void>;
  isAuth: boolean;
  isLoading: boolean;
  addCarToUser: (carDto: CarCreateDto) => Promise<void>;
  deleteCarFromUser: (carId: number) => Promise<void>;
  editCarToUser: (carDto: CarCreateDto, carId: number) => Promise<void>;
  logOut: () => void;
  getRecords: () => Promise<void>;
  createRecord: (recordDto: RecordCreateDto) => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  isAuth: false,
  isLoading: false,
  records: [],
  registration: async (registerDto: UserRegisterDto) => {
    try {
      set({ isLoading: true });

      const registerResponse = await UserService.registration(registerDto);

      localStorage.setItem("accessToken", registerResponse.data.access);
      localStorage.setItem("refreshToken", registerResponse.data.refresh);

      console.log(registerResponse);

      set({ currentUser: registerResponse.data.user_info });

      set({ isAuth: true });
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
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
      localStorage.setItem("refreshToken", userResponse.data.refresh);

      const loggedUser = await UserService.getMe();

      console.log(loggedUser.data);

      set({ currentUser: loggedUser.data });
      set({ isAuth: true });
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err : "An unexpected error occurred";
      console.warn(err);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },

  logOut: () => {
    set({ isAuth: false });
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
  },

  checkAuth: async () => {
    set({ isLoading: true });
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(refreshToken);
      const response = await axios.post(`${API_URL}/token/refresh/`, {
        refresh: refreshToken,
      });
      console.log(response);
      const { access } = response.data;

      localStorage.setItem("accessToken", access);

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

  editCarToUser: async (carDto: CarCreateDto, carId: number) => {
    try {
      set({ isLoading: true });

      const currentUser = get().currentUser;

      if (currentUser) {
        const response = await UserService.editCarToUser(carDto, carId);
        const updatedCar = response.data;

        const updatedCars = (currentUser.cars || []).map((car) =>
          car.id === carId ? updatedCar : car
        );

        set({ currentUser: { ...currentUser, cars: updatedCars } });
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteCarFromUser: async (carId: number) => {
    try {
      set({ isLoading: true });

      const currentUser = get().currentUser;

      if (currentUser) {
        await UserService.deleteCarFromUser(carId);

        const updatedCars = (currentUser.cars || []).filter(
          (car) => car.id !== carId
        );

        set({ currentUser: { ...currentUser, cars: updatedCars } });
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },

  addCarToUser: async (carDto: CarCreateDto) => {
    try {
      set({ isLoading: true });

      const currentUser = get().currentUser;

      if (currentUser) {
        const response = await UserService.addCarToUser(carDto);

        const updatedCars = [...(currentUser.cars || []), response.data];
        set({ currentUser: { ...currentUser, cars: updatedCars } });
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },

  getRecords: async () => {
    try {
      set({ isLoading: true });

      const response = await RecordService.getAll();

      const records = response.data;
      console.log(records);
      set({ records: records });
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },

  createRecord: async (recordDto: RecordCreateDto) => {
    try {
      set({ isLoading: true });

      const currentRecords = get().records;

      if (currentRecords) {
        const response = await RecordService.createRecord(recordDto);

        const updatedRecords = [...(currentRecords || []), response.data];
        set({ records: updatedRecords });
      }
    } catch (err: any) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      console.warn(errorMessage);
      throw err.response.data.detail;
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
