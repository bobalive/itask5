import React, { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Tools } from './Components/Tools'
import axios from 'axios';
import useIsScrolled from '../hooks/useIsScrolled';


function App() {
  const [users, setUsers] = useState(null)
  const [err , setErr] = useState(0)
  const [seed, setSeed] = useState(0)
  const [loc,setLoc] = useState('ger')
  const isPageScrolled = useIsScrolled()

  let page = 1

  const getUsers = async()=>{
    if(!users){
      let res = await axios.get(`http://localhost:5000/?page=${page}&loc=${loc}&err=${err}&seed=${seed}`)
      if(res.status == 200){
        setUsers(res.data)
      }
    }else if(isPageScrolled){
      page++
      let res = await axios.get(`http://localhost:5000/?page=${page}&loc=${loc}&err=${err}&seed=${seed}`)
      if(res.status == 200){
        setUsers([ ...users, ...res.data ])
      }
    } 

    

  }
  useEffect(()=>{
    getUsers()
  },[isPageScrolled])

  return (
<div className='w-100 bg-dark d-flex justify-content-center align-items-center position-relative' style={{minHeight:'100vh'}}> 

<Container className='vw-100 bg-dark text-white mt-5 position-relative'>
  <Tools err = {err} setErr ={setErr} seed ={seed} setSeed ={setSeed} loc={loc}setLoc ={setLoc} setUsers = {setUsers} users = {users}></Tools>
  <Table striped bordered hover variant="dark" size='lg' className='w-100 '>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Adres</th>
        <th>Number</th> 
      </tr>
    </thead>
    <tbody key={1}>
      {users &&users.map((item, i)=>{
        return(
          <tr key={i}>
          <td>{item.userId}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
          <td>{item.number}</td>
        </tr>
        )

      })}
    </tbody>
  </Table>
</Container>
</div>
  )
}

export default App
