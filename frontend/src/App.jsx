import React, { useState, useEffect } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from './api';
import NotesList from './components/NotesList';
import NoteForm from './components/NoteForm';
import Login from './components/Login';
import Register from './components/Register';
export default function App(){
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')||'null'));
  useEffect(()=>{ if(user) loadNotes(); else setLoading(false); }, [user]);
  async function loadNotes(){
    setLoading(true);
    const data = await getNotes();
    setNotes(data);
    setLoading(false);
  }
  async function handleCreate(note){
    const saved = await createNote(note);
    setNotes(prev => [saved, ...prev]);
  }
  async function handleUpdate(id, note){
    const updated = await updateNote(id, note);
    setNotes(prev => prev.map(n=> n._id===id?updated:n));
  }
  async function handleDelete(id){
    await deleteNote(id);
    setNotes(prev => prev.filter(n=> n._id!==id));
  }
  function handleLogout(){ localStorage.removeItem('token'); localStorage.removeItem('user'); setUser(null); setNotes([]); }
  if(!user){
    return <div className="center"><h2>MERN Notes</h2><div className="auth"><Register onRegister={(u)=>{ localStorage.setItem('user', JSON.stringify(u.user)); localStorage.setItem('token', u.token); setUser(u.user); }} /><Login onLogin={(u)=>{ localStorage.setItem('user', JSON.stringify(u.user)); localStorage.setItem('token', u.token); setUser(u.user); }} /></div></div>;
  }
  return (
    <div className="app">
      <header><h1>Notes</h1><div>Welcome, {user.name} <button onClick={handleLogout}>Logout</button></div></header>
      <main>
        <NoteForm onCreate={handleCreate} />
        {loading? <p>Loading...</p> : <NotesList notes={notes} onUpdate={handleUpdate} onDelete={handleDelete} /> }
      </main>
    </div>
  );
}
