import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      if (res.status === 400) {
        setError('Пользователь уже существует. Перейдите к логину.');
        return;
      }

      if (!res.ok) throw new Error('Ошибка сервера');

      const data = await res.json();
      console.log('Registered!', data);

      navigate('/login');
    } catch (err) {
      setError('Что-то пошло не так при регистрации');
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Registration</h1>

      <form onSubmit={handleSubmit} className="form">
        <input placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="input" />
        <input placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} className="input" />
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="input" />
        <button type="submit" className="button-primary">Register</button>
      </form>

      {error && (
        <div className="mt-4 text-red-600">
          {error}
          <button className="ml-4 underline text-blue-600" onClick={() => navigate('/login')}>
            Перейти к логину
          </button>
        </div>
      )}
    </div>
  );
}
