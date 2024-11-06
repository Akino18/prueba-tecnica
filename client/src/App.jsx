import { useEffect, useState } from 'react'
import './index.css'
import {UserList} from './components/UserList.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {AddUser} from './components/AddUser.jsx'
import {UserItem} from './components/UserItem.jsx'
export function App() {
  const [users, getusers] = useState(0)
//consulta a al backend con useEffect

useEffect(() => {
  fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data => getusers(data))
}, [])

  return (
    <>

      <Router>
        <main>
          <Routes>
            <Route path="/" element={<UserList users={users} />} />

            <Route path="/users/create" element={<AddUser/>}/>
            
            <Route path="/users/:id" element={<UserItem/>} />
          </Routes>

        </main>
      </Router>
      
    </>
  )
}
