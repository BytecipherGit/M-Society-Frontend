import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        {props.children}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
