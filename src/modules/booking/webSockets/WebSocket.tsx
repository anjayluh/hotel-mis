import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../utils/ajax';
import { IState } from "../../../data/types";


const WebSocketContext = createContext(null)

export { WebSocketContext }
interface IProps {
    children: any
}
export default ({ children }: IProps) => {
    const userProfile = useSelector((state: IState) => state.core.user);
    const [connection, setConnection]: any = useState();
    let webSocket: any;

    const dispatch = useDispatch();
    useEffect(() => {
    }, []);

    const getRequests = async () => {
        userProfile.user && start();

    }


    const start = async () => {

    }

    if (userProfile.user === null) {
        connection && connection.connection.stopConnection()
    }
    webSocket = {
        connection,
        getRequests
    }
    userProfile.user && start();
    connection && connection.onclose(userProfile.user && start);


    return (
        <WebSocketContext.Provider value={webSocket}>
            {children}
        </WebSocketContext.Provider>
    )
}