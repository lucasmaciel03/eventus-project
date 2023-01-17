import React, { useState, useEffect } from 'react'
import axios from 'axios';


function GetUser() {
    const [user, setUser] = useState([])

    useEffect(() => {
        const getUserData = async () => {
            const { data } = await axios.get('http://localhost:4243/api/user/getAllUsers')
            console.log(data)
            setUser(data)
        }
        getUserData()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            {user.map((user) => {
                console.log('-----------------' + user.profilePicture)
                return (
                    <div key={user.id}>
                        <h3>{user.id}</h3>
                        <h3>{user.username}</h3>
                        <h3>{user.name}</h3>
                        <h3>{user.surname}</h3>
                        <h3>{user.email}</h3>
                        <h3>{user.password}</h3>
                        <h3>{user.locationId}</h3>
                        <h3>{user.birthDate}</h3>
                        <h3>{user.joinedDate}</h3>
                        <img src={`http://localhost:4243/uploads/${user.profilePicture}`} alt="user" />
                    </div>
                )
            })}
        </div>

    )
}

export default GetUser