import { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import api from "../apiServices/Api";

// Create a context object with a default value
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({children}) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        isLoading: false
    });

    console.log(authState);

    // console.log(authState.user);
    const [authorInfo, setAuthorInfo] = useState([]);
    const [following, setFollowing] = useState([]);
    const [error, setError] = useState(null);

    // console.log(authorInfo);


    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if(token){
    //         setAuthState(prevState => ({
    //             ...prevState,
    //             isAuthenticated:true
    //         }))
    //     }
    // },[])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/getuser');
                const data = response.data;
                setAuthState({
                    isAuthenticated: true,
                    user: data.user,
                    isLoading: false
                });
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };
        fetchUser();
    },[])

  
    const login = async (credentials) => {
        setAuthState((prevState) => ({...prevState, isLoading: true}))
        try {
            const response = await api.post('/user/login', credentials);
            console.log(response);
            const data = response.data;
                localStorage.setItem('token', data.token, {expires: 1});
                setAuthState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    user: data.user,
                }));

                setError(null);
            
        } catch (error) {
            if(error?.response?.data?.error){
                console.log(error.response.data.error);
                setError(error.response.data.error);
            }else {
                console.log('Failed to login');
            }
        }
        setAuthState((prevState) => ({...prevState, isLoading: false}))
    }
    
    const register = async (newUser) => {
        try {
            const response = await api.post('/user/register', newUser);
            const data = response.data;
            console.log(data);
                setAuthState((prevState) => ({
                    ...prevState,
                    isAuthenticated: true,
                    user: data.newUser
                }));
                
                setError(null)
                    } catch (error) {
            if(error?.response?.data?.error){
                setError(error.response.data.error);
            }else{
                setError('Failded to register')
            }
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            const response = await api.post('/user/logout');
            console.log(response);
            setAuthState({
                isAuthenticated: false,
                user: null
            });
        } catch (error) {
            console.error('Logout failed');
        }
    };

    const followUser = async (userId) => {
        try {
            const response = await api.post(`/user/follow/${userId}`);
            // console.log(response);
        } catch (error) {
            setError(error.response?.data?.error || 'something went wrong')
        }
    };

    const unFollowUser = async (userId) => {
        try {
            const response = await api.post(`/user/unfollow/${userId}`);
            // console.log(response);
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    }

    const getFollowing = async () => {
        try {
            const response = await api.get('/user/getfollowing');
            const data = response.data;
            setFollowing(data.following);
        } catch (error) {
            setError(error.response?.data?.error || 'Something went wrong')
        }
    }

    const getAuthorInfo = async (authorId) => {
        try {
            const response = await api.get(`/user/getauthorinfo/${authorId}`);
            const data = response.data;
            setAuthorInfo(data.userInfo)
        } catch (error) {
            setError(error.response?.data?.error);
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{authState, register, login, logout, error, followUser, unFollowUser, getFollowing, following, authorInfo, getAuthorInfo}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the context

export const useAuth = () => useContext(AuthContext);