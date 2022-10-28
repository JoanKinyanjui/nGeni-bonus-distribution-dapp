import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Home from './components/Home';
import './styles/global.css'
import { Container } from '@mui/system';

function App() {
  const [id,setId] = useState('');
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [amount,setAmount] = useState(0);
  const [data,setData] = useState([]);

  const onHandleIdChange =(e)=>{
    e.preventDefault()
    setId(e.target.value)
  }

  const onHandleNameChange =(e)=>{
    e.preventDefault()
    setName(e.target.value)
  }

  const onHandleAddressChange =(e)=>{
    e.preventDefault()
    setAddress(e.target.value)
  }

  const onHandleAmountChange =(e)=>{
    e.preventDefault()
    setAmount(e.target.value)
  }
//Post employees
const onSubmitHandler =()=>{
  fetch("https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/", {
    method: "POST",
    body: JSON.stringify({"data": {"id":id,"name":name,"amount":amount,"address":address}}),
  }).then(res =>{
    if (res.status === 201){
      // SUCCESS
    }
    else{
      // ERROR
    }
  })

}

//Read employeees from the spreadsheet
useEffect(()=>{
 async function fetchedData() {
  let response = await  fetch("https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/")
  let responseA = await response.json()
  let   employees = responseA.data
  setData(employees)
  return employees
}
// const baseUrl = 'https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/'
// const fetchData=async()=>{
//  await fetch(baseUrl).then(response=>response.json()).then(data=>setData(data))
// }
fetchedData()
},data);


// Delete Employee 
fetch("https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/?query=delete from 8ntrAkYDA2Ilq6Me where id='value'").then(res=>{
	if (res.status === 200){
		// SUCCESS
	}
	else{
		// ERROR
	}
})

  return (
    <div className="w-screen block">
      <Container className=''>
      <div className=" text-xl md:text-3xl my-6 md:my-12  "> NGENI BONUS DAPP</div>
<div className='pb-16 pt-8'>
  <form onSubmit={onSubmitHandler}>

<div className='w-screen mx-auto flex py-8'>
<label className='text-base mr-8 w-36' >Work Id:</label>
<input 
size="700"
className='outline-none bg-slate-50 py-4 px-2 rounded-sm'
  type="number"
  name="id"
  onChange={onHandleIdChange}
  value={id}
  />
</div>

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
  name="walletAddress"
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

<Home data= {data} />
</div>
  );
}

export default App;
