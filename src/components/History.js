import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { Link, useLocation } from 'react-router-dom';
import { Container } from '@material-ui/core';
import {ethers, utils} from 'ethers';


function History() {
  const location = useLocation();
  const history = location.state;
console.log(history);

  return (
    <div>
      
      <div className='flex place-content-between w-screen bg-black py-8 text-red-500'>
        <p className='mx-4 font-normal text-2xl'>BONUS DAPP TRANSACTION HISTORY</p>
   <Link to='/payup'>
   <p className='mx-4'> back</p>
   </Link>
      </div>
      <Table striped bordered hover >
      <thead>
        <tr>

          <th>Transaction hash</th>
          <th>Wallet ddress</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className='text-sm '>
        {history.map((tranx)=>(
        <tr key={tranx.hash}>
        <td>{tranx.hash}</td>
        <td>{tranx.to}</td>
        <td>{ethers.utils.formatEther( tranx.rawContract.value)*10**18}</td>
      </tr>
        ))}
      
      </tbody>
    </Table>

       </div>
  )
}

export default History