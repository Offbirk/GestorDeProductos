import { createContext, useContext, useState } from "react";

// define the type for the context
interface AuthContextType {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

// create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// define props to use wrapping children components 
interface AuthGuardProps {
    children: React.ReactNode;
    // any props that come into the component
}
const AuthProvider = ({ children }: AuthGuardProps) => {    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    
    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};