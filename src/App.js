import React, {useEffect, useState} from 'react';
import { Routes,BrowserRouter as Router,Route } from 'react-router-dom';
import Login from './components/Authentification/Login';
import SignUp from './components/Authentification/SignUp';
import EditableTable from './components/EditableTable';
import Main from './components/Main';
import PayUp from './components/payUp';

function App(){
  return (
<>
<Router>
<div className='App'>

  <Routes>
    <Route exact path='/'  element={<EditableTable />}/>
    <Route exact path='/payup'  element={<PayUp />}/>
    <Route exact path='/login'  element={<Login />}/>
    <Route exact path='/signup'  element={<SignUp />}/>
</Routes>
</div>
</Router>
</>
  );
}

export default App;
