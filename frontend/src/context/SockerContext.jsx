import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvide = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUser, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("http://localhost:5000", {
                query: { userId: authUser._id}
            });
            setSocket(socket);
            socket.on("online-users", (users) => setOnlineUsers(users))
            return () => socket.close();
        } else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}