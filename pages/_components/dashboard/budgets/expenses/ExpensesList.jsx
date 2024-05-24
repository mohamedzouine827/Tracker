import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function ExpensesListTable({ expItem = [], refreshData }) { // Default to an empty array if expItem is undefined
  const deleteExpense = async (exp) => {
    try {
      const result = await db
        .delete(Expenses)
        .where(eq(Expenses.id, exp.id))
        .returning();

      if (result) {
        console.log(result);
        toast("Expense Deleted!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense.");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-4 bg-slate-200 p-2">
        <h1>Name</h1>
        <h1>Amount</h1>
        <h2>Date</h2>
        <h1>Action</h1>
      </div>
      {expItem.length > 0 ? (
        expItem.map((exp, index) => (
          <div className="grid grid-cols-4 bg-slate-100 p-2" key={index}>
            <h2>{exp.name || "N/A"}</h2>
            <h2>{exp.amount || "N/A"}</h2>
            <h2>{exp.createdAt || "N/A"}</h2>
            <h2>
              <Trash
                className="cursor-pointer"
                onClick={() => deleteExpense(exp)}
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="p-2">
          <h2>No expenses found</h2>
        </div>
      )}
    </div>
  );
}

export default ExpensesListTable;
