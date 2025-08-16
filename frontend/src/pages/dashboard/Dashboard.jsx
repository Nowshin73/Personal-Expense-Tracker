import React, { useEffect, useState } from 'react'
import AddExpense from './AddExpense'
import Expenses from './Expenses'
import ExpenseChart from './ExpenseChart';

const Dashboard = () => {
     const [expenses, setExpenses] = useState([]);
  
      useEffect(() => {
          fetch("http://localhost:5000/expenses")
              .then(res => res.json())
              .then(data => setExpenses(data))
      }, [expenses])
      
  return (
    <div className='bg-gray-900 pb-20'>
        <AddExpense setExpenses={setExpenses}></AddExpense>
        <div className="expenses">
          <Expenses expenses={expenses}></Expenses>
        </div>
       <div>
          <p className="mx-auto pb-4 mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
         Expenses by Category
      </p>
        <ExpenseChart expenses={expenses}></ExpenseChart>
        </div> 
    </div>
  )
}

export default Dashboard