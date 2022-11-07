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
  
}

// const onDelete=(id)=>{
// employees.splice(id,1)
// }

  return (
    <div className="w-screen block">
      {/* <Container className='w-full'> */}
<div className='w-screen bg-black'>
  <div className=" flex  place-content-between py-4"> 
      <div className='text-red-500 py-4 text-3xl text-sans font-bold ml-4'>NGENI BONUS DAPP</div>
<div>
<Link to="/login" >
        <div className='mr-4 mt-4'><button className='py-2 px-4 bg-red-500 rounded-md text-normal'>Pay Up</button>
         </div>
      </Link>
</div>
   
      </div>
      </div>
<Container maxWidth='xl' className='pb-16 pt-8 w-screen '>
  <form onSubmit={onSubmitHandler} className=" mx-auto">

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Name:</label>
<input 
className='outline-none bg-slate-50 py-4 px-8 rounded-sm '
  type="text"
  name="name"
  onChange={onHandleNameChange}
  value={name}
  />
  </div>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Wallet_Address:</label>
<input 
className='outline-none bg-slate-50 py-4 px-8 rounded-sm'
  type="text"
  name="address"
  onChange={onHandleAddressChange}
  value={address}
  />
  </div>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Amount:</label>
<input 
className='outline-none bg-slate-50 py-4 px-8 rounded-sm'
  type="text"
  name="amount"
  onChange={onHandleAmountChange}
  value={amount}
  />
  </div>
<div className='w-full place-items-center flex justify-items-stretch '>
<input type="submit" value="Add" className='bg-red-500 py-2 px-8 rounded-md mx-auto justify-self-center' />
</div>
</form>
</Container>
      {/* </Container> */}

<Home employees= {employees}  />

</div>
  );
}

export default Main;