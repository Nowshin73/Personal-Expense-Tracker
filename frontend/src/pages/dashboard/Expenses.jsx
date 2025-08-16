import React, { useEffect, useState } from 'react'
import Expense from './Expense';


const Expenses = ({expenses}) => {
 
    return (
        <div className='pb-20'>
            <p className="mx-auto pb-20 mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                My Personal Expenses
            </p>
          <div className="flex flex-col justify-center items-center">
              <table className='bg-gray-700 text-white p-5 text-center'>
                <thead className="font-bold text-xl text-center p-5 ">
                    <tr className=''>
                        <th className='p-5 border-gray-900 border-4'>No</th>
                        <th className='p-5 border-gray-900 border-4'>Title</th>
                        <th className='p-5 border-gray-900 border-4'>Amount</th>
                        <th className='p-5 border-gray-900 border-4'>Category</th>
                        <th className='p-5 border-gray-900 border-4'>Date</th>
                        <th className='p-5 border-gray-900 border-4'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {
                            expenses.map((expense, index) =>
                                <Expense expense={expense} key={index} id={expense._id} index={index} ></Expense>
                            )
                        }
                    
                </tbody>
            </table>
          </div>

        </div>
    )
}

export default Expenses