const noteInfoModal = document.querySelector(".noteInfo__wrapper");
const createTaskModal = document.querySelector(".createTask__wrapper");
const noteTitle = document.querySelector("#title");
const notesListDiv = document.querySelector(".notesList");
const archListDiv = document.querySelector(".archived");
const form = document.querySelector("form");

export const listeners = (
    setNotesFromLS,
    clickHandler,
    formHandler,
    unArchHandler
) => {
    document.addEventListener("DOMContentLoaded", setNotesFromLS);

    document
        .querySelector(".createTask__close")
        .addEventListener("click", () => {
            createTaskModal.classList.add("hide");
        });
    document.querySelector(".noteInfo__close").addEventListener("click", () => {
        noteInfoModal.classList.add("hide");
    });

    document.querySelector(".showModal").addEventListener("click", () => {
        createTaskModal.classList.remove("hide");
        noteTitle.focus();
    });

    notesListDiv.addEventListener("click", clickHandler);

    archListDiv.addEventListener("click", unArchHandler);

    form.addEventListener("submit", formHandler);
};
