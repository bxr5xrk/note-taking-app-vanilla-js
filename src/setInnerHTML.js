export const setInnerActiveHTML = (
    id,
    title,
    content,
    category,
    addingDate,
    dates
) => {
    const datesArr = [];
    dates ? dates.map((i) => datesArr.push(`<p class="date">${i}</p>`)) : "";

    return `
    <span class="note__id" hidden>${id}</span>
    <h3 class="note__title">${title}</h3>
    <p class="creationDate">${addingDate}</p>
    <p class="note__content">${content}</p>
    <p class="note__category">${category}</p>
    <div class="note__dates">
      ${datesArr.join(" ")}
    </div>
    <span class="note__archive">arch</span>
    <span class="note__edit">edit</span>
    <button class="note__delete">Del</button>
  `;
};

export const setInnerArchiveHTML = (id, title) => {
    return `
    <span class="arch__id" hidden>${id}</span>
    <h3 class="arch__title">${title}</h3>
    <span class="arch__unarch">un archive</span>
  `;
};
