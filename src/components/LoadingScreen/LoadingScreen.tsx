import { ClipLoader } from "react-spinners";

import "./LoadingScreen.scss";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-screen__block">
        <ClipLoader size={64} color="var(--text-color)" />
      </div>
    </div>
  );
};

export default LoadingScreen;
