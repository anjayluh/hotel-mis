import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../data/constants";
import { linkColor } from "../../theme/custom-colors";
import {IParticipant} from "../../modules/participants/types";
import {useSelector} from "react-redux";

interface IProps {
  id: string;
  name: string;
  rec?: any;
}
const currentView = 'participantsOverview'
const ParticipantLink = ({ id, name, rec}: IProps) => {

  return (
    <Link
      style={{ textDecoration: "none", color: linkColor }}
      to={`${localRoutes.participants}/${id}/${currentView}`}
    >
      {name}
    </Link>
  );
};

export default ParticipantLink;
