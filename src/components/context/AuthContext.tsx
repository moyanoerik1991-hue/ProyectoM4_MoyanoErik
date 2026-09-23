import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";

import { auth } from "../../services/firebase.ts";
import { createUserProfile } from "../../services/userService.ts";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    register: (
        userName: string,
        email: string,
        password: string
    ) => Promise<void>;

    loginWithGoogle: () => Promise<void>;

    logout: () => Promise<void>;
}

export const AuthContext = createContext<
    AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({
    children,
}: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            }
        );

        return unsubscribe;
    }, []);

    const login = async (
        email: string,
        password: string
    ) => {
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
    };

    const register = async (
        userName: string,
        email: string,
        password: string
    ) => {
        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

        const user = userCredential.user;

        await createUserProfile(
            user.uid,
            userName,
            user.email ?? email
        );
    };

    const loginWithGoogle = async () => {
        const userCredential = await signInWithPopup(
            auth,
            googleProvider
        );

        const user = userCredential.user;

        await createUserProfile(
            user.uid,
            user.displayName ?? "Usuario",
            user.email ?? ""
        );
    };

    const logout = async () => {
        await signOut(auth);
    };

    const isAuthenticated = user !== null;

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                register,
                loginWithGoogle,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};