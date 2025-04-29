import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import "./RegisterForm.scss";
import useUserStore from "../../store/useUserStore";
import { UserRegisterDto } from "../models/dtos/UserRegister.dto";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useEffect } from "react";
import { maskPhone } from "../../helpers/maskPhone";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<UserRegisterDto>();

  const { registration, isLoading, isAuth } = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (user: UserRegisterDto) => {
    await registration(user);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Incorrect email format",
            },
          }}
        />

        <Input
          name="username"
          label="Username"
          placeholder="Username"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
          }}
        />

        <Input
          name="phone"
          label="Phone"
          type="tel"
          placeholder="Phone"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
              message: "Incorrect phone format",
            },
          }}
          mask={maskPhone}
          onChangeCustom={(e) => {
            const rawValue = e.target.value.replace(/\D/g, "");
            const masked = maskPhone(rawValue);
            setValue("phone", masked);
          }}
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
            minLength: { value: 6, message: "Min 6 symbols" },
          }}
        />

        <Input
          name="repeatPassword"
          label="Repeat Password"
          type="password"
          placeholder="Repeat Password"
          register={register}
          errors={errors}
          validation={{
            validate: (value: any) =>
              value === watch("password") || "The passwords do not match",
          }}
        />

        <Button
          size="l"
          mode="filled"
          stretched
          type="submit"
          isLoading={isLoading}
        >
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
