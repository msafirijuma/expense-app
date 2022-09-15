const btnAddExpense = document.querySelector("#btnAddExpense");
let displayTotalAmount = document.querySelector(".display-total");
let expensesTable = document.querySelector("#expensesTable");
let indexItem = 0;
let allExpenses = [];
let totalExpense = 0;
let amount = document.querySelector("#amount");
let description = document.querySelector("#description");
let itemDetails = document.querySelector("#formInputDetails")
let itemDetailsContainer = document.querySelector(".item-details-container")
let editExpense = document.querySelector(".expense-edit");
let editAmount = document.querySelector("#editAmount");
let editDescribedItem = document.querySelector("#editDescribedItem");
let editDetails = document.querySelector("#editDetails");
let messageAmount = document.querySelector(".message-amount");
let messageItem = document.querySelector(".message-item");
let messageAmountEdit = document.querySelector(".message-amount-edit");
let messageItemEdit = document.querySelector(".message-item-edit");


btnAddExpense.addEventListener("click", (e) => {
    e.preventDefault();
    const expense = {};
    let inputAmount = amount.value;
    let inputItem = description.value;
    let inputItemDetails = itemDetails.value;
    let currentDate = new Date();
    let currentTime = new Date();

    if (inputAmount === "" || inputItem === "") {

        if (inputAmount === "" && inputItem === "") {
            messageAmount.innerHTML = "Please enter an amount";
            messageItem.innerHTML = "Item cannot be empty";
            amount.style.border = "1px solid red";
            description.style.border = "1px solid red"
        } else if (inputAmount === "") {
            amount.style.border = "1px solid red";
            description.style.border = "1px solid #555"
            messageAmount.innerHTML = "Please enter an amount"
            messageItem.innerHTML = "";
        } else {
            description.style.border = "1px solid red";
            messageItem.innerHTML = "Item cannot be empty";
            amount.style.border = "1px solid #555";
            messageAmount.innerHTML = "";
        }
    } else {
        messageAmount.innerHTML = "";
        messageItem.innerHTML = "";
        amount.style.border = "1px solid #555";
        description.style.border = "1px solid #555";
        inputAmount = parseFloat(inputAmount)
        expense.expenseAmount = inputAmount;
        expense.expenseItem = inputItem;
        expense.expenseDetails = inputItemDetails;
        expense.dateCreated = currentDate;
        expense.timeCreated = currentTime;
        allExpenses.push(expense)

        // Total Amount
        totalExpense += inputAmount;
        displayTotalAmount.innerHTML = `Total: ${totalExpense}`;

        if ((modal.classList.contains("active"))) {
            modal.classList.remove("active")
        }
        renderExpensesList(allExpenses);
        // Setting expenses on localStorage
        localStorage.setItem("allExpenses", JSON.stringify(allExpenses))
        console.log(allExpenses)
        messageAmount.innerHTML = "";
        messageItem.innerHTML = "";
        resetForm();
    }
})

let resetForm = () => {
    amount.value = "";
    description.value = "";
    itemDetails.value = "";
}

// Get Time

function getTimeString(time) {
    return time.toLocaleTimeString("en-US", { hour12: false }, {
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
            <li class="list-item" title="Click on the item to see more details" id="${dateCreated.valueOf()}">
                <div title="Show More Details" class="first-container" onclick="getItemFullDetails(${dateCreated.valueOf()});">
                    <span class="expense-item">${expenseItem}</span>
                    <span class="date">${getTimeString(timeCreated)}</span>
                </div>
                <div class="date">${getDateString(dateCreated)}</div>
                <div class="amount">${expenseAmount}</div>
                <div class="customize-btn">
                    <button class="btn btn-delete" onclick="deleteItem(${dateCreated.valueOf()})" title="Delete This Item">
                        <i class="fa fa-trash">del</i>
                    </button>
                    <button class="btn btn-edit" onclick="editItem(${dateCreated.valueOf()})" title="Edit This Item">
                        <i class="fa fa-edit">ed</i>
                    </button>
                </div>
            </li>
            `
}

// Overall Details
const getItemFullDetails = (dateOfCreation) => {
    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            // console.log(expense);
            if (!(itemDetailsContainer.classList.contains("show"))) {
                itemDetailsContainer.classList.add("show");
                let x = ` <span class="item-details-title">Item Details</span>
                    <div class="item-details">
                    <div><span class="category">Item:</span>${expense.expenseItem}</div>
                    <div><span class="category">Amount:</span> ${expense.expenseAmount}</div>
                    <div><span class="category">Date:</span>${getDateString(expense.dateCreated)}</div>
                    <div><span class="category">Time:</span>${getTimeString(expense.timeCreated)}</div>
                    <div>
                        <span class="category">Description:</span>: ${expense.expenseDetails}
                    </div>
                    </div>
                    <span class="btn btn-discard-details" onclick="discardDetails()"
                    >OK</span
                    > `
                itemDetailsContainer.innerHTML = x;
            }
        }
    })
}

// Discard Item Details

const discardDetails = () => {
    if (itemDetailsContainer.classList.contains("show")) {
        itemDetailsContainer.classList.remove("show")
    }
}

// Delete Event Handler
const deleteItem = (dateOfCreation) => {

    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            allExpenses.splice(allExpenses.indexOf(expense), 1)
        }
    })

    localStorage.setItem("allExpenses", JSON.stringify(allExpenses))

    renderExpensesList(allExpenses)
}

// Edit Event Handler
const editItem = (dateOfCreation) => {
    allExpenses.map(expense => {
        if (dateOfCreation === expense.dateCreated.valueOf()) {
            if (!(editExpense.classList.contains("show"))) {
                editExpense.classList.add("show")
                // Display Values of Expense Before Edition
                editAmount.value = expense.expenseAmount
                editDescribedItem.value = expense.expenseItem
                editDetails.value = expense.expenseDetails;
            }
        }
    })
}

// Edit btns

document.querySelector("#btnCancelExpense").addEventListener("click", (e) => {
    e.preventDefault();
    if (editExpense.classList.contains("show")) {
        editExpense.classList.remove("show");
    }
    resetEditForm()
    messageItemEdit.innerHTML = "";
    messageAmountEdit.innerHTML = "";
})

const resetEditForm = () => {
    editAmount.value = "";
    editDescribedItem.value = "";
    editDetails.value = "";
}

const editExpenseForm = (e) => {
    e.preventDefault();
    let newAmount = editAmount.value;
    let newDescribedItem = editDescribedItem.value;
    let newEditedDetails = editDetails.value;

    if (newAmount === "" || newDescribedItem === "") {

        if (newAmount === "" && newDescribedItem === "") {
            messageItemEdit.innerHTML = "item cannot be empty"
            messageAmountEdit.innerHTML = "Please enter an amount";
        } else if (newAmount === "") {
            messageAmountEdit.innerHTML = "Please enter an amount";
            messageItemEdit.innerHTML = "";
        } else {
            messageItemEdit.innerHTML = "item cannot be empty"
            messageAmountEdit.innerHTML = "";
        }
    } else {
        messageItemEdit.innerHTML = "";
        messageAmountEdit.innerHTML = "";
        // console.log(expense)
        // expense.expenseAmount = newAmount;
        // expense.expenseItem = newDescribedItem;
        // expense.expenseDetails = newEditedDetails;
        // renderExpensesList(allExpenses);
        // allExpenses.map(expense => {
        //     console.log(expense)
        // })

        // Hide Modal
        if (editExpense.classList.contains("show")) {
            editExpense.classList.remove("show");
        }
    }
}

// Load Expenses from localStorage

// window.addEventListener("load", () => {
//     allExpenses = Array.from(JSON.parse(localStorage.getItem("allExpenses")));
//     console.log(allExpenses);
//     allExpenses.map(expense => {
//         const list = document.querySelector("ul");
//         const li = document.createElement("li");
//         li.innerHTML = renderExpensesList(expense)
//         list.insertBefore(li, list.children[0]);
//     })
// })


