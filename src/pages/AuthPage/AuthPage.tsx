import { useState } from "react";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import "./AuthPage.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

type TFormType = "login" | "registration";

const AuthPage = () => {
  const [formType, setFormType] = useState<TFormType>("login");

  return (
    <AnimatedBlock>
      <div className="page auth-page">
        <div className="container auth-page__container">
          <h3 className="auth-page__title">UbX</h3>
          <div className="auth-page__chapter">Auth in App</div>
          {formType === "login" && <LoginForm />}
          {formType === "registration" && <RegisterForm />}
          <div>
            {formType === "registration" ? (
              <p className="auth-page__info">
                already registered?{" "}
                <button className="auth-page__btn" onClick={() => setFormType("login")}>Login</button>
              </p>
            ) : (
              <p className="auth-page__info">
                Don't have an account yet?{" "}
                <button className="auth-page__btn" onClick={() => setFormType("registration")}>
                  Register
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default AuthPage;
