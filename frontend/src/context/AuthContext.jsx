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

    // console.log(authState);

    // console.log(authState.user);
    const [authorInfo, setAuthorInfo] = useState([]);
    // console.log(authorInfo);
    // const [following, setFollowing] = useState([]);
    const [error, setError] = useState(null);

    

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
    
    const getAuthorInfo = async (authorId) => {
        console.log(authorId);
        try {
            const response = await api.get(`/user/getauthorinfo/${authorId}`);
            const data = response.data;
            setAuthorInfo(data.userInfo)
        } catch (error) {
            setError(error.response?.data?.error);
            console.log(error);
        }
    }

    const followUser = async (userIdToFollow) => {
        try {
            setAuthState((prevState) => ({...prevState, isLoading: true}));
            const response = await api.post(`user/follow/${userIdToFollow}`);
            const updatedUser = response.data;
            // console.log(updatedUser);
            setAuthState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    following: [...prevState.user.following, userIdToFollow],
                },
                isLoading: false
            }));
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to follow user');
            setAuthState((prevState) => ({ ...prevState, isLoading: false}));
        }
    }

    const unFollowUser = async (userIdToUnfollow) => {
        try {
            setAuthState((prevState) => ({ ...prevState, isLoading: true }));
            const response = await api.post(`/user/unfollow/${userIdToUnfollow}`);
            const updatedUser = response.data.user;
            setAuthState((prevState) => ({
                ...prevState,
                user: {
                    ...prevState.user,
                    following: prevState.user.following.filter((id) => id !== userIdToUnfollow),
                },
                isLoading: false,
            }));
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to unfollow user');
            setAuthState((prevState) => ({ ...prevState, isLoading: false}));
        }
    };
    

    return (
        <AuthContext.Provider value={{authState, register, login, logout, error, authorInfo, getAuthorInfo, followUser, unFollowUser}}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the context

export const useAuth = () => useContext(AuthContext);