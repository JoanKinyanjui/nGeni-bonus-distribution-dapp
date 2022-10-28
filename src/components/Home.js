import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Container } from '@mui/system';
import '../styles/global.css';



export default function Home(data) {
  let {id,name,address,amount} = data;

  //Edit employee
const onEdit = ()=>{
  fetch("https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/", {
    method: "POST",
    body: JSON.stringify({"data": {"id":"value","name":"value","amount":"value","address":"value"}, "query": "select * from 8ntrAkYDA2Ilq6Me where id='value'"}),
  }).then(res =>{
    if (res.status === 201){
      // SUCCESS
    }
    else{
      // ERROR
    }
  })
}
  //Delete employee
const onDelete = ()=>{
  fetch("https://api.apispreadsheets.com/data/8ntrAkYDA2Ilq6Me/?query=delete from 8ntrAkYDA2Ilq6Me where id='value'").then(res=>{
    if (res.status === 200){
      // SUCCESS
    }
    else{
      // ERROR
    }
  })
}
  console.log(data)
  return (
<Container maxWidth="xxl">
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Wallet Address</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((person,index) => (
            <TableRow
              key={person.index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {personalbar.id}
              </TableCell>
              <TableCell align="right">{person.name}</TableCell>
              <TableCell align="right">{person.address}</TableCell>
              <TableCell align="right"> <IconButton aria-label="edit" onClick={onEdit(id)}><EditIcon /></IconButton> </TableCell>
              <TableCell align="right"><IconButton aria-label="delete" onClick={onDelete(id)}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</Container>
  );
}
