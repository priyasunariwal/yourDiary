import React,{ useContext} from 'react'
// import NoteContext from '../context/notes/NotesContext'


const About = () => {
 
//   //see syntax to use context api 
//   const p = useContext(NoteContext);
 
//   // Q: What is the difference between useState and useEffect? A: useState is a hook used to manage state in functional components, while useEffect is a hook used to manage side effects (like fetching data, setting up event listeners, or updating the DOM) in functional components.
//   useEffect(() => {
  
//     // eslint-disable-next-line
//     p.update()
      
//    //warning tha in terminal they suggested to add this line it means nothing
//  }, [])
  return (
   
   <div>
      {/* //using context we got name that was initialised in notesstate.js file */}
      {/* surprise motherfather it's {p.name}  */}
         
      {/* now we trying to use update function for this as now we have write .state. too kyuke directly s1 ko nhi lerahe but usestate ke andar vaale state ko lerahe ,it updates by use effect we have above  */}  
      {/* surprise motherfather it's {p.state.name}  */}
      this is about
      
    </div>
  )
}

export default About
