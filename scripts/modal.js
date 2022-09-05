const modal = document.querySelector(".modal")
const btnClose = document.querySelector(".btn-close")
const btnAddNewExpense = document.querySelector("#btnAddNewExpense");
let amount = document.querySelector("#amount");
let description = document.querySelector("#description");

btnClose.addEventListener("click", () => {
    if (modal.classList.contains("active")) {
        modal.classList.remove("active")
        amount.style.border = "1px solid #555";
        description.style.border = "1px solid #555"
    }
})


btnAddNewExpense.addEventListener("click", () => {
    if (!(modal.classList.contains("active"))) {
        modal.classList.add("active")
    }
})