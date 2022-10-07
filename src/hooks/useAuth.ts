import { useContext, useDebugValue } from "react";
import { useContextSelector } from "use-context-selector";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    const token = useContextSelector(AuthContext, v => v?.[0].token);
    useDebugValue(token, token => token ? "Logged In" : "Logged Out")
    return useContextSelector(AuthContext, v => v?.[0].token);
}

export default useAuth;