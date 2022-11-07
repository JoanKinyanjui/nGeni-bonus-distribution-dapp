import React, { useEffect, useState, } from 'react';

import MaterialTable from 'material-table';
import '../styles/global.css';
import { Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import {ethers} from 'ethers';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './constants';


function App() {
  const [data,setData] = useState("")
  const [account,setAccount] = useState("")
  const [balance,setBalance] = useState('')

  const connectWallet = async () => {
    const addressArray = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const add = addressArray[0];
    setAccount(
      String(add).substring(0, 5) + "..." + String(add).substring(38)
    );
  };
  // useEffect(() => {
  //   connectWallet();
  // }, []);

const [employees,setEmployees] = useState([]);
const [emplyeeAmounts, setEmployeeAmounts] = useState([]);
const [employeeAddressses, setEmployeeAddreses] = useState([]);
const contractAddress = CONTRACT_ADDRESS;
const contractAbi = CONTRACT_ABI;

useEffect(()=>{
  getEmployees()
},[])
    
const getEmployees = async()=>{
         const response= await fetch('http://localhost:8000/employees')
          
          const people = await response.json()
          setEmployees(people)
        }

  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name", editable: false },
    { title: "Wallet-address", field: "address", editable: false },
    { title: "Amount", field: 'amount', },
  ]

//OnClick Send
const onBulkSend = async()=>{
  let allAddresses=[];
  let allAmounts=[];
 
  let modifiedArr = await employees.map(function(element){
    allAddresses.push(element.address);
    allAmounts.push(element.amount);
  });
  await setEmployeeAddreses(allAddresses);
  await setEmployeeAmounts(allAmounts);
sendTo()
}
const sendTo = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // let amount = 2;
  // const priceFormatted = ethers.utils.parseEther(amount.toString());
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
  // const balance = await provider.getBalance("ethers.eth");
  // ethers.utils.formatEther(balance);
  // console.log(balance);
  let tx = await contract.batchTransfer(employeeAddressses,emplyeeAmounts);
  await tx.wait();
  console.log('successful');
}

//Get Transaction History
const getHistory = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI,signer);
  let tx1 = await contract.getArr();
  tx1.wait();
  setData(tx);
  console.log(data,'successful');
}

//Get Smart Contract Balance
const getBalance = async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI,signer);
  let tx2 = await contract.getSmartContractTokenBalance();
  tx2.wait();
  setBalance(tx);
  console.log(data,'successful');
}

  return (

    <div className="App">
 <div className='bg-black w-screen  flex'>
  <Container maxWidth="xl" className="">
    <div className='py-4 text-3xl text-sans w-full font-bold flex place-content-between '>
      <p className='text-red-500 '>NGENI BONUS DAPP</p>
      <button onClick={getBalance} className='text-red-500 '>Contract Balance</button>
    </div>
    <div className='w-full bg-green flex place-content-between py-2'>
      <div className='text-red-500'>
      <button className='text-red-500'>Transaction History</button>
      </div>
    <Link to="/history" state={employees} >
       <button className='text-red-500'>set Admin</button>
       </Link>
      <div>
      {account ? (
            <button  className='text-red-500'>{account}</button>
          ) : (
            <button className='text-red-500' onClick={connectWallet}>
              {"Connect wallet "}
            </button>
          )}


        {/* {<button className='text-white' onClick={connectWallet()}>Connect Wallet</button> } */}
      </div>
    </div>
  </Container>
</div>

   
  
      <MaterialTable
        title="Employee Data"
        data={employees}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...employees, { id: employees.length+1, ...newRow }]
            setTimeout(() => {
              setEmployees(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...employees]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setEmployees(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...employees]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setEmployees(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, addRowPosition: "last"
        }}
      />

      <div className='w-screen  grid place-items-center h-25  py-8'>
      
      {account ? (
            <button onClick={()=>
              (onBulkSend())} className="text-black">{"Bulk Send"}</button>
          ) : (
            <button className="text-black" onClick={()=>connectWallet()}>
              {"connect Wallet"}
            </button>
          )}

      </div>
      <button onClick={getHistory}>  Get History</button>
    </div>
  );
}

export default App;


