const btnAdd = document.querySelector("#btnAdd");
let displayTotalAmount = document.querySelector(".display-total");
let expensesTable = document.querySelector(".expenses-table")
const allExpense = [];
let totalExpense = 0;
let amount = document.querySelector("#amount");
let description = document.querySelector("#description");

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
        allExpense.push(expense);
        let tableOutput = "";
        let indexItem = 0;
        for (let exp of allExpense) {
            indexItem++;
            tableOutput += `
            <table class="table">
                <tr>
                    <th>Item No.</th>
                    <th>Description</th>
                    <th>Amount (Tsh)</th>
                </tr>
                <tr>
                    <td>${indexItem}</td>
                    <td>${exp.expenseItem}</td>
                    <td>${exp.expenseAmount}</td>
                </tr>
            </table >   `
        }
        console.clear();
        console.table(allExpense);

        // Total Amount
        totalExpense += inputAmount;
        displayTotalAmount.innerHTML = totalExpense;

        // Print Data HTML Table
        expensesTable.innerHTML = tableOutput;
    }
})


