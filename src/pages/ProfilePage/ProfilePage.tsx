import { Link } from "react-router-dom";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";

import Header from "../../components/Header/Header";
import Breadcrumb from "../../UI/Breadcrumb/Breadcrumb";
import RecordsList from "../../components/RecordsList/RecordsList";
import useUserStore from "../../store/useUserStore";

import "./ProfilePage.scss";

const ProfilePage = () => {
  const { records } = useUserStore();

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
          <div className="profile-page__content">
            <RecordsList records={records} />
          </div>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProfilePage;
