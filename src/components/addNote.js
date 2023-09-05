import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NotesContext';

const AddNote = (props) => {
  const context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: '' });

  const handleAdd = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: '', description: '', tag: '' })
    props.showAlert("Note added successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-4 mx-5">
      <h1>ADD NOTE</h1>
      <form>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Enter title"
            name="title" // Added name attribute
            value={note.title} // Added value attribute
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Description"
            value={note.description} // Added value attribute
            onChange={onChange}
          />
           <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            placeholder="tag"
            value={note.tag} // Added value attribute
            onChange={onChange}
          />
        </div>
        
        <button  disabled = {note.title.length<5 || note.description.length<5}  type="submit" className="btn btn-primary my-5" onClick={handleAdd} >
          ADD YOUR AMAZING NOTE
        </button>
      </form>
    </div>
  );
};

export default AddNote;
