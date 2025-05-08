import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";

import Header from "../../components/Header/Header";

const ProfilePage = () => {
  return (
    <AnimatedBlock>
      <div className="page profile-page">
        <div className="container profile-page__container">
          <Header />
          Profile
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProfilePage;
