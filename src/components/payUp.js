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
import EditableTable from "./EditableTable";


function PayUp() { 
  const navigate = useNavigate();


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

        
  return (
    <>
    <EditableTable />


    </>
  )
}

export default PayUp;