import { prepopulatedData } from "./data.js";

export const getItemsFromLS = () => {
    if (localStorage.getItem("notes") !== null) {
        return JSON.parse(localStorage.getItem("notes"));
    } else {
        return { active: prepopulatedData, archive: [] };
    }
};

export const setItemsFromLS = (note) => {
    const notes = getItemsFromLS();
    notes.active.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
};

export const removeNote = (id) => {
    const notes = getItemsFromLS();
    notes.active.forEach((note, index) => {
        if (note.id === id) {
            notes.active.splice(index, 1);
        }
        localStorage.setItem("notes", JSON.stringify(notes));
    });
};
