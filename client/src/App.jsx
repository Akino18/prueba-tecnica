import { useEffect, useState } from 'react'
import './index.css'

export function App() {
  const [count, setCount] = useState(0)
//consulta a al backend con useEffect



const hanbleClick = () => {
  fetch('http://localhost:3000/users',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    
    },
  }
    
  )
    .then(res => console.log(res))
}

  return (
    <>
      <h1>{count}</h1>

      <button onClick={() => hanbleClick(count + 1)}>consultar</button>
    </>
  )
}
