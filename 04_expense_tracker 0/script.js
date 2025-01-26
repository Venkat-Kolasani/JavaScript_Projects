document.addEventListener("DOMContentLoaded", () => { //waits for the DOM to be fully loaded before running the script
    const expenseForm = document.getElementById("expense-form"); 
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseList = document.getElementById("expense-list");
    const totalAmountDisplay = document.getElementById("total-amount");
  
    let expenses = JSON.parse(localStorage.getItem("expenses")) || []; //parses the expenses from the local storage or sets it to an empty array
    let totalAmount = calculateTotal(); //calls the calculateTotal function to get the total amount
  
    renderExpenses();
  
    expenseForm.addEventListener("submit", (e) => { //listens for a submit event on the expenseForm
      e.preventDefault(); //prevents the default form submission
      const name = expenseNameInput.value.trim(); 
      const amount = parseFloat(expenseAmountInput.value.trim()); //parses the amount input to a float
  
      if (name !== "" && !isNaN(amount) && amount > 0) { 
        const newExpense = { //creates a new expense object
          id: Date.now(),
          name: name,
          amount: amount,
        };
        expenses.push(newExpense); //pushes the new expense to the expenses array
        saveExpensesTolocal();
        renderExpenses();
        updateTotal();
  
        //clear input
        expenseNameInput.value = ""; 
        expenseAmountInput.value = ""; 
      }
    });
  
    function renderExpenses() { //renders the expenses to the DOM
      expenseList.innerHTML = ""; //clears the expenseList
      expenses.forEach((expense) => { //loops through the expenses array
        const li = document.createElement("li"); //creates a li element
        li.innerHTML = `
          ${expense.name} - $${expense.amount}
          <button data-id="${expense.id}">Delete</button>
          `;
        expenseList.appendChild(li); //appends the li to the expenseList
      });
    }
  
    function calculateTotal() {
      return expenses.reduce((sum, expense) => sum + expense.amount, 0);
    }
  
    function saveExpensesTolocal() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  
    function updateTotal() { 
      totalAmount = calculateTotal();
      totalAmountDisplay.textContent = totalAmount.toFixed(2);
    }
  
    expenseList.addEventListener("click", (e) => { //listens for a click event on the expenseList
      if (e.target.tagName === "BUTTON") { //checks if the target element is a button
        const expenseId = parseInt(e.target.getAttribute("data-id"));
        expenses = expenses.filter((expense) => expense.id !== expenseId);
  
        saveExpensesTolocal(); //saves the updated expenses to the local storage
        renderExpenses(); //re-renders the expenses
        updateTotal();
      }
    });
  });
  