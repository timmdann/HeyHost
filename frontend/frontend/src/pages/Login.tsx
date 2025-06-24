import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 401) {
        setError('Неверный email или пароль');
        return;
      }

      if (!res.ok) throw new Error('Ошибка сервера');

      const data = await res.json();
      console.log('Logged in!', data);

      // ❗Сохраняем токен
      localStorage.setItem('token', data.token);

      // Перенаправляем на дашборд
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError('Ошибка входа');
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="button-primary">Login</button>
      </form>

      {error && (
        <div className="text-red-600 mt-4">
          {error}
          <button onClick={() => navigate('/register')} className="ml-4 underline text-blue-600">
            Зарегистрироваться
          </button>
        </div>
      )}
    </div>
  );
}
