import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './css/login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "../slices/userLoginSlice";

const UserLogin = () => {
    const User = useRef(null);
    const Pass = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoginSuccess, loading } = useSelector(state => state.userLogin);
    console.log(isLoginSuccess)

    async function loginClick() {
        const username = User.current?.value;
        const password = Pass.current?.value;
        try {
            // @ts-ignore
            await dispatch(login({ username, password })).unwrap();
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (isLoginSuccess) {
            navigate('/')
        }
    }, [isLoginSuccess])

    if (loading) {
        return <div>loading</div>
    }

    return (
        <div>
            <div className="signin">
                <div className="content">
                    <h2>Sign In</h2>
                    <div className="form">
                        <div className="inputBox">
                            <input type="text" required ref={User} /> <i>Username</i>
                        </div>
                        <div className="inputBox">
                            <input type="password" required ref={Pass} /> <i>Password</i>
                        </div>
                        <div className="links"> <a href="#">Forgot Password</a> <a href="#">Signup</a>
                        </div>
                        <div className="inputBox">
                            <button id='loginBtn' onClick={loginClick}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLogin