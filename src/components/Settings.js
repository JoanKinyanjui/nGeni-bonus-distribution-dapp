import React , {useState} from 'react';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './constants';
import {ethers, utils} from 'ethers';

function Settings() {
    const [adminAcc,setAdminAcc]= useState('');
    const onHandleAdminChange =(e)=>{
        setAdminAcc(e.target.value)
      }
      const onSubmitHandler = async()=>{
        // console.log('submitted')
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI,signer);
        let tx3 = await contract.setAdmin(adminAcc);
        await tx3.wait();
        console.log(tx3,'successful');
      }

    //Set Admin

  return (
    <div>Settings
        <div>
            <form onSubmit={onSubmitHandler}>
                <label >Admin Address:</label>
                <input 
                type='text' 
                value={adminAcc}
                onChange={onHandleAdminChange}
                />
                <input  type='submit' value='change' />
            </form>
        </div>
    </div>
  )
}

export default Settings