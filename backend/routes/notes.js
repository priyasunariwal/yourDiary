const express = require('express');
const router = express.Router()
const fetchUser = require('../middleware/fetchUser'); 
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
//ROUTE1 : get all Notes using: GET "/api/notes/fetchallnotes" login required 
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
   try{
    const notes = await Note.find({user: req.user.id})
    res.json(notes) //yaha pe notes ko square brackets mein rakha tha toh react client side pe fetch nhi hora tha
   }catch(error){
    console.error(error.message);
        res.status(500).send("internal server error occured");
   }
})

//ROUTE2 : add new Notes using: POST "/api/notes/addnote"login required 
router.post('/addnote',fetchUser,[
    //validation of book info
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','description must be atleast 5 characters').isLength({ min: 5 }),

], async(req,res)=>{
    try{

     //using destructuring concept
     const {title,description,tag} = req.body;
       //if there are errors,return bad request and the errors
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
       const note = new Note({
        title,description,tag,user: req.user.id
       })
       
       const savedNote = await note.save()
       res.json([ savedNote ])

    }catch(error){

      console.error(error.message);
      res.status(500).send("internal server error occured");
      
      }

 });
 //ROUTE3 : Update Notes using: PUT "/api/notes/updatenote"login required 

 router.put('/updatenote/:id',fetchUser, async(req,res)=>{
  const {title,description,tag} = req.body;
   //Create a new note object
   const newNote = {};
   if(title){newNote.title = title};
   if( description){newNote.description = description};
   if(tag){newNote.tag = tag};

   //find the note to be updated and update it  
  //  params.id upar .get mein :id hai vaha se aayegi
   let note = await Note.findById(req.params.id);  //note await me hai isliye const nhi hosakta.
   if(!note){ 

     return res.status(404).send("Not foundd")}
     if(note.user.toString()!= req.user.id){  //note mil gaya but user id match nhi hori matlab hack hora
     return res.status(401).send("not allowed");}
     //  new ko true karne ka matlab hai if new info daala update karne ke bajaye toh acceptable hai.
     note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
     res.json({note});
     

})
 //ROUTE4 : delete notes Notes using: DELETE "/api/notes/deletenote"login required 
 router.delete('/deletenote/:id',fetchUser, async(req,res)=>{
  try{
  const {title,description,tag} = req.body;

   //find the note to be deleted and delete it  
  //  params.id upar .get mein :id hai vaha se aayegi
   let note = await Note.findById(req.params.id);  //note await me hai isliye const nhi hosakta.
   if(!note){ 
    return res.status(404).send("Not foundd")}
      //  abh check karna hai ke jo note delete karna hai vo sach me vohi id vaale ka hai
   if(note.user.toString()!= req.user.id){  //note mil gaya but user id match nhi hori matlab hack hora
    return res.status(401).send("not allowed");}
    //  new ko true karne ka matlab hai if new info daala update karne ke bajaye toh acceptable hai.
    note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success" : "note has been deleted ",note: note});
    }catch(error){
      console.error(error.message);
      res.status(500).send("internal server error occured");
  }
})
module.exports = router