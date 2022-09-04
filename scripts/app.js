const btnAdd = document.querySelector("#btnAdd");
let displayTotalAmount = document.querySelector(".display-total");
let expensesTable = document.querySelector("#expensesTable");
let indexItem = 0;
const allExpense = [];
let totalExpense = 0;
let amount = document.querySelector("#amount");
let description = document.querySelector("#description");
let date = new Date();

btnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    const expense = {};

    inputAmount = amount.value;
    inputItem = description.value;

    if (inputAmount === "" || inputItem === "") {

        if (inputAmount === "" && inputItem === "") {
            alert("Amount and Description are required")
        } else if (inputAmount === "") {
            alert("Please enter an amount")

        } else {
            alert("Description was not provided")
        }
    } else {
        inputAmount = parseFloat(inputAmount)
        expense.expenseAmount = inputAmount;
        expense.expenseItem = inputItem;
        allExpense.push(expense)
        const tableHTML = allExpense.map(exp => {
            return `
            <li class="list-item">
                <div class="first-container">
                    <span class="expenseItem">${exp.expenseItem}</span>
                    <span class="date">${date.toString()}</span>
                </div>
                <div class="amount">${exp.expenseAmount}</div>
                <button class="btn btn-delete">Delete</button>
            </li>
            `
        })

        let tableOutput = tableHTML.join("");
        // Total Amount
        totalExpense += inputAmount;
        displayTotalAmount.innerHTML = totalExpense;

        // Print Data HTML Table
        expensesTable.innerHTML = tableOutput;
        console.log(tableOutput)
    }
})


    // < ul class="list-group" >
    //     </ul >