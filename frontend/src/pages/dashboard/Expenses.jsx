import React, { useEffect, useState } from 'react'
import Expense from './Expense';


const Expenses = () => {
    const [expenses,setExpenses] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:5000/expenses")
        .then(res=>res.json())
        .then(data=>setExpenses(data))
    },[])
  return (
    <div>
        <p className="mx-auto pb-20 mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
          My Personal Expenses
        </p>
      {
        expenses.map((expense,index)=>
           <Expense expense ={expense} key={index} id={index} ></Expense>
        )
      }
    </div>
  )
}

export default Expenses