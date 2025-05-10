import { Link } from "react-router-dom";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";

import Header from "../../components/Header/Header";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";

const ProfilePage = () => {
  return (
    <AnimatedBlock>
      <div className="page profile-page">
        <div className="container profile-page__container">
          <Header />
          <Breadcrumb
            items={[
              { title: <Link to="/">Home</Link> },
              { title: <Link to="/profile">Profile</Link> },
            ]}
          />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProfilePage;
