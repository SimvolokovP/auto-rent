import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import useUserStore from "../../store/useUserStore";

import { useNavigate } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useEffect } from "react";

import { UserLoginDto } from "../models/dtos/UserLogin.dto";

const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserLoginDto>();

  const { login, isLoading, isAuth } = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (user: UserLoginDto) => {
    await login(user);
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

        <Button
          size="l"
          mode="filled"
          stretched
          type="submit"
          isLoading={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
