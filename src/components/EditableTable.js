import React, { useEffect, useState, } from 'react';
import MaterialTable from 'material-table';
import '../styles/global.css';
import { Button, getTableSortLabelUtilityClass } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { red } from '@mui/material/colors';
import { Container } from '@mui/system';
import { Link } from 'react-router-dom';
import {ethers, utils} from 'ethers';
import { Alchemy, Network } from "alchemy-sdk";
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './constants';


function App() {
  //const zero = BigNumber.from(0);
  const [adminAcc,setAdminAcc]= useState({admin:""});
  const [data,setData] = useState("")
  const [account,setAccount] = useState("")
  const [balance,setBalance] = useState(0)
  const[sum,setSum]=useState(0)
  const [history,setHistory]=useState('')

  const connectWallet = async () => {
    const addressArray = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const add = addressArray[0];
    setAccount(
      String(add).substring(0, 5) + "..." + String(add).substring(38)
    );
  };

const [employees,setEmployees] = useState([]);
const [emplyeeAmounts, setEmployeeAmounts] = useState([]);
const [employeeAddressses, setEmployeeAddreses] = useState([]);

useEffect(()=>{
  getEmployees()
  getBalance()
  getTotal()
  getHistory()
},[])
    
const getEmployees = async()=>{
         const response= await fetch('http://localhost:8000/employees')
          
          const people = await response.json()
         await setEmployees(people)
          // getTotal()
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
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  // const balance = await provider.getBalance("ethers.eth");
  // ethers.utils.formatEther(balance);
  // console.log(balance);
  let tx = await contract.batchTransfer(employeeAddressses,emplyeeAmounts);
  await tx.wait();

  console.log("hash", tx.hash);
  alert('Transfer successful');
}

//Get Transaction History

//zBso5VaCDfXiyBQlZ5J9RvJdEm2NGa1l
const config = {
  apiKey: "zBso5VaCDfXiyBQlZ5J9RvJdEm2NGa1l",
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(config);

const getHistory =async ()=>{
  const historyData = await alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: "0x921824BBBeee107c8DAc750163f673519AA364Aa",
    category: ["erc20"],
  });
  setHistory(historyData.transfers)
  // console.log(historyData.transfers[0].rawContract.value);
}

//Get Smart Contract Balance
const getBalance = async()=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI,signer);
  let tx2 = await contract.getSmartContractTokenBalance();
  // tx2.wait();
//  await setBalance(tx2);
  let tx2Omoka = await utils.formatUnits(tx2.toString())
  setBalance(tx2Omoka);
  console.log(tx2Omoka,'successful');
}

//SetAdmin
const onHandleAdminChange =(e)=>{
  setAdminAcc(e.target.value)
  console.log(adminAcc)
}
const onSubmitHandler = async(e)=>{
  e.preventDefault();
  // const admin
  console.log("here", adminAcc.admin)
  console.log('submitted')
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  console.log("fuck");
  let tx3 = await contract.setAdmin(adminAcc.admin);
  console.log("fucking");
  await tx3.wait();
  alert("successfull")
  //console.log(tx3,'successful');
}

//Get Total Amount
const getTotal=async()=>{
let total = 0;
for(var i=0; i<employees.length; i++){
  let just= employees[i].amount;
  total+= parseInt(just)
}
setSum(total)

}



  return (

    <div className="App">
 <div className='bg-black w-screen  flex '>
  <Container maxWidth="xl" className="flex place-content-center w-full">
    <div className='py-8  text-sans w-full flex place-content-center'>
      <p className='text-2xl font-medium text-red-500'>NGENI BONUS DAPP</p>
    </div>
    <div className='w-full bg-green flex place-content-between py-2 '>
<Link to="/history" state={history}>
<div className='text-red-500 mr-4'>
      <button className='text-red-500' onClick={()=>getHistory()} >History</button>
      </div>
</Link>
      <div className='ml-4'>
      {account ? (
            <button  className='text-red-500'>{account}</button>
          ) : (
            <button className='text-red-500' onClick={connectWallet}>
              {"Connect wallet "}
            </button>
          )}

      </div>

    </div>
    
  </Container>
  
</div>

<div>
  

</div>
<div className='h-max bg-red-100 w-screen flex place-content-between py-2 pb-8 '>
<div className='flex'>
  <button onClick={getBalance} className='text-red-300 font-normal md:font-medium text-sm md:text-base rounded-full self-center'>Bal:{balance}</button>
  </div>
<div className='flex'>
  <SettingsIcon sx={{ color: red[300] }} fontSize='medium' />
        <div>
            <form onSubmit={onSubmitHandler}>
                <input 
                placeholder='address..'
                className=' px-2 md:px-4 py-2 md:py-2 bg-red-50 ml-2'
                type='text' 
                value={adminAcc.admin}
                onChange={(e)=>setAdminAcc({...adminAcc, admin:e.target.value})}
                />
                <input  type='submit' value='change Admin' className='text-red-500 bg-red-300 px-2 py-1' />
            </form>
        </div>
    </div>

</div>

   
  
      <MaterialTable
      title={<div><button onClick={()=>getTotal()}> <RotateLeftIcon sx={{ color: red[300] }} fontSize='large' /> {(sum>balance) ? `You exceeded by ${sum-balance}` : `${sum}`}</button></div>}
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
                (onBulkSend())} className="text-red-500 bg-red-300 px-4 py-2 rounded-lg">{`Bulk Send`}</button>
            ) : (
              <button className="text-red-500 bg-red-300 px-4 py-2 rounded-lg" onClick={()=>connectWallet()}>
                {"Connect Wallet"}
              </button>
            )}


      </div>
     

    </div>

  );
}

export default App;


