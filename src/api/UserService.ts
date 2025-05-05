import { CarCreateDto } from "../components/models/dtos/CarCreateDto.dto";
import { UserLoginDto } from "../components/models/dtos/UserLogin.dto";
import { UserRegisterDto } from "../components/models/dtos/UserRegister.dto";
import { ICar } from "../components/models/ICar";
import { IUser } from "../components/models/IUser";

export class UserService {
  static async registration(
    userRegistrationDto: UserRegisterDto
  ): Promise<IUser> {
    const randomId = Math.floor(Math.random() * 10000) + 1;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ...userRegistrationDto,
      id: randomId,
      points: 700,
      cars: [
        {
          id: 1,
          brand: "Lada",
          name: "Lada Granta",
          type: "sedan",
          year: "2018",
        },
        {
          id: 2,
          brand: "Mitsubishi",
          name: "Mitsubishi Lancer X",
          type: "sedan",
          year: "2012",
        },
      ],
    };
  }

  static async login(userLoginDto: UserLoginDto): Promise<IUser> {
    const randomId = Math.floor(Math.random() * 10000) + 1;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      ...userLoginDto,
      id: randomId,
      points: 100,
      phone: "+7 (000) 000 00 00",
      username: "user",
      cars: [
        {
          id: 1,
          brand: "Lada",
          name: "Lada Granta",
          type: "sedan",
          year: "2018",
        },
        {
          id: 2,
          brand: "Mitsubishi",
          name: "Mitsubishi Lancer X",
          type: "sedan",
          year: "2012",
        },
      ],
    };
  }

  static async addCarToUser(carDto: CarCreateDto, user: IUser): Promise<IUser> {
    const randomId = Math.floor(Math.random() * 10000) + 1;

    await new Promise((resolve) => setTimeout(resolve, 3000));

    const newCar: ICar = { ...carDto, id: randomId };

    return {
      ...user,
      cars: [...(user.cars || []), newCar],
    };
  }
}
