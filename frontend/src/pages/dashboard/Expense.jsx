import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const Expense = ({ expense, index, refetch }) => {
    const { _id, title, amount, category, date } = expense;
    const [showModal, setShowModal] = useState(false);
    const [expenseTitle, setExpenseTitle] = useState(title);
    const [expenseAmount, setExpenseAmount] = useState(amount);
    const [expenseCategory, setExpenseCategory] = useState(category);
    const [expenseDate, setExpenseDate] = useState(date);

 // Function to render category badge with color
  const getCategoryBadge = (category) => {
    let color = "bg-gray-500"; // default
    if (category === "Food") color = "bg-green-500";
    else if (category === "Transport") color = "bg-blue-500";
    else if (category === "Shopping") color = "bg-pink-500";
    else if (category === "Others") color = "bg-yellow-500";

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${color}`}>
        {category}
      </span>
    );
  };

    // ✅ Delete expense
    const deleteExpense = async (id) => {
        await fetch(`http://localhost:5000/expenses/${id}`, {
            method: "DELETE",
        });
        refetch(); // refresh list
    };

    // ✅ Update expense
    const updateExpense = async (id) => {
        const formData = {
            expenseTitle,
            expenseAmount,
            expenseCategory,
            expenseDate
        }
        await fetch(`http://localhost:5000/expenses/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert("expense updated successfully")
                }
            }

            )
        setShowModal(false);
        refetch(); // refresh list
    };

    return (
        <>
            {/* Table Row */}
            <tr>
                <td className="p-5 border-4 border-gray-900">{index + 1}</td>
                <td className="p-5 border-4 border-gray-900">{title}</td>
                <td className="p-5 border-4 border-gray-900">{amount}</td>
                <td className="p-5 border-4 border-gray-900">{getCategoryBadge(category)}</td>
                <td className="p-5 border-4 border-gray-900">{date}</td>
                <td className="p-5 border-4 border-gray-900">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowModal(true)}
                            className="px-3 py-2 rounded-lg cursor-pointer bg-violet-500 hover:bg-violet-700"
                        >
                            update
                        </button>
                        <button
                            onClick={() => deleteExpense(_id)}
                            className="px-3 py-2 rounded-lg cursor-pointer bg-red-500 hover:bg-red-700"
                        >
                            delete
                        </button>
                    </div>
                </td>
            </tr>

            {/* Update Modal */}
            {showModal && (
                <div id={_id} className="fixed inset-0 bg-[#0000005d] bg-opacity-50 flex justify-center items-center">
                    <div className="bg-gray-700 p-6 rounded-lg shadow-lg w-[400px] ">
                        <h2 className="text-lg font-bold mb-4">Update Expense</h2>
                        <div className="modal-form flex flex-col justify-baseline items-baseline">
                            <label className="py-2">Title</label>
                            <input
                                type="text"
                                value={expenseTitle}
                                onChange={(e) =>
                                    setExpenseTitle(e.target.value)
                                }
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Title"
                            />
                            <label className="py-2">Amount</label>
                            <input
                                type="number"
                                value={expenseAmount}
                                onChange={(e) =>
                                    setExpenseAmount(e.target.value)
                                }
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Amount"
                            />
                            <label className="py-2">Category</label>

                            <select
                                type="text"
                                value={expenseCategory}
                                onChange={(e) =>
                                    setExpenseCategory(e.target.value)
                                }

                                className="block w-full mb-4 rounded-md bg-gray-700 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                            >
                                <option value={"Food"}>Food</option>
                                <option value={"Transport"}>Transport</option>
                                <option value={"Shopping"}>Shopping</option>
                                <option value={"Others"}>Others</option>
                            </select>
                            <label className="py-2">Date</label>
                            <DatePicker type="date"

                                className="w-full p-2 mb-4 border rounded" selected={expenseDate}
                                onChange={(e) =>
                                    setExpenseDate(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-400 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => updateExpense(_id)}
                                className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-700"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Expense;
