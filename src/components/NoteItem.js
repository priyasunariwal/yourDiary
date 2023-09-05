import React, { useContext } from 'react'
import NoteContext from '../context/notes/NotesContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrash,faPenToSquare} from "@fortawesome/free-solid-svg-icons";
const NoteItem = (props) => {
  //using destructuring
  const  {note,updateNote} = props;
   
  const context = useContext(NoteContext);
  const {deleteNote} = context;

  return (
    <div className='col-md-4'>
      <div className="card my-3" style={{width:'20rem'}}>
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <FontAwesomeIcon className ='icon mx-2' icon={faTrash} onClick={()=>{deleteNote(note._id);
     props.showAlert("Note deleted successfully","success");
    }}/>
    <FontAwesomeIcon className ='icon mx-2' icon={faPenToSquare} style={{}} onClick={()=>{updateNote(note)}}/>
    </div>
   
    <p className="card-text"> {note.description}</p>
   
    
    
  </div>
</div>
    </div>
  )
}

export default NoteItem
