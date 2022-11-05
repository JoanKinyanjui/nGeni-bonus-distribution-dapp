import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import '../styles/global.css'
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


function PayUp() { 
  const navigate = useNavigate();

  //Editing Functions
  const handleRemove =(i)=>{

  }
  const startEditing =(i)=>{
    let editIdx =i
  }
  

  const stopEditing =()=>{
    let editIdx =-1
  }

  //useEffect
  React.useEffect(()=>{
     const fetchData = async () => {
         let response = await fetch("http://localhost:8000/checkToken")
    
         let { msg, success } = await response.json();
         console.log({
           msg,
           success,
         });
     
     
         if (!success) {
             // navigate to home page
            navigate('/login')
         }
     }
 fetchData();
 
  },[])
const [employees,setEmployees] = useState([]);
    useEffect(()=>{
        const getEmployees = async()=>{
         const response= await fetch('http://localhost:8000/employees')
          
          const people = await response.json()
          setEmployees(people)
          
        }
        getEmployees()
        })

 const distributeBonus =()=>{

 }
        
  return (
    <>
    <div>

<TableContainer component={Paper}>
          <Table sx={{ minWidth: 0 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Wallet-Address</TableCell>
                <TableCell align="center">amount</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((person) => (
                <TableRow
                  key={person.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                     <TableCell align="center" component="th" scope="row">
                    {person.name}
                  </TableCell>
                  <TableCell component="th" scope="row" align="center">
                   {person.address.slice(0,7) +"..."}
                  </TableCell>
                  <TableCell  align="center">{person.amount}</TableCell>
                  <TableCell  align="center"><Button  startIcon={<EditIcon />}></Button></TableCell>
                  <TableCell  align="center"><Button  startIcon={<DeleteIcon />}></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>

    <div className=''>
        <Button variant='contained' onClick={distributeBonus}>Pay Up</Button>
    </div>
    </>
  )
}

export default PayUp;