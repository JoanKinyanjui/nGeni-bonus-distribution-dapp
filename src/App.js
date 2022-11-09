import React, {useEffect, useState} from 'react';
import { Routes,BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './components/Authentification/Login';
import SignUp from './components/Authentification/SignUp';
import EditableTable from './components/EditableTable';
import History from './components/History';
import Main from './components/Main';
import PayUp from './components/payUp';
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import Settings from './components/Settings';

const activeChainId = ChainId.Goerli;

function App(){
  return (

<>
<Router>
<div className='App'>

  <Routes>
    <Route exact path='/'  element={<Main />}/>
    <Route exact path='/payup'  element={<PayUp />}/>
    <Route exact path='/login'  element={<Login />}/>
    <Route exact path='/signup'  element={<SignUp />}/>
    <Route exact path='/history'  element={<History />}/>
    <Route exact path='/settings'  element={<Settings />}/>
</Routes>
</div>
</Router>
</>

  );
}

export default App;
