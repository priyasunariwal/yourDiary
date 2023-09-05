import React, { useState } from "react";
import NoteContext from "./NotesContext";



const NoteState = (props)=>{
//  //make state and context use efficiently
//     const s1 = {
//         "name": "priyaa",
//         "class": "c3"
//     }
//     //lets try making update function that changes states 
//     const [state,setState] = useState(s1);
//     const update = ()=>{
//         setTimeout( ()=>{
//             setState({
//                 "name": "asurr",
//                 "class": "death"
//             })
//         },2000);
//     }
   // value={{state,update}} in provider
   
   const host = "http://localhost:3001"
   const notesInitial = [];
   
   const [notes, setNotes] = useState(notesInitial);

 //get all note 
 const getNote = async()=>{
  
  //API CALL
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
   method: "GET", 
   headers: {
     "Content-Type": "application/json",
     "auth-token": localStorage.getItem('token')
   }
  

  
 });
 const json = await response.json();
 console.log(json);
 
 setNotes(json);
 
  

  }






   //add note 
   const addNote =async(title,description,tag)=>{
  
   //API CALL
   const response = await fetch(`${host}/api/notes/addnote`, {
    method: "POST", 
    headers: {
     
      "auth-token": localStorage.getItem('token'),
      "Content-Type": "application/json"
     
    },
    
    body: JSON.stringify({title, description, tag}), 
  });
  
  const json = response.json()
  console.log(json)
  
    const note = {
      "_id": "640d5f42fa25fe48ce7446",
      "user": "645c74161025a4b23605ad",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-03-12T05:12:34.366Z",
      "__v": 0
    };
    setNotes(notes.concat(note))

   }
    
   //delete note 
   const deleteNote = async(id)=>{
   
    //API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }

    });
    const json = response.json(); 
    console.log(json);
   
   //client side logic
    console.log("its working hard like you" + id);
    const newNotes = notes.filter((note)=>{return note._id!==id}); 
    setNotes(newNotes); 
   }

    //edit note 
   const editNote = async (id, title, description, tag)=>{
    
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
       
      },
     
      body: JSON.stringify({title, description, tag}), 
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
   console.log(json);
    
    
    //logic to edit in client
    for(let i=0;i<notes.length;i++){
      const element = notes[i];
      if(element._id === id){
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

   }
    

   return (
    <>
    <NoteContext.Provider value={{notes, addNote,deleteNote,editNote, getNote}}>
        {props.children}
    </NoteContext.Provider>
    </>
 );
}

export default NoteState;