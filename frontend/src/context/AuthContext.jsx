import { createContext, useContext, useState } from "react";
import Cookie from 'js-cookie';
import api from "../apiServices/Api";

// Create a context object with a default value
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
    });

    const [error, setError] = useState(null);
    
    const login = async (credentials) => {
        try {
            const response = await api.post('/user/login', credentials);
            console.log(response);
            const data = response.data;
            console.log(response.status);
            // if(response.status === 200){
                // Cookie.set('token', data.token);
                setAuthState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    user: data.user,
                }));

                setError(null)
            // }else {
            //     throw new Error('Failed to log in');
            // }
        } catch (error) {
            if(error?.response?.data?.error){
                console.log(error.response.data.error);
                setError(error.response.data.error);
            }else {
                console.log('Failed to login');
            }
        }
    }
    
    const register = async (newUser) => {
        try {
            const response = await api.post('/register', newUser);
            const data = response.data;
            if(response.status === 200 ){
                // Cookie.set('token', data.token);
                setAuthState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    user: data.newUser
                }));
            }else {
                throw new Error('Failed to register')
            }
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        Cookie.remove('token');
        setAuthState({
            isAuthenticated: false,
            user: null
        });
    };

    return (
        <AuthContext.Provider value={{authState, register, login, logout, error}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the context

export const useAuth = () => useContext(AuthContext);