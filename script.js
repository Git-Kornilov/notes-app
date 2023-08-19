'use strict';

const addBtn = document.getElementById('add');

// add or update note in localStorage
const updateLS = function () {
  const notesText = document.querySelectorAll('textarea');

  const notes = [];

  notesText.forEach(note => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
};

// make note
const addNewNote = function (text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
 	<div class="tools">
        <button class="edit">
          <i class="fas fa-edit"></i>
        </button>

        <button class="delete">
          <i class="fas fa-trash-alt"></i>
        </button>
    </div>

    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
  `;

  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  // event 'edit' and change class
  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  // edit text (in textarea) and update
  textArea.addEventListener('input', e => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  // add element in the body
  document.body.appendChild(note);
};

// get notes from localStorage and add its to the body
const notes = JSON.parse(localStorage.getItem('notes'));
if (notes) notes.forEach(notes => addNewNote(notes));

// start new note
addBtn.addEventListener('click', () => addNewNote());
