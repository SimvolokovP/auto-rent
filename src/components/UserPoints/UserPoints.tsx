import { useState } from "react";
import "./UserPoints.scss";
import Modal from "../../UI/Modal/Modal";
import useUserStore from "../../store/useUserStore";

const UserPoints = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { currentUser } = useUserStore();

  return (
    <>
      <div className="user-points" onClick={() => setIsModalOpen(true)}>
        <div className="user-points__score">{currentUser?.points || 0}</div>
        <div className="user-points__text">points</div>
      </div>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        <div>content</div>
      </Modal>
    </>
  );
};

export default UserPoints;
