import React, { useEffect, useState } from 'react'
import Rand from '../assets/shuffle-solid.svg'
import { Form } from 'react-bootstrap'
import axios from 'axios';

export const Tools = ({setUsers, users,err,setErr,seed,setSeed,loc,setLoc}) => {

  useEffect(()=>{
    const timeout = setTimeout(async()=>{
      let res = await axios.get(`https://itask5.onrender.com/?page=1&loc=${loc}&err=${err}&seed=${seed}`)
      if(res.status == 200){
        setUsers(res.data)
      }
    },200) 
    return ()=>{
      clearTimeout(timeout)
    }
  },[err,loc,seed])

  const handlerRangeChange = async (e)=>{
    let value = e.target.value

    if(value >=1000){
      setErr(1000)
    }else if(value < 0){
      setErr(0)
    }else{
      setErr(e.target.value)
    }
    
  }
  const makeRandSeed = ()=>{
    setSeed(Math.floor(Math.random()*99999))
  }
  const regionHandler = async(e)=>{
    setLoc(e.target.value)

  }
  const exportToCSV = () => {
    
    const csvContent = "data:text/csv;charset=utf-8," + users.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className='gap-5 d-flex mb-3'>
    
    <div className='d-flex align-items-center gap-3'>
        Region:
    
    <Form.Select aria-label="Default select example" className='fw-bold' value={loc} onChange={(e)=>regionHandler(e)}>
      <option value="ger">Germany</option>
      <option value="uk">UK</option>
      <option value="ru">Russia</option>
    </Form.Select>

    </div>

    <div className='d-flex gap-2 align-items-center ml-3'>
    <Form.Label>Errors:</Form.Label>
      <Form.Range 
        min={0}
        max={10}
        step={0.25}
        value={err}
        onChange={handlerRangeChange}
      />
      <Form.Control type="number" placeholder='err'  value={err} onChange={handlerRangeChange}  className='w-25'/>
    </div>
    <div  className='d-flex gap-2 align-items-center ml-3' style={{cursor:'pointer'}}> 
    <Form.Label>Seed: </Form.Label>
     <Form.Control type='number' min={0} value={seed} onChange={(e)=>setSeed(e.target.value)} style={{width:"100px"}}></Form.Control>
     <img src={Rand} alt=""  width={30} height={30} className='bg-light p-1 rounded-1' onClick={makeRandSeed}/>
     </div>
    <div  className='bg-light p-1 border border-dark border-2 rounded-3 text-black fw-bold' onClick={()=>exportToCSV()} style={{cursor:'pointer'}}> Export</div>
</div>
  )
}
