import { Link } from "react-router-dom";
import "./ProfileLink.scss";
import useUserStore from "../../store/useUserStore";
import Badge from "../../UI/Badge/Badge";

const userData = [
  { id: 1, name: "repair", status: "completed" },
  { id: 2, name: "repair", status: "rejected" },
  { id: 3, name: "repair", status: "accepted" },
];

const ProfileLink = () => {
  const { currentUser } = useUserStore();

  function getColorByStatus(status: string) {
    switch (status) {
      case "completed":
        return "gray";
      case "rejected":
        return "red";
      case "accepted":
        return "green";
      default:
        return "gray";
    }
  }

  return (
    <div className="profile-link">
      <div className="profile-link__chapter">My Profile</div>

      <Badge
        color={getColorByStatus(userData[userData.length - 1].status)}
        count={1}
        position="right-top"
      >
        <div className="profile-link__username">{currentUser?.username}</div>
      </Badge>

      <Link className="profile-link__link" to={"/profile"} />
    </div>
  );
};

export default ProfileLink;
