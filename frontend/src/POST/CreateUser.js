import React, { useState } from 'react'
import axios from 'axios'


function CreateUser() {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [locationId, setLocationId] = useState('')
    const [birthDate, setBirthDate] = useState('')
    const [profilePicture, setProfilePicture] = useState('')

    const handleImage = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('name', name)
        formData.append('surname', surname)
        formData.append('username', username)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('locationId', locationId)
        formData.append('birthDate', birthDate)
        formData.append('profilePicture', profilePicture)

        await axios.post('http://localhost:4243/api/user/createUser', formData)
        alert('Image uploaded successfully')
    }
  return (
    <div>
        <form onSubmit={handleImage}>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Surname" onChange={(e) => setSurname(e.target.value)} />
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <input type="text" placeholder="LocationId" onChange={(e) => setLocationId(e.target.value)} />
            <input type="text" placeholder="BirthDate" onChange={(e) => setBirthDate(e.target.value)} />
            <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default CreateUser