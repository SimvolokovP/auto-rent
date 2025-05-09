import { Link } from "react-router-dom";
import "./ProfileLink.scss";
import useUserStore from "../../store/useUserStore";
import Badge from "../../UI/Badge/Badge";
import { useEffect } from "react";

function getColorByStatus(status: string) {
  switch (status) {
    case "C":
      return "gray";
    case "R":
      return "red";
    case "A":
      return "green";
    default:
      return "gray";
  }
}

const ProfileLink = () => {
  const { records, getRecords, currentUser } = useUserStore();

  useEffect(() => {
    if (currentUser) {
      getRecords();
    }
  }, [currentUser]);

  return (
    <div className="profile-link">
      <div className="profile-link__chapter">My Profile</div>

      <div className="profile-link__descr">
        <Badge
          color={getColorByStatus(records[records.length - 1]?.status)}
          count={records.length}
          position="right-top"
        >
          <div className="profile-link__username">
            {currentUser?.first_name}
          </div>
        </Badge>
      </div>
      <Link className="profile-link__link" to={"/profile"}></Link>
    </div>
  );
};

export default ProfileLink;
