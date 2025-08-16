import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {  // ✅ default to empty array
  // Guard in case expenses is undefined
  if (!expenses || expenses.length === 0) {
    return (
      <div className="text-white text-center py-10">
        No expenses to display in chart
      </div>
    );
  }

  const categories = ["Food", "Transport", "Shopping", "Others"];

  const amounts = categories.map((cat) =>
    expenses
      .filter((exp) => exp.category === cat)
      .reduce((sum, exp) => sum + parseFloat(exp.amount), 0)
  );

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: amounts,
        backgroundColor: ["#16a34a", "#3b82f6", "#ec4899", "#facc15"],
        borderColor: ["#fff", "#fff", "#fff", "#fff"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-md   mx-auto my-20 bg-gray-800 p-6 rounded-lg shadow-lg">
       
    
      <Pie data={data} />
    </div>
  );
};

export default ExpenseChart;
