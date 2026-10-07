# 📝 Notes App

A simple and clean **Notes App** built using **HTML, CSS, and JavaScript**. It allows users to create, view, edit, and delete notes, with data stored in **Local Storage** so notes remain available even after refreshing the page.

## ✨ Features

* 📝 Add new notes (click **Add Note** or press **Enter**)
* ✏️ Edit notes in place (Enter / click outside to save, Esc to cancel)
* 🗑️ Delete notes with a trash icon
* 🧹 **Clear All** button with confirmation
* 🎨 Random color for each note card (color is saved with the note)
* 🔢 Character counter (200 max) and notes count
* 💾 Notes persist using **Local Storage**
* 📱 Responsive layout with a footer pinned to the bottom

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript (vanilla)
* Local Storage
* Git & GitHub

## 📂 Project Structure

```text
notes-webapp/
│
├── index.html
├── style.css
├── script.js
├── logo.png
└── README.md
```

## ⚙️ How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/haroonnadir/notes-webapp.git
```

2. Open the project folder.

3. Open `index.html` in your browser.

That's it! 🎉

## 💡 How It Works

Notes are stored in the browser's **Local Storage** as `{ text, color }` objects. When a note is added, edited, or deleted, the list is saved again. On page load the saved notes are read back and rendered.

## 👨‍💻 Author

**Haroon Nadir**

Made with ❤️ using HTML, CSS & JavaScript.
