import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddExpense = ({setExpenses}) => {
   const [startDate, setStartDate] = useState(new Date());
    const addExpense = (e) =>{
        e.preventDefault();
        const form = e.target;
        const expense = {
            title: form.title.value,
            amount: parseFloat(form.amount.value),
            category: form.category.value,
            date: startDate
        }
        fetch("http://localhost:5000/expenses",{
          method: 'POST',
          headers:{'content-type': 'application/json'},
          body: JSON.stringify(expense),
        },
      )
         .then(res=>res.json())
          .then(data=>{
            if(data.insertedId){
              alert("successfully added");
            }
          })
          
           form.reset();
      fetch("http://localhost:5000/expenses")
       .then(res=> res.json())
       .then(data=>setExpenses(data))

    }
    return (
        <div className='relative py-36'>
            <div className="mx-auto max-w-2xl  text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">Add Your Personal Expenses</h2>
                <p className="mt-2 text-lg/8 text-gray-400">Aute magna irure deserunt veniam aliqua magna enim voluptate.</p>
            </div>
             <form onSubmit={addExpense} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm/6 font-semibold text-white">
              Title
            </label>
            <div className="mt-2.5">
              <input
                id="title"
                name="title"
                type="text"
                 required 
                 minLength={3}
                 placeholder='Add your expense title'
                className="block w-full rounded-md bg-gray-700  px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
            <div>
            <label htmlFor="amount" className="block text-sm/6 font-semibold text-white">
              Amount
            </label>
            <div className="mt-2.5">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder='Amount'
                min={1}
                required
                className="block w-full rounded-md bg-gray-700  px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm/6 font-semibold text-white">
              Category
            </label>
            <div className="mt-2.5">
              <select
                id="category"
                name="category"
                type="text"

                
                className="block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
              >
                 <option value={"Food"}>Food</option>
                 <option value={"Transport"}>Transport</option>
                 <option value={"Shopping"}>Shopping</option>
                 <option value={"Others"}>Others</option>
              </select>
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <label htmlFor="date" className="block text-sm/6 font-semibold text-white">
              Date
            </label>
            <div className="mt-2.5">
              <DatePicker id="date"
                name="date" 
                className='block w-full rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500'
                selected={startDate} 
                onChange={(date) => setStartDate(date)}
                 />
              
            </div>
          </div>
         <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Add Expense
          </button>
        </div>
         
        </div>
       
      </form>
        </div>
    )
}

export default AddExpense