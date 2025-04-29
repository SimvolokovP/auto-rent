import { Link } from "react-router-dom";
import "./ProfileLink.scss";
import useUserStore from "../../store/useUserStore";

const ProfileLink = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="profile-link">
      <img src="./images/user.png" alt="user" />
      <div>{currentUser?.username}</div>
      <Link className="profile-link__link" to={"/profile"} />
    </div>
  );
};

export default ProfileLink;
