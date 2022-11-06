import React, { useEffect, useState, } from 'react';
import MaterialTable from 'material-table';
import '../styles/global.css';
import { Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import { ConnectWallet } from "@thirdweb-dev/react";




function App() {


const [employees,setEmployees] = useState([]);
    
const getEmployees = async()=>{
         const response= await fetch('http://localhost:8000/employees')
          
          const people = await response.json()
          setEmployees(people)
          console.log(employees)
        }
        getEmployees()

console.log(employees)
  const columns = [
    { title: "ID", field: "id", editable: false },
    { title: "Name", field: "name" },
    { title: "Wallet-address", field: "address" },
    { title: "Amount", field: 'amount', },
  ]

//OnClick Send
const onClickSend =async()=>{

}
//Get Addresses and Amounts
function callData(){
  let allAddresses=[];
  let allAmounts=[];
 
  let modifiedArr = employees.map(function(element){
    allAddresses.push(element.address);
    allAmounts.push(element.amount);
  });

  console.log(allAddresses);
  console.log(allAmounts);;
}

callData();

 


  return (

    <div className="App">
 <div className='bg-black w-screen  flex'>
  <Container maxWidth="xl" className="">
    <div className='py-4 text-3xl text-sans w-full md:w-full font-bold '><p className='text-red-500 place-content-left md:place-content-center  grid'>NGENI BONUS DAPP</p></div>
    <div className='w-full md:w-full bg-green flex place-content-between py-2'>
    <Link to="/history" >
       <button className='text-red-500'>Transaction History</button>
       </Link>
      <div>
      <ConnectWallet accentColor="#ef4444" colorMode="dark" />
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
        <button onClick={onClickSend} variant='contained' className='py-2 px-4 bg-red-500 rounded-md' >Bulk Send</button>

      </div>
    </div>
  );
}

export default App;


