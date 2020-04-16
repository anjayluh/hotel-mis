import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {localRoutes, remoteRoutes} from "../../data/constants";
import {useTheme} from "@material-ui/core";
import {linkColor} from "../../theme/custom-colors";
import {useDispatch, useSelector} from "react-redux";
import {IGeneratedParticipant} from "../../modules/participants/types";
import {participantsConstants} from "../../data/redux/participants/reducer";
import {search, get} from "../../utils/ajax";
// import {fakeParticipantDetails} from "../../modules/participants/fakeData";

interface IProps {
    id: string
    name: string
}

const ParticipantLink = ({id, name}: IProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // dispatch({
        //     type: participantsConstants.participantsFetchOne,
        //     payload: {...fakeParticipantDetails()}
        // })
        get(
            'https://bou-niv-gatewayservice-test.test001.laboremus.no/api/aggregations/contact-subscriptions/04c8a212-3b79-44c5-6649-08d7daebc579',
            (resp) => {
                dispatch({
                    type: participantsConstants.participantsFetchOne,
                    payload: {...resp}
                })
            },
            undefined,
            () => {
                console.log('failed to access')
                dispatch({
                    type: participantsConstants.participantsFetchLoading,
                    payload: false,
                })
            })
    }, [id, dispatch])
    return (
        <Link style={{textDecoration: 'none' ,color:linkColor}} to={`${localRoutes.participants}/${id}`}>{name}</Link>
    );
};

export default ParticipantLink
