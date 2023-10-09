import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

export function checkLogin() {
    const userLogin = useSelector(state => state.userLogin);
    const navigate = useNavigate();

    useEffect(() => {
        const usernameLocalStorage = localStorage.getItem('username');
        const passwordLocalStorage = localStorage.getItem('password');
        
        if (!userLogin?.username && !userLogin.password && !usernameLocalStorage && !passwordLocalStorage) {
            navigate('/login')
        }
    }, [userLogin?.username, !userLogin.password]);

    // useEffect(() => {
    //     if (!userLogin?.isloginSuccess) {
    //         navigate('/login')
    //     }
    // }, [userLogin?.isloginSuccess])
}

// export default checkLogin