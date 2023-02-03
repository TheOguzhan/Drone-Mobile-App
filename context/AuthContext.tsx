import React from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useRouter, useSegments } from "expo-router";

export type AuthContextType = {
    user: FirebaseAuthTypes.User
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => React.useContext(AuthContext);

const useProtectedRoute = (user: FirebaseAuthTypes.User | null) => {
    const rootSegment = useSegments()[0];
    const router = useRouter();

    React.useEffect(() => {
        if (user === undefined)
            return;
        if (!user && rootSegment !== "(auth)") {
            router.replace("/(auth)/login");
        } else if (user && rootSegment !== "(app)") {
            router.replace("/(app)");
        }
    }, [user, rootSegment])
}

interface ProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);
    React.useEffect(() => {
        auth().onAuthStateChanged(setUser)
    }, []);

    useProtectedRoute(user);


    return <AuthContext.Provider value={{
        user: user as FirebaseAuthTypes.User
    }}>{children}</AuthContext.Provider>
}
