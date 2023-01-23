import React from "react";
import auth from '@react-native-firebase/auth';
import { useRouter, useSegments } from "expo-router";

export const AuthContext = React.createContext(null);

export const useAuth = () => React.useContext(AuthContext);

const useProtectedRoute = (user) => {
    const rootSegment = useSegments()[0];
    const router = useRouter();

    React.useEffect(() => {
        if (user === undefined)
            return;
        if (!user && rootSegment !== "(auth)") {
            router.replace("/login");
        } else if (user && rootSegment !== "(app)") {
            router.replace("/");
        }
    }, [user, rootSegment])
}

export const AuthProvider: React.FC = ({ children }) => {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        auth().onAuthStateChanged(setUser)
    }, []);

    useProtectedRoute(user);


    return <AuthContext.Provider value={{
        user
    }}>{children}</AuthContext.Provider>
}
