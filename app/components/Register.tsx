'use client';

import { useState } from 'react';
import styles from './Login.module.css'; // We can reuse the Login styles

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Handle successful registration (e.g., redirect to login)
      console.log('Registration successful:', data);
      
    } catch (error) {
      console.error('Registration error:', error);
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
          <h2 className={styles.title}>Create an account</h2>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div>
              <label htmlFor="username" className={styles.srOnly}>
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={styles.input}
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 