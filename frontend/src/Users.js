import { Box } from "@mui/material";
import UserForm from "./UserForm";
import UsersTable from "./UsersTable";
import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
    const [users,setUsers] = useState([]);
    const [submitted,setSubmitted] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [selectedUser,setSelectedUser] = useState({});

    useEffect(() => {
        getUsers();
    },[])

    const getUsers = () => {
        axios.get('http://localhost:8080/api/v1/getusers')
            .then(response => {
                setUsers(response.data || [])
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    const addUser = (data) => {
        setSubmitted(true);

        const payload = {
            id : data.id,
            name : data.name,
        }
        axios.post('http://localhost:8080/api/v1/adduser',payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    const updateUser = (data) => {
        setSubmitted(true);

        const payload = {
            id: data.id,
            name : data.name,
        }
        axios.put('http://localhost:8080/api/v1/updateuser',payload)
            .then(() => {
                getUsers();
                setSubmitted(false);
                setIsEdit(false);
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    const deleteUser = (data) => {
        setSubmitted(true);

        const payload = {
            id : data.id,
            name : data.name
        }
        axios.delete('http://localhost:8080/api/v1/deleteuser',{data :payload})
            .then(() => {
                getUsers();   
                setSubmitted(false);
                setIsEdit(false);           
            })
            .catch(error => {
                console.error("Axios Error : ",error)
            })
    }

    return (
        <Box
            sx={{
                width : 'calc(100% - 100px)',
                margin : 'auto',
                marginTop: '100px'
            }}
        >
            <UserForm 
                addUser = {addUser}
                updateUser = {updateUser}
                submitted = {submitted}
                data = {selectedUser}
                isEdit = {isEdit}
            />
            <UsersTable 
            rows={users}
            selectedUser = {
                data => {
                    setSelectedUser(data);
                    setIsEdit(true);
                }
            }
            deleteUser ={ data => window.confirm("Are you sure to want delete?" && deleteUser(data))}
            />
        </Box>       
    );
}

export default Users;