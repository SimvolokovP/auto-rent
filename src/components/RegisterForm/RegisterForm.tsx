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
import { PiMailboxFill, PiPassword, PiPhoneFill } from "react-icons/pi";
import { useAlert } from "../../UI/Alert";

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

  const { alert } = useAlert()

  const onSubmit = async (user: UserRegisterDto) => {
    try {
      console.log(user);
      await registration(user);
    } catch (error: any) {
      console.warn(error);
      alert({
        message: error || "Sever Error",
        title: "Error",
        type: "error",
        autoClose: true,
        delay: 100,
      });
    }
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
          placeholder="Email"
          type="email"
          icon={PiMailboxFill}
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

        {/* <Input
          name="username"
          placeholder="Username"
          icon={PiUserFill}
          register={register}
          errors={errors}
          validation={{
            required: "Required field",
          }}
        /> */}

        <Input
          name="phone"
          type="tel"
          icon={PiPhoneFill}
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
          type="password"
          icon={PiPassword}
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
          type="password"
          icon={PiPassword}
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
