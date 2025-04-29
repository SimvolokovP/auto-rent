import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";

import "./RegisterForm.scss";

interface FormData {
  email: string;
  username: string;
  password: string;
  repeatPassword: string;
  phone: string;
  avatar?: File;
}

const maskPhone = (value: string) => {
  if (value.length > 3 && value.length <= 6) {
    return `(${value.slice(0, 3)}) ${value.slice(3)}`;
  } else if (value.length > 6) {
    return `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
  }
  return value;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [submittedData, setSubmittedData] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    setSubmittedData(JSON.stringify(data, null, 2));
    console.log(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue("avatar", e.target.files[0]);
    }
  };

  return (
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
            message: "Некорректный формат email",
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

      {/* Повтор пароля */}
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
            value: /^\(\d{3}\) \d{3}-\d{4}$/,
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

      <Button size="l" mode="filled" stretched type="submit">
        Register
      </Button>

      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Данные отправлены успешно:</h3>
          <pre>{submittedData}</pre>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
