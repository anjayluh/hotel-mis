import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../data/constants";
import { linkColor } from "../../theme/custom-colors";

interface IProps {
  id: string;
  name: string;
  rec?: any;
}

const ParticipantLink = ({ id, name, rec }: IProps) => {
  return (
    <Link
      style={{ textDecoration: "none", color: linkColor }}
      to={`${localRoutes.participants}/${id}`}
    >
      {name}
    </Link>
  );
};

export default ParticipantLink;
