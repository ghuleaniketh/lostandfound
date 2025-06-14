'use client';
import { useState } from 'react';
import styles from './register.module.css';
import { v4 as uuidv4 } from 'uuid';

export default function Register() {
    const [formData, setFormData] = useState({
        id: uuidv4(),
        username: '',
        email: '',
        phone: '',
        gender: '',
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
        const res = await fetch('/api/app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: formData.id,
                username: formData.username,
                email: formData.email,
                phone: formData.phone,
                gender: formData.gender,
                pass: formData.pass
            }),
        });
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
                <div className={styles.nameinput}>
                    <input
                        type="number"
                        placeholder="Phone"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 10) {
                                setFormData({ ...formData, phone: value });
                            }
                        }}
                    />
                    <select
                        value={formData.gender}
                        required
                        className={styles.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className={styles.password}>
                    <input
                        type='password'
                        placeholder='Password'
                        required
                        value={formData.pass}
                        onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                    />
                    <input
                        type='password'
                        placeholder='Conform Password'
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