'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './register.module.css';

export default function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        pass: '',
        conformpass: ''
    });

    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.pass !== formData.conformpass) {
        setError("Passwords do not match!");
        return;
    }

    setError('');

    try {
        const res = await fetch('/api/app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                pass: formData.pass
            }),
        });

        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.message || 'Something went wrong!');
        }

        router.push('/login');

    } catch (err) {
        setError(err.message);
    }
};

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Register</h1>
                {error && <div className={styles.error}>{error}</div>}
                <div className={styles.nameinput}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className={styles.password}>
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={formData.pass}
                        onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        required
                        value={formData.conformpass}
                        onChange={(e) => setFormData({ ...formData, conformpass: e.target.value })}
                    />
                </div>
                <button type="submit">Register</button>
                <a className={styles.anker} href="/login">Already registered? Login</a>
            </form>
        </div>
    );
}
