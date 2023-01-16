import React, { useState } from 'react'
import axios from 'axios'


function CreateUser() {
    const [image, setImage] = useState('')

    const handleImage = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', image)

        await axios.post('http://localhost:4243/api/user/createUser', formData)
        alert('Image uploaded successfully')
    }
  return (
    <div>
        <form onSubmit={handleImage}>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default CreateUser