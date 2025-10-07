import React from 'react';
export default function NotesList({ notes, onUpdate, onDelete }){
  return (
    <div className="notes">
      {notes.length===0 && <p>No notes yet.</p>}
      {notes.map(note=>(
        <div className="note" key={note._id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <div className="note-actions">
            <button onClick={()=> {
              const title = prompt('Edit title', note.title);
              const content = prompt('Edit content', note.content);
              if(title!==null) onUpdate(note._id, { title, content });
            }}>Edit</button>
            <button onClick={()=> { if(confirm('Delete note?')) onDelete(note._id); }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
