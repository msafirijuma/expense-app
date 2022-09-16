const modal = document.querySelector(".modal")
const btnAddNewExpense = document.querySelector("#btnAddNewExpense");

btnAddNewExpense.addEventListener("click", () => {
    if (!(modal.classList.contains("active"))) {
        modal.classList.add("active");
    }
})