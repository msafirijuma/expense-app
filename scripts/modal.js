const modal = document.querySelector(".modal")
const btnClose = document.querySelector(".btn-close")
const btnAddNewExpense = document.querySelector("#btnAddNewExpense");

btnClose.addEventListener("click", () => {
    if (modal.classList.contains("active")) {
        modal.classList.remove("active")
    }
})


btnAddNewExpense.addEventListener("click", () => {
    if (!(modal.classList.contains("active"))) {
        modal.classList.add("active")
    }
})