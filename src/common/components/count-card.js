import React from "react";
import { Link } from "react-router-dom";
export const CountCardView = (props) => {
  const { title, description, image, count, link } = props;

  const formatNumber = (number) => {
    if (number < 10) {
      return "0" + number;
    }
    return number;
  };
  return (
    <div className="ser-box" style={{ backgroundColor: "" }}>
      <div className="head-sec">
        <h2>
          {title}
          <span>{description}</span>
        </h2>
        <div className="img-bg ml-auto">
          <img src={image} alt="..." />
        </div>
      </div>
      <h6>
        <div className="bg-section">{formatNumber(count)}</div>
        <Link to={link}>View</Link>
      </h6>
    </div>
  );
};
