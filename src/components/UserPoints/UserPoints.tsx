import useUserStore from "../../store/useUserStore";
import "./UserPoints.scss";

const UserPoints = () => {
  const { currentUser } = useUserStore();

  return (
    <>
      <div className="user-points">
        <div className="user-points__score">{currentUser?.points || 0}</div>
        <div className="user-points__text">points</div>
      </div>
    </>
  );
};

export default UserPoints;
