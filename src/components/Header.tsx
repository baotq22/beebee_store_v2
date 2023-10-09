import logo from '../assets/3.png'
import './css/navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { logout } from "../slices/userLoginSlice";

function Header() {
    const navigate = useNavigate();

    const productList = useSelector(state => state.productChosenList)

    // console.log(productList.length);

    const userLogin = useSelector(state => state.userLogin);

    // console.log(userLogin)

    const dispatch = useDispatch();
    const [userChosing, setUserChosing] = useState()

    function removeUserChosing() {
        setUserChosing(undefined)
    }

    const cartList = JSON.parse(localStorage.getItem('cart'));

    function logoutUser() {
        dispatch(logout());
        navigate('/login');
        window.location.reload();
    }

    return (
        <>
            <div id='navbar' style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: 100, backgroundColor: '#4a4a4a' }}>
                <span style={{cursor: 'pointer'}} onClick={() => navigate(`/`)}><img src={logo} className="logo" alt="Logo" /></span>
                <button id='signIn' onClick={logoutUser}>Sign Out</button>
                <Link to={`/users/${userLogin?.id}`}><p id='userLogin'>Welcome, {userLogin?.username}</p></Link>
                <button id='signIn' onClick={() => navigate(`/product-chosen-list`)}>List Cart: {cartList.length}</button>
                <button id='signIn' onClick={() => navigate(`/all-users`)}>Manage Users</button>
                <button id='signIn' onClick={() => navigate(`/all-products`)}>Manage Product</button>
            </div>
        </>
    )
}

export default Header

