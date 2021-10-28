import React from 'react'
import './Login.css'
import {Button} from "@mui/material";
import {auth, provider} from "./firebase";
import {useStateValue} from "./StateProvider";
import {actionTypes, initialState} from "./reducer";

function Login() {
    const [state, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: result.user
                })
                console.log(initialState)
            })
            .catch(error => alert(error.message))
    }

    return(
        <div className={'login'}>
            <div className="login__container">
                <img src="https://pngicon.ru/file/uploads/whatsapp.png" alt=""/>

                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button type={'submit'} onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login