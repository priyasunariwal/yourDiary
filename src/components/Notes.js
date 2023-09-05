import React, { useContext, useEffect, useRef } from 'react';
import NoteContext from '../context/notes/NotesContext';
import NoteItem from './NoteItem';
import AddNote from './addNote';
import { useNavigate } from 'react-router-dom';

  const Notes = (props) => {

  const context = useContext(NoteContext);
  const { notes, getNote} = context;
  let navigate = useNavigate();
  useEffect(()=>{
    //if local storage mein token hai jo login sign up ke time store hora hai vo present hai toh hi valid hai user to fetch notes.
    if(localStorage.getItem('token')){
    getNote();
    } else{
      navigate("/login");
    } 
    // eslint-disable-next-line
  },[]);

  

  const ref = useRef('');

  const updateNote = (note)=>{
     ref.current.click();
  }
  return (
   <> <AddNote showAlert={props.showAlert} />
 
 <button  ref = {ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>



<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    <div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-3">
        {/* //left side true hota hai && ke toh hi right side return hota hai, yeh hum if else mein else part nhi hota toh use karte hai &&. */}
        {notes.length===0 && "No notes added yet!"} 
        {notes.map((note) => {
          return <NoteItem key={note._id} updateNote ={updateNote} note={note} showAlert={props.showAlert}/>;
        })}
      </div>
      </div>
    </div>
    </>
  );
};


export default Notes;
