import { useState, createContext } from "react";

export const MessageContext = createContext();

export function MessageProvider({ children }) {

    const [message, setMessage] = useState("");
    const [alertColor, setAlertColor] = useState("accent");

    return (
        <MessageContext.Provider value={{
            message,
            setMessage,
            alertColor,
            setAlertColor
        }}>
            {children}
        </MessageContext.Provider>
    );
}