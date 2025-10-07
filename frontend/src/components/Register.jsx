import React, { useState } from 'react';
import { register } from '../api';
export default function Register({ onRegister }){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function submit(e){ e.preventDefault(); const res = await register({ name, email, password }); if(res.token){ onRegister(res); } else alert(res.message || 'Register failed'); }
  return (
    <form className="auth-form" onSubmit={submit}>
      <h3>Register</h3>
      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
}
