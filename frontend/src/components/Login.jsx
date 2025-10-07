import React, { useState } from 'react';
import { login } from '../api';
export default function Login({ onLogin }){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  async function submit(e){ e.preventDefault(); const res = await login({ email, password }); if(res.token){ onLogin(res); } else alert(res.message || 'Login failed'); }
  return (
    <form className="auth-form" onSubmit={submit}>
      <h3>Login</h3>
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
