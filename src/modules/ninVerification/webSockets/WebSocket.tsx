import React, { createContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HubConnectionBuilder, IHttpConnectionOptions, HubConnectionState } from '@microsoft/signalr';
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
        userProfile.user && start();
        // if(connection.connectionStarted) {
        //     await connection.invoke("getNinRequests");
        //   }
        
    }


    const start = async () => {
        try {
            await connection.start();
            if(connection && connection.state === HubConnectionState.Connected) {
                
                console.log('Connected!');
                connection.on('ReceiveNinRequest', async (resp: any) => {
                    await dispatch({
                        type: verificationRequestConstants.RequestsPostNew,
                        payload: {...resp},
                    });
                });

            }
            
            console.log("SignalR Connected.");
        } catch (err) {
            if( connection && connection.state === HubConnectionState.Disconnected){
                console.log(err);
                setTimeout(() => start(), 5000);
            }
            
        }

        
    }

    if(userProfile.user ===  null) {
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