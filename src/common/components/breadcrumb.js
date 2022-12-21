import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = (props) => {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <Link to="/">Dashboard</Link>
        </li>
        {props.children}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
