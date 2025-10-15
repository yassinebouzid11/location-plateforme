import { createContext, useContext, useEffect, useState } from "react";

interface User {
    name:string
    email: string
    id: string
}
interface AuthContextType {
    user: User | null
    isLogged: boolean;
    login: (userData: User) => void;
    logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>({
    user: null,
    isLogged: false,
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null >(null)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
        setIsLogged(true);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    const login = (userData: User) => {
        setIsLogged(true);
        setUser(userData)
        localStorage.setItem("user", JSON.stringify(userData))
    };

    const logout = () => {
        localStorage.clear();
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLogged, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
