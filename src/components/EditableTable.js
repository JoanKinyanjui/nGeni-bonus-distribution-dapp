import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import '../styles/global.css';
import { Button } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Container } from '@mui/system';

function App() {


const [employees,setEmployees] = useState([]);
    useEffect(()=>{
      //Connect wallet..
        const getEmployees = async()=>{
         const response= await fetch('http://localhost:8000/employees')
          
          const people = await response.json()
          setEmployees(people)
          console.log(employees)
        }
        getEmployees()
        },[])
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


  return (
    <div className="App">
 <div className='bg-black w-screen h-24 flex'>
  <Container maxWidth="xl" className="">
    <div className='py-4 text-2xl text-sans w-full md:w-full '><p className='text-white place-content-left md:place-content-center  grid'>NGENI BONUS DAPP</p></div>
    <div className='w-full md:w-full bg-green flex place-content-between '>
      <p className='text-white'>Transaction History</p>
      <Button><AccountBalanceWalletIcon style={{color:"white", fontSize:'xx-large'}}/></Button>
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
        <button onClick={onClickSend} variant='contained' className='py-2 px-4 bg-blue-300 roounded-md' >Bulk Send</button>
      </div>
    </div>
  );
}

export default App;



// import React, { useState,useEffect } from 'react';
// import MaterialTable from 'material-table';

// const empList = [];

// function EditableTable() {

//   const [employees,setEmployees] = useState([]);
//     useEffect(()=>{
//         const getEmployees = async()=>{
//          const response= await fetch('http://localhost:8000/employees')
          
//           const people = await response.json()
//           setEmployees(people)
          
//         }
//         getEmployees()
//         },[employees])
//   const columns = [
//     { title: "Id", field: "id" },
//     { title: "Name", field: "name"},
//     { title: "Wallet Address", field: "address" },
//     { title: "Amount", field: "amount" }
//   ]


//   return (
//     <div className="App">
//       <h1 align="center">React-App</h1>
//       <h4 align='center'>Material Table with CRUD operation</h4>
//       <MaterialTable
//         title="Employee Data"
//         data={employees}
//         columns={columns}
//         editable={{
//           onRowAdd: (newRow) => new Promise((resolve, reject) => {
//             const updatedRows = [...employees, {...newRow }]
//             setTimeout(() => {
//               setEmployees(updatedRows)
//               resolve()
//             }, 2000)
//           }),
//           onRowDelete: selectedRow => new Promise((resolve, reject) => {
//             const index = selectedRow.tableData.id -1;
//             const updatedRows = [...employees]
//             updatedRows.splice(index, 1)
//             setTimeout(() => {
//               setEmployees(updatedRows)
//               resolve()
//             }, 2000)
//           }),
//           onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
//             const index=oldRow.tableData.id-1;
//             const updatedRows=[...employees]
//             updatedRows[index]=updatedRow
//             setTimeout(() => {
//               setEmployees(updatedRows)
//               resolve()
//             }, 2000)
//           })

//         }}
//         options={{
//           actionsColumnIndex: -1, addRowPosition: "last"
//         }}
//       />
//     </div>
//   );
// }

// export default EditableTable;