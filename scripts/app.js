const btnAddExpense = document.querySelector("#btnAddExpense");
let displayTotalAmount = document.querySelector(".display-total");
let expensesTable = document.querySelector("#expensesTable");
const listItem = document.querySelector(".list-item");
let indexItem = 0;
const allExpense = [];
let totalExpense = 0;



btnAddExpense.addEventListener("click", (e) => {
    e.preventDefault();
    const expense = {};

    inputAmount = amount.value;
    inputItem = description.value;

    let currentDate = new Date().toLocaleDateString();
    let currentTime = new Date().toLocaleTimeString();

    if (inputAmount === "" || inputItem === "") {

        if (inputAmount === "" && inputItem === "") {
            alert("Amount and Description are required")
            amount.style.border = "1px solid red";
            description.style.border = "1px solid red"
        } else if (inputAmount === "") {
            amount.style.border = "1px solid red"
            alert("Please enter an amount")
        } else {
            description.style.border = "1px solid red"
            alert("Description was not provided")
        }
    } else {
        amount.style.border = "1px solid #555";
        description.style.border = "1px solid #555";
        inputAmount = parseFloat(inputAmount)
        expense.expenseAmount = inputAmount;
        expense.expenseItem = inputItem;
        expense.currentDate = currentDate;
        expense.currentTime = currentTime;
        allExpense.push(expense)
        const tableHTML = allExpense.map(exp => {
            return `
            <li class="list-item" title="Click on the item to see more details">
                <div class="first-container" onclick="getItemFullDetails();">
                    <span class="expense-item">${exp.expenseItem}</span>
                    <span class="date">${expense.currentTime}</span>
                </div>
                <div class="amount">${expense.currentDate}</div>
                <div class="amount">${exp.expenseAmount}</div>
                <button class="btn btn-delete" onclick="deleteItem()">
                    <i class="fa fa-trash"></i>
                </button>
            </li>
            `
        })

        let tableOutput = tableHTML.join("");
        // Total Amount
        totalExpense += inputAmount;
        displayTotalAmount.innerHTML = `Total: ${totalExpense}`;

        // Print Data HTML Table
        expensesTable.innerHTML = tableOutput;
        console.log(tableOutput)

        if ((modal.classList.contains("active"))) {
            modal.classList.remove("active")
        }
    }

    amount.value = "";
    description.value = "";
})

const getItemFullDetails = () => {
    alert("This will print full description of item and expense");
}

const deleteItem = () => {
    let deleteThisItem = confirm("Do you want to delete this item from list?")
    if (deleteThisItem) {
        alert("Delete")
    } else {
        alert("Failed to delete")
    }
}