import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import './AuthPage.scss'

const AuthPage = () => {
  return (
    <AnimatedBlock>
      <div className="page auth-page">
        <div className="container auth-page__container">
          <div className="auth-page__chapter">Auth in App</div>
          <RegisterForm />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default AuthPage;
