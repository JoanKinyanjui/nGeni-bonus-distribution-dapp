import React from 'react';
import { useLocation } from 'react-router-dom';


function History() {
  const location = useLocation();
  const employees = location.state;
console.log(employees);

  return (
    <div>History </div>
  )
}

export default History