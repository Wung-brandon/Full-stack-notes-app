import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import useAxios from "../utils/useAxios";
import Spinner from 'react-bootstrap/Spinner';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthToken] = useState(() => 
        localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    );

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null
    );

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", { email, password });
            const data = response.data;
            if (response.status === 200) {
                setAuthToken(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/");
                Swal.fire({
                    title: "Login Successful!",
                    toast: true,
                    icon: "success",
                    timer: 5000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            <Spinner animation="border" />
            Swal.fire({
                title: "Email or Password does not exist!",
                toast: true,
                icon: "error",
                timer: 5000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    const signUpUser = async (username, email, password, confirm_password) => {
        setLoading(true);
        if (password !== confirm_password) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password, confirm_password })
            });
            const data = await response.json();
            console.log(data)
            if (response.status === 201) {
                navigate("/login");
                Swal.fire({
                    title: "Registration Successful, Login now!",
                    toast: true,
                    icon: "success",
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    title: "An error occurred!",
                    toast: true,
                    icon: "error",
                    timer: 4000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                title: "An error occurred!",
                toast: true,
                icon: "error",
                timer: 4000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate('/login');
        Swal.fire({
            title: "Logout Successful!",
            toast: true,
            icon: "success",
            timer: 4000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false
        });
    };

    const contextData = {
        user,
        loading,
        authTokens,
        loginUser,
        logoutUser,
        signUpUser,
        setAuthToken,
        setLoading,
        setUser
    };

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading && (
                <div className="spinner-container">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}
            {children}
        </AuthContext.Provider>
    );
};



// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// // Create the AuthContext
// const AuthContext = createContext();

// // Provider component
// export const AuthProvider = ({ children }) => {
//     const [authTokens, setAuthToken] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
//     const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null);
//     const [username, setUsername] = useState(null);  // Store the username
//     const [loading, setLoading] = useState(true);

//     const navigate = useNavigate();

//     const loginUser = async (email, password) => {
//         try {
//             const response = await axios.post('http://127.0.0.1:8000/api/token/', { email, password });
//             const data = response.data;
//             if (response.status === 200) {
//                 setAuthToken(data);
//                 setUser(jwtDecode(data.access));
//                 localStorage.setItem("authTokens", JSON.stringify(data));
//                 navigate("/");
//                 Swal.fire({
//                     title: "Login Successful!",
//                     toast: true,
//                     icon: "success",
//                     timer: 5000,
//                     position: 'top-right',
//                     timerProgressBar: true,
//                     showConfirmButton: false
//                 });
//             }

//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const signUpUser = async (username, email, password, confirm_password) => {
//         setLoading(true);
//         if (password !== confirm_password) {
//             alert("Passwords do not match");
//             setLoading(false);
//             return;
//         }
//         try {
//             const response = await fetch("http://127.0.0.1:8000/api/signup/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ username, email, password, confirm_password })
//             });
//             const data = await response.json();
//             console.log(data)
//             if (response.status === 201) {
//                 navigate("/login");
//                 Swal.fire({
//                     title: "Registration Successful, Login now!",
//                     toast: true,
//                     icon: "success",
//                     timer: 4000,
//                     position: 'top-right',
//                     timerProgressBar: true,
//                     showConfirmButton: false
//                 });
//             } else {
//                 Swal.fire({
//                     title: "An error occurred!",
//                     toast: true,
//                     icon: "error",
//                     timer: 4000,
//                     position: 'top-right',
//                     timerProgressBar: true,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 title: "An error occurred!",
//                 toast: true,
//                 icon: "error",
//                 timer: 4000,
//                 position: 'top-right',
//                 timerProgressBar: true,
//                 showConfirmButton: false
//             });
//         } finally {
//             setLoading(false);
//         }
//     };


//     const logoutUser = () => {
//         setAuthToken(null);
//         setUser(null);
//         setUsername(null);
//         localStorage.removeItem('authTokens');
//         navigate('/login');
//         Swal.fire({
//             title: "Logout Successful!",
//             toast: true,
//             icon: "success",
//             timer: 4000,
//             position: 'top-right',
//             timerProgressBar: true,
//             showConfirmButton: false
//         });
//     };

//     // const fetchUserProfile = async () => {
//     //     if (!authTokens) return;

//     //     try {
//     //         const response = await axios.get('http://127.0.0.1:8000/api/me/', {
//     //             headers: {
//     //                 Authorization: `Bearer ${authTokens.access}`
//     //             }
//     //         });
//     //         setUsername(response.data.username);
//     //     } catch (error) {
//     //         console.error('Failed to fetch user profile:', error);
//     //     }
//     // };

//     const updateToken = async () => {
        
//             const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
//                 method : "POST",
//                 headers : {
//                     'Content-Type' : 'application/json'
//                 },
//                 body : JSON.stringify({refresh: authTokens?.refresh})
                
//             });
//             const data = await response.json();
//             if (response.status === 200){
//                 setAuthToken(data);
//                 setUser(jwtDecode(data.access));
//                 localStorage.setItem('authTokens', JSON.stringify(data));
//                 console.log("data", data)
//             }
//          else {
//             logoutUser();
//         }
//         if (loading){
//             setLoading(false)
//         }
//     };

//     useEffect(() => {
//         if (loading) {
//             // if (authTokens) {
//             //     setUser(jwtDecode(authTokens.access));
//             //     fetchUserProfile();
//             // }
//             updateToken()
//             // setLoading(false);
//         }

//         const fourMinutes = 1000 * 60 * 4;

//         let interval = setInterval(() => {
//             if (authTokens) {
//                 updateToken();
//             }
//         }, fourMinutes);

//         return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [authTokens, loading]);

//     const contextData = {
//         user,
//         username,
//         authTokens,
//         loginUser,
//         logoutUser,
//         signUpUser
//     };

//     return (
//         <AuthContext.Provider value={contextData}>
//             {loading ? null : children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;
