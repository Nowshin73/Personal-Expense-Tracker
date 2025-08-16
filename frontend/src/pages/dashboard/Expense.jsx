import React from 'react'

const Expense = ({expense,index}) => {
    const { _id, title, amount, category, date } = expense;
  return (
    <tr>
        <td className='p-5 border-4 border-gray-900'>{index+1}</td>
        <td className='p-5 border-4 border-gray-900'>{title}</td>
        <td className='p-5 border-4 border-gray-900'>{amount}</td>
        <td className='p-5 border-4 border-gray-900'>{category}</td>
        <td className='p-5 border-4 border-gray-900'>{date}</td>
        <td className='p-5 border-4 border-gray-900'>
            <div className='flex gap-2'>
                <button onClick={()=>updateExpense(_id)} className='px-3 py-2 rounded-lg cursor-pointer bg-violet-500 hover:bg-violet-700'>update</button>
        <button onClick={()=>deleteExpense(_id)} className='px-3 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-700'>delete</button> 
            </div>
        </td>

    </tr>
  )
}

export default Expense