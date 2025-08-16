import React from 'react'
import AddExpense from './AddExpense'
import Expenses from './Expenses'

const Dashboard = () => {
  return (
    <div className='bg-gray-900'>
        <AddExpense></AddExpense>
        <div className="expenses">
          <Expenses></Expenses>
        </div>
    </div>
  )
}

export default Dashboard