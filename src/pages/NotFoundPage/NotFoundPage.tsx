import { Link } from "react-router-dom";
import "./NotFoundPage.scss";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import AnimatedBlock from "../../components/AnimatedBlock/AnimatedBlock";

const NotFoundPage = () => {
  return (
    <AnimatedBlock>
      <div className="page not-found-page">
        <div className="container not-found-page__container">
          <div className="not-found-page__chapter">404</div>
          <div className="not-found-page__text">Page Not Found</div>
          <Link className="not-found-page__link" to={"/"}>
            <PiArrowBendUpLeftBold />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default NotFoundPage;
