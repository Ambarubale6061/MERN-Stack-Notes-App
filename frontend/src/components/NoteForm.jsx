import React, { useState } from 'react';
export default function NoteForm({ onCreate }){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  async function submit(e){
    e.preventDefault();
    if(!title) return alert('Title required');
    await onCreate({ title, content });
    setTitle(''); setContent('');
  }
  return (
    <form className="note-form" onSubmit={submit}>
      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} />
      <button type="submit">Add Note</button>
    </form>
  );
}
