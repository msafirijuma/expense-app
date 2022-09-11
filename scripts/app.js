const btnAddExpense = document.querySelector("#btnAddExpense");
let displayTotalAmount = document.querySelector(".display-total");
let expensesTable = document.querySelector("#expensesTable");
let indexItem = 0;
const allExpenses = [];
let totalExpense = 0;
let amount = document.querySelector("#amount");
let description = document.querySelector("#description");


btnAddExpense.addEventListener("click", (e) => {
    e.preventDefault();
    const expense = {};

    inputAmount = amount.value;
    inputItem = description.value;
    let currentDate = new Date();
    let currentTime = new Date();

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
        expense.dateCreated = currentDate;
        expense.timeCreated = currentTime;
        allExpenses.push(expense)


        // Total Amount
        totalExpense += inputAmount;
        displayTotalAmount.innerHTML = `Total: ${totalExpense}`;



        if ((modal.classList.contains("active"))) {
            modal.classList.remove("active")
        }
    }

    amount.value = "";
    description.value = "";
    renderExpensesList(allExpenses);
    console.log(allExpenses)
})


// Get Time

function getTimeString(time) {
    return time.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    })
}

// Get Date

function getDateString(date) {
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

// Render Table View
function renderExpensesList(arrayOfList) {
    const tableHTML = arrayOfList.map(expense => createExpenseList(expense));
    const tableOutput = tableHTML.join("")
    expensesTable.innerHTML = tableOutput;
}

function createExpenseList({ expenseItem, timeCreated, dateCreated, expenseAmount }) {

    return `
            <li class="list-item" title="Click on the item to see more details">
                <div title="Show More Details" class="first-container" onclick="getItemFullDetails(${dateCreated.valueOf()});">
                    <span class="expense-item">${expenseItem}</span>
                    <span class="date">${getTimeString(timeCreated)}</span>
                </div>
                <div class="date">${getDateString(dateCreated)}</div>
                <div class="amount">${expenseAmount}</div>
                <button class="btn btn-delete" onclick="deleteItem(${dateCreated.valueOf()})" title="Delete This Item">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="btn btn-edit" onclick="editItem(${dateCreated.valueOf()})" title="Delete This Item">
                    <i class="fa fa-trash">ed</i>
                </button>
            </li>
            `
}

const getItemFullDetails = (dateOfCreation) => {
    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            console.log(expense);
        }
    })
}


const deleteItem = (dateOfCreation) => {

    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            allExpenses.splice(allExpenses.indexOf(expense), 1)
        }
    })

    renderExpensesList(allExpenses)
}

const editItem = (dateOfCreation) => {
    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            console.log(expense)
        }
    })
}


