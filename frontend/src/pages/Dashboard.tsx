import { useEffect, useState } from 'react';

export function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('http://localhost:3000/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
      });
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">👋 Welcome to Dashboard</h1>
      {user && (
        <p className="mt-4">You are logged in as: <strong>{user.email}</strong></p>
      )}
    </div>
  );
}
