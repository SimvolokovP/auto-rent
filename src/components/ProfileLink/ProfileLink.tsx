import { Link } from "react-router-dom";
import "./ProfileLink.scss";

const ProfileLink = () => {
  return (
    <div className="profile-link">
      <img src="./images/user.png" alt="user" />
      <div>Jane Cooper</div>
      <Link className="profile-link__link" to={"/profile"} />
    </div>
  );
};

export default ProfileLink;
