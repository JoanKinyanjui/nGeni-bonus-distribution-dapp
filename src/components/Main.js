import React, {useEffect, useState} from 'react';
import Home from './Home';
import '../styles/global.css'
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import {Link} from 'react-router-dom'
import PayUp from './payUp';


function Main() {
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [amount,setAmount] = useState('');
  const [employees,setEmployees] = useState([]);


  const onHandleNameChange =(e)=>{
    setName(e.target.value)
  }

  const onHandleAddressChange =(e)=>{
    setAddress(e.target.value)
  }

  const onHandleAmountChange =(e)=>{
    setAmount(e.target.value)
  }

useEffect(()=>{
const getEmployees = async()=>{
 const response= await fetch('http://localhost:8000/employees')
  
  const people = await response.json()
  setEmployees(people)
  
}
getEmployees()
})

//Post data...
const onSubmitHandler = async(e)=>{
  e.preventDefault();
  setAmount('')
  setName('')
  setAddress('')
  let response = await fetch("http://localhost:8000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          amount
        }),
      });
  
      // let { msg, success } = await response.json();
      // console.log({
      //   msg,
      //   success,
      // })
  
  
}

  return (
    <div className="w-screen block">
      <Container className=''>
      <div className=" text-xl md:text-3xl my-6 md:my-12 flex  place-content-between"> 
      <div className=''>NGENI BONUS DAPP</div>
      <Link to="/login" ><div className=''><Button variant='contained'>Pay Up</Button> </div></Link>
   
      </div>
<div className='pb-16 pt-8'>
  <form onSubmit={onSubmitHandler}>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Name:</label>
<input 
className='outline-none bg-slate-50 py-4 px-2 rounded-sm'
  type="text"
  name="name"
  onChange={onHandleNameChange}
  value={name}
  />
  </div>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Wallet_Address:</label>
<input 
className='outline-none bg-slate-50 py-4 px-2 rounded-sm'
  type="text"
  name="address"
  onChange={onHandleAddressChange}
  value={address}
  />
  </div>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Amount:</label>
<input 
className='outline-none bg-slate-50 py-4 px-2 rounded-sm'
  type="text"
  name="amount"
  onChange={onHandleAmountChange}
  value={amount}
  />
  </div>
<div className='w-full place-items-center flex justify-items-stretch '>
<input type="submit" value="Add" className='bg-slate-300 py-2 px-8 rounded-md mx-auto justify-self-center' />
</div>
</form>
</div>
      </Container>

<Home employees= {employees} />

</div>
  );
}

export default Main;