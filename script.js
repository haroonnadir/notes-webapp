const text = document.querySelector("#inpnotes");
const addBtn = document.getElementById("add");
const clearBtn = document.getElementById("clear-all");
const notesContainer = document.getElementById("notes-container");
const emptyMsg = document.getElementById("empty-msg");
const counter = document.getElementById("counter");
const noteCount = document.getElementById("note-count");

const colors = [
    "#FFF4A3",
    "#D8F8C8",
    "#FFD6E7",
    "#CFE8FF",
    "#E7D8FF",
    "#FFDDBB",
    "#CFFFEF"
];

function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function loadNotes() {
    let saved;
    try {
        saved = JSON.parse(localStorage.getItem("notes"));
    } catch (e) {
        saved = null;
    }
    if (!Array.isArray(saved)) return [];
    // Older versions stored plain strings; convert them to {text, color}
    return saved
        .map(function (n) {
            return typeof n === "string" ? { text: n, color: randomColor() } : n;
        })
        .filter(function (n) {
            return n && typeof n.text === "string";
        });
}

let notes = loadNotes();

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function updateUI() {
    const empty = notes.length === 0;
    emptyMsg.style.display = empty ? "block" : "none";
    clearBtn.style.display = empty ? "none" : "inline-block";
    noteCount.innerText = empty ? "" : "(" + notes.length + ")";
}

function updateCounter() {
    counter.innerText = text.value.length + " / 200";
}

function createNote(note) {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note-card");
    noteCard.style.backgroundColor = note.color;

    const actions = document.createElement("div");
    actions.classList.add("note-actions");

    const editBtn = makeIconButton("edit-btn", "Edit note", ICONS.edit);
    const deleteBtn = makeIconButton("delete-btn", "Delete note", ICONS.trash);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", function () {
        const index = notes.indexOf(note); // object identity, safe with duplicate text
        if (index !== -1) notes.splice(index, 1);
        noteCard.remove();
        saveNotes();
        updateUI();
    });

    const noteText = document.createElement("p");
    noteText.innerText = note.text;

    editBtn.addEventListener("click", function () {
        if (noteCard.querySelector("textarea")) return;
        const area = document.createElement("textarea");
        area.classList.add("edit-area");
        area.maxLength = 200;
        area.value = note.text;
        noteText.replaceWith(area);
        area.focus();

        let done = false;
        function finish(save) {
            if (done) return;
            done = true;
            const value = area.value.trim();
            if (save && value !== "") {
                note.text = value;
                saveNotes();
            }
            noteText.innerText = note.text;
            area.replaceWith(noteText);
        }
        area.addEventListener("blur", function () { finish(true); });
        area.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); finish(true); }
            if (e.key === "Escape") finish(false);
        });
    });

    noteCard.appendChild(actions);
    noteCard.appendChild(noteText);
    notesContainer.appendChild(noteCard);
}

const SVG_NS = "http://www.w3.org/2000/svg";
const ICONS = {
    edit: ["M12 20h9", "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"],
    trash: ["M3 6h18", "M8 6V4h8v2", "M19 6l-1 14H6L5 6", "M10 11v6", "M14 11v6"]
};

function makeIconButton(cls, label, paths) {
    const btn = document.createElement("button");
    btn.classList.add("icon-btn", cls);
    btn.setAttribute("aria-label", label);
    btn.title = label;
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    paths.forEach(function (d) {
        const p = document.createElementNS(SVG_NS, "path");
        p.setAttribute("d", d);
        svg.appendChild(p);
    });
    btn.appendChild(svg);
    return btn;
}

function addNote() {
    const value = text.value.trim();
    if (value === "") return;
    const note = { text: value, color: randomColor() };
    notes.push(note);
    saveNotes();
    createNote(note);
    text.value = "";
    updateCounter();
    updateUI();
    text.focus();
}

text.addEventListener("input", updateCounter);
text.addEventListener("keydown", function (e) {
    if (e.key === "Enter") addNote();
});
addBtn.addEventListener("click", addNote);

clearBtn.addEventListener("click", function () {
    if (!confirm("Delete all notes?")) return;
    notes = [];
    saveNotes();
    notesContainer.replaceChildren();
    updateUI();
});

notes.forEach(createNote);
saveNotes();
updateUI();
