import React, { useEffect, useState } from 'react'
import Expense from './Expense';

const Expenses = ({ expenses }) => {
 const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

    useEffect(() => {
    let updatedExpenses = [...expenses];

    // Filter by category
    if (selectedCategory !== "All") {
      updatedExpenses = updatedExpenses.filter(
        (expense) => expense.category === selectedCategory
      );
    }

    // Sort by date
    updatedExpenses.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredExpenses(updatedExpenses);
  }, [expenses, selectedCategory, sortOrder]);

  // Calculate total expense
  const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

  console.log(expenses.map(e=>e.amount))

  return (
    <div className='pb-20'>
      <p className="mx-auto pb-4 mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        My Personal Expenses
      </p>

      {/* Total Expense */}
      <p className="text-center text-xl text-yellow-300 font-bold mb-10">
        💰 Total Spent: {totalAmount} tk
      </p>
  {/* Filters */}
      <div className="flex justify-center gap-4 mb-6">
        {/* Category Filter */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>

        {/* Sort */}
        <select
          className="p-2 rounded bg-gray-700 text-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
      <div className="overflow-x-auto flex flex-col justify-center items-center p-5">
        <table className='min-w-full bg-gray-700 text-white p-5 text-center w-full max-w-4xl'>
          <thead className="font-bold text-xl text-center p-5 ">
          
              <th className='p-5 border-gray-900 border-4'>No</th>
              <th className='p-5 border-gray-900 border-4'>Title</th>
              <th className='p-5 border-gray-900 border-4'>Amount (bdt)</th>
              <th className='p-5 border-gray-900 border-4'>Category</th>
              <th className='p-5 border-gray-900 border-4'>Date</th>
              <th className='p-5 border-gray-900 border-4'>Actions</th>
           
          </thead>
          <tbody>
            {
              filteredExpenses.map((expense, index) =>
              
                  
                    <Expense expense={expense} id={expense._id} index={index} />
                  
               
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Expenses;
