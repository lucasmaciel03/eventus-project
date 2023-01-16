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
                console.log('-----------' + user.image)
                return (
                    <div key={user.id}>
                        <h3>{user.id}</h3>
                        <img src={`http://localhost:4243/${user.image}`} alt="user" />
                    </div>
                )
            })}
        </div>

    )
}

export default GetUser