import { Dispatch, ReactNode, SetStateAction, useReducer, useState } from "react";
import { createContext } from "use-context-selector";

interface User {
    sub: string;
    name: string;
    iat: number;
    roles: string[];
    token?: string;
}

interface AuthProviderType {
    children: ReactNode;
}

const AuthContext = createContext<[User, Dispatch<SetStateAction<User>>] | null>(null);

export const AuthProvider = ({ children }: AuthProviderType) => {
    return <AuthContext.Provider value={useState<User>({} as User)}>
        { children }
    </AuthContext.Provider>
}

export default AuthContext;

