import { createContext } from "react";
//make context and export so that notessate will use it
const NoteContext = createContext();

export default NoteContext;

//context API allows data to be passed through a component tree without having to pass props manually at every level. This makes it easier to share data between components.