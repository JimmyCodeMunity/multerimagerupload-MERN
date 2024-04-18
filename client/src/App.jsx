import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [file, setFile] = useState()
  const [email, setEmail] = useState('')
  const [user, setUser] = useState([]);

  const handleUpload = (e) => {
    const formdata = new FormData();
    formdata.append('file', file);
    formdata.append('email', email);
    console.log(file);
    axios.post('http://localhost:3000/upload', formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err))

  }


  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getuserdata');
      const userdata = response.data;
      console.log(userdata);
      setUser(userdata);

    } catch (error) {

      console.log('error fetching userdata')

    }
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload Image</button>
      <br />
      <br />
      <div>
        {user.map((me, index) => {
          return (
            <div key={index}>
              <img src={`http://localhost:3000/images/${me.image}`} alt={me.email} />
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default App
