import { prepopulatedData } from "./data.js";
import { generateStats } from "./stats.js";

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
    console.log(notes.active.filter((i) => i.id !== id));
    notes.active = notes.active.filter((i) => i.id !== id);
    localStorage.setItem(
        "notes",
        JSON.stringify({ ...notes, active: notes.active })
    );
    generateStats();
    console.log(notes);
};
