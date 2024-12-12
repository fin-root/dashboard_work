'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import styles from './Login.module.css';

export default function Login() {
  const router = useRouter();
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUsername(data.username);
      router.push('/dashboard'); // Redirect to main page after login
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Login failed');
      console.error('Login error:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div>
          <h2 className={styles.title}>Sign in to your account</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="email" className={styles.srOnly}>
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={styles.input}
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.srOnly}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={styles.input}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button type="submit" className={styles.button}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
