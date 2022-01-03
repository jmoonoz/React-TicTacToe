import React from "react";
import { FaRegCircle, FaPen, FaTimes } from "react-icons/fa";

const Icon = ({ name }) => {
  switch (name) {
    case "O":
      return <FaRegCircle className="icon" />;
      break;
    case "X":
      return <FaTimes className="icon" />;
      break;
    default:
      return <FaPen className="icon" />;
      break;
  }
};

export default Icon;
