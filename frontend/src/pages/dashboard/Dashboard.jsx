import React, { useEffect, useState } from 'react'
import AddExpense from './AddExpense'
import Expenses from './Expenses'

const Dashboard = () => {
     const [expenses, setExpenses] = useState([]);
  
      useEffect(() => {
          fetch("http://localhost:5000/expenses")
              .then(res => res.json())
              .then(data => setExpenses(data))
      }, [expenses])
      
  return (
    <div className='bg-gray-900'>
        <AddExpense setExpenses={setExpenses}></AddExpense>
        <div className="expenses">
          <Expenses expenses={expenses}></Expenses>
        </div>
    </div>
  )
}

export default Dashboard