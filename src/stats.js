import { notes } from "./script.js";

export const generateStats = () => {
    document.querySelector(".stat__task__active").innerHTML =
        notes.active.filter((i) => i.category === "Task").length;

    document.querySelector(".stat__task__archive").innerHTML =
        notes.archive.filter((i) => i.category === "Task").length;

    document.querySelector(".stat__rt__active").innerHTML = notes.active.filter(
        (i) => i.category === "Random Thought"
    ).length;

    document.querySelector(".stat__rt__archive").innerHTML =
        notes.archive.filter((i) => i.category === "Random Thought").length;

    document.querySelector(".stat__idea__active").innerHTML =
        notes.active.filter((i) => i.category === "Task").length;

    document.querySelector(".stat__idea__archive").innerHTML =
        notes.archive.filter((i) => i.category === "Idea").length;
};
