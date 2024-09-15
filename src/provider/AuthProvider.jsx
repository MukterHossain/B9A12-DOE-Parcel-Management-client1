import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)



    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    const logInWithGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const logOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (name, photo) =>{
        return updateProfile(auth.currentUser, {
             displayName:name, photoURL: photo
         })
     }



    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            if(currentUser){
                // get token and store client
                const userInfo = {email: currentUser.email};
                axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                    }
                })
            }
            else{
                //do something
                localStorage.removeItem('access-token')
            }
            setLoading(false);
            // console.log('Observer', currentUser)
        });
        return () =>{
            unsubscribe();
        }
    }, [axiosPublic])



    const userInfo = {user, signInUser, createUser, logOutUser,updateUserProfile, logInWithGoogle, loading}
  
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;