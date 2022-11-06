import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { ConnectWallet } from "@thirdweb-dev/react";


import '../styles/global.css'
import { Button } from '@mui/material';


function Home({employees}) {

  return (
   
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 0 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Wallet-Address</TableCell>
                <TableCell align="center">amount</TableCell>
                <TableCell align="center">Delete</TableCell>
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
                  <TableCell  align="center"><Button  startIcon={<DeleteIcon />}></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      

      );
    }
    

export default Home