import React from "react";
import auth from '@react-native-firebase/auth';

export const AuthContext = React.createContext();

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState();
    return <AuthContext.Provider
        value={{
            user,
            setUser,
            login: async (email, password) => {
                auth().signInWithEmailAndPassword(email, password)
            }
        }}
    >{children}</AuthContext.Provider>
}