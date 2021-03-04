import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HubConnectionBuilder, IHttpConnectionOptions } from '@microsoft/signalr';
import { verificationRequestConstants } from '../../../data/redux/ninVerification/reducer';
import {remoteRoutes} from '../../../data/constants'
import { IState } from '../../../data/types'
import { getToken } from '../../../utils/ajax';


const WebSocketContext = createContext(null)

export { WebSocketContext }
interface IProps {
    children: any
}
export default ({ children }: IProps) => {
    const userProfile = useSelector((state: IState) => state.core);
    const [ connection, setConnection ]: any = useState();
    let webSocket: any;

    const dispatch = useDispatch();
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(remoteRoutes.webSockets, {
                accessTokenFactory: () => (
                    // access_token
                    getToken()
                )
            } as IHttpConnectionOptions)
            .withAutomaticReconnect()
            .build();
    
        setConnection(newConnection);
      }, []);

    const getRequests = async () => {
        if(connection.connectionStarted) {
            await connection.invoke("getNinRequests");
          }
        
    }
    
    if (connection) {
        connection.start()
            .then((result: any) => {
                console.log('Connected!');

                connection.on('ReceiveNinRequests', (resp: any) => {
                    dispatch({
                        type: verificationRequestConstants.RequestsFetchAll,
                        payload: [...resp.requests],
                      });
                });
            })
            .catch((e: any) => console.log('Connection failed: ', e));

            webSocket = {
                connection,
                getRequests
            }
    }

    return (
        <WebSocketContext.Provider value={webSocket}>
            {children}
        </WebSocketContext.Provider>
    )
}