import { listeners } from "./listeners.js";
import { setItemsFromLS, getItemsFromLS, removeNote } from "./localStorage.js";
import { setInnerActiveHTML, setInnerArchiveHTML } from "./setInnerHTML.js";
import { generateStats } from "./stats.js";
export let notes = getItemsFromLS();

const noteTitle = document.getElementById("title");
const noteContent = document.getElementById("content");
const archivedList = document.querySelector(".archived");

const addNoteToHTML = (type, note) => {
    const newUINote = document.createElement("div");
    if (type === "note") {
        newUINote.classList.add("note");
        newUINote.innerHTML = setInnerActiveHTML(
            note.id,
            note.title,
            note.content,
            note.category,
            note.addingDate,
            note.dates
        );
        document.querySelector(".notesList").appendChild(newUINote);
    } else {
        newUINote.classList.add("archived__item");
        newUINote.innerHTML = setInnerArchiveHTML(note.id, note.title);
        archivedList.appendChild(newUINote);
    }
};

const generateArchivedNotes = (arr) => {
    arr.forEach((note) => {
        addNoteToHTML("arch", note);
    });
};

const generateActiveNotes = () => {
    notes.active.forEach((note) => {
        addNoteToHTML("note", note);
    });
};

const showDetails = (e) => {
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note__title").innerHTML;
    const currentContent =
        currentNote.querySelector(".note__content").innerHTML;
    setDetails(currentTitle, currentContent);
};

const setDetails = (title, body) => {
    const modalTitle = document.querySelector(".title");
    const modalBody = document.querySelector(".content");
    modalTitle.textContent = title;
    modalBody.textContent = body;
    document.querySelector(".noteInfo__wrapper").classList.remove("hide");
};

const deleteNote = (e) => {
    const currentNote = e.target.closest(".note");
    currentNote.remove();
    const id = currentNote.querySelector(".note__id").textContent;
    removeNote(Number(id));

    notes = getItemsFromLS();

    generateStats();
};

const clickHandler = (e) => {
    if (e.target.classList.contains("note__title")) {
        showDetails(e);
    } else if (e.target.classList.contains("note__delete")) {
        deleteNote(e);
    } else if (e.target.classList.contains("note__edit")) {
        editNote(e);
    } else if (e.target.classList.contains("note__archive")) {
        archiveNote(e);
    }
};

const editNote = (e) => {
    const createTaskModal = document.querySelector(".createTask__wrapper");
    createTaskModal.classList.remove("hide");
    const currentNote = e.target.closest(".note");
    const currentTitle = currentNote.querySelector(".note__title").innerHTML;
    const currentContent =
        currentNote.querySelector(".note__content").innerHTML;
    noteTitle.focus();
    noteTitle.value = currentTitle;
    noteContent.value = currentContent;
};

const createNoteObj = (title, content, category, dates) => {
    const d = new Date(Date.now()).toLocaleDateString().split("/");
    return {
        title: title[0].toUpperCase() + title.slice(1),
        content,
        category,
        dates,
        addingDate: d[1] + "/" + d[0] + "/" + d[2],
        id: Math.random(),
    };
};

const parseDates = (str) => {
    const regex = /(\d{1,2}\/\d{1,2}\/\d{4})/g;
    return str.match(regex);
};

const revriteData = () => {
    localStorage.clear();
    localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelector(".notesList").innerHTML = "";
    archivedList.innerHTML = "";
    generateActiveNotes();
};

const formHandler = (e) => {
    e.preventDefault();

    if (validate(noteTitle.value, noteContent.value)) {
        const find = notes.active.find((i) => i.title === noteTitle.value);

        const select = document.getElementById("categoryList");
        const noteCategory = select.options[select.selectedIndex];

        const newNote = createNoteObj(
            noteTitle.value,
            noteContent.value,
            noteCategory.value,
            parseDates(noteContent.value)
        );

        if (find) {
            const index = notes.active.indexOf(find);
            notes.active.splice(index, 1, newNote);
            revriteData();
        } else {
            addNoteToHTML("note", newNote);
            setItemsFromLS(newNote);
        }
        noteTitle.value = "";
        noteContent.value = "";
        noteCategory.value = select[0].value;
        document.querySelector(".createTask__wrapper").classList.add("hide");
    } else {
        noteTitle.focus();
    }
};

const generateArchiveData = (find) => {
    revriteData();
    generateArchivedNotes(
        notes.archive.filter((i) => i.category === find.category)
    );
    generateStats();
};

const archiveNote = (e) => {
    const currentNote = e.target.closest(".note");
    const currentId = currentNote.querySelector(".note__id").innerHTML;
    const find = notes.active.find((i) => i.id === Number(currentId));
    const index = notes.active.indexOf(find);
    notes.active.splice(index, 1);
    notes.archive = [...notes.archive, find];
    generateArchiveData(find);
};

const unArchHandler = (e) => {
    if (e.target.classList.contains("arch__unarch")) {
        const currentNote = e.target.closest(".archived__item");
        const currentId = currentNote.querySelector(".arch__id").innerHTML;
        const find = notes.archive.find((i) => i.id === Number(currentId));
        const index = notes.archive.indexOf(find);
        notes.archive.splice(index, 1);
        notes.active = [...notes.active, find];
        generateArchiveData(find);
    }
};

// clear all
document.querySelector(".deleteAll").addEventListener("click", () => {
    notes.active = [];
    localStorage.clear();
    localStorage.setItem("notes", JSON.stringify(notes));
    document.querySelector(".notesList").innerHTML = "";
    archivedList.innerHTML = "";
    generateStats();
});

const listenStats = () => {
    document
        .querySelector(".stat__task__archive")
        .addEventListener("click", () => {
            archivedList.classList.remove("hide");
            archivedList.innerHTML = "";
            generateArchivedNotes(
                notes.archive.filter((i) => i.category === "Task")
            );
        });

    document
        .querySelector(".stat__rt__archive")
        .addEventListener("click", () => {
            archivedList.classList.remove("hide");
            archivedList.innerHTML = "";
            generateArchivedNotes(
                notes.archive.filter((i) => i.category === "Random Thought")
            );
        });

    document
        .querySelector(".stat__idea__archive")
        .addEventListener("click", () => {
            archivedList.classList.remove("hide");
            archivedList.innerHTML = "";
            generateArchivedNotes(
                notes.archive.filter((i) => i.category === "Idea")
            );
        });
};

listeners(generateActiveNotes, clickHandler, formHandler, unArchHandler);
listenStats();
generateStats();

const validate = (title, content) => {
    if (title && content) {
        return true;
    } else {
        noteTitle.classList.add("redText");
        noteContent.classList.add("redText");
    }

    setTimeout(() => {
        noteTitle.classList.remove("redText");
        noteContent.classList.remove("redText");
    }, 1000);
};
