import { SetStateAction, useEffect, useContext, useState } from "react";
import { ProductContext, UserContext } from "../App";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from "../axios-instance";
import Modal from "../components/Modal";
import { Outlet, Link, useNavigate } from "react-router-dom";
import PaginationUser from "../components/PaginationUser";
import { checkLogin } from "../checkLogin";
import Header from "../components/Header";
import { ProductChosenContext } from "../App";
import { useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit"

type UserType = {
    id: string
    email: string
    username: string
    fullname: string
    department: string
    positions: string
    createDate: string
    position?: number
}

const schema = yup.object({
    id: yup.string().required(),
    email: yup.string().required(),
    username: yup.string().required(),
    fullname: yup.string().required(),
    department: yup.string().required(),
    positions: yup.string().required(),
    createDate: yup.string().required(),
})

async function addUser() {
    try {
        await axios.post(`https://64f71db49d77540849531dc0.mockapi.io/users`, {
            email: 'f@gremail.com',
            username: 'nhieexu',
            fullname: 'rat la nhieu',
            department: 'REF',
            positions: 'nhieu',
            createDate: dateTime
        })
        getUser();
    } catch (e) {
        alert('lol')
    }
}

const AllUser = () => {
    const [userList, setUserList] = useState<Array<UserType>>([])
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(5);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const getUsers = async () => {
        const res = await axios.get(`https://64f71db49d77540849531dc0.mockapi.io/users`);
    }

    checkLogin();

    // function editUser(index: number) {
    //     // setUserEdit({ ...userList[index], position: index })
    //     setIsModalOpen(true);
    // }

    // function updateUser(user: UserType) {
    //     setUserEdit(undefined);
    //     const listUserClone = [...userList];
    //     listUserClone[user.position] = {
    //         id: user.id,
    //         email: user.email,
    //         username: user.username,
    //         fullname: user.fullname,
    //         department: user.department,
    //         positions: user.positions,
    //         createDate: user.createDate
    //     }
    //     setUserList(listUserClone);
    // }

    async function addNewUserDirectly() {
        try {
            await axios.post(`https://64f71db49d77540849531dc0.mockapi.io/users`)
            // await axios.post(`https://64f71db49d77540849531dc0.mockapi.io/users`, {
            //     email: 'ref@gmail.com',
            //     username: 'nhieexu',
            //     fullname: 'rat la nhieu',
            //     department: 'REF',
            //     positions: 'nhieu',
            //     createDate: dateTime
            // })
            window.location.reload(false);
            getUsers();
        } catch (e) {
            alert('lol');
        }
    }

    async function deleteUser(id: number) {
        try {
            await fetch(`https://64f71db49d77540849531dc0.mockapi.io/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            window.location.reload(false);
            getUsers();
            setLoading(false);
        } catch (e) {
            alert('lol');
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            const res = await axios.get(`https://64f71db49d77540849531dc0.mockapi.io/users`);
            setUserList(res.data);
            setLoading(false);
        }
        fetchUsers();
    }, [])

    const UserList = ({ userList, loading }) => {
        const navigate = useNavigate();
        let loadingContent
        if (loading) {
            loadingContent = <h2 style={{ marginBottom: '30px' }}>Loading....</h2>
        }
    
        return (
            <>
                <table id='table__result'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>EMAIL</th>
                            <th>USERNAME</th>
                            <th>FULLNAME</th>
                            <th>DEPARTMENT</th>
                            <th>POSITION</th>
                            <th>CREATED DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    {loadingContent}
                    <tbody>
                        {
                            userList.map((user, index) =>
                                <tr key={index}>
                                    <td>
                                        {user?.id}
                                    </td>
                                    <td>
                                        {user?.email}
                                    </td>
                                    <td>
                                        {user?.username}
                                    </td>
                                    <td>
                                        {user?.fullname}
                                    </td>
                                    <td>
                                        {user?.department}
                                    </td>
                                    <td>
                                        {user?.positions}
                                    </td>
                                    <td>
                                        {user?.createDate}
                                    </td>
                                    <td>
                                        <button id='actionBtn' onClick={() => navigate(`/users/${user.id}`)}>Details</button>
                                        <button id='actionBtn' onClick={() => deleteUser(user.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </>
        )
    }

    return (
        <div id='form'>
            <Header />
            <div>
                <div className='addButton'>
                    <button id='actionBtn' onClick={addNewUserDirectly}>Add Random</button>
                </div>
                <UserList userList={currentUsers} loading={loading} />
                <PaginationUser usersPerPage={usersPerPage} totalUsers={userList.length} paginate={paginate} />
            </div>
        </div>
    )
}

export default AllUser