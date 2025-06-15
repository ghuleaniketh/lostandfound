'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { useState } from 'react';

export default function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
        
            if (res.ok) {
    if (data.pass === formData.password) {


        Cookies.set('token', data.id, {
        expires: 1, // 1 day
        secure: true,
        sameSite: 'strict',
        });

//         import Cookies from 'js-cookie';

// const token = Cookies.get('token');
// console.log("User token from cookie:", token);


        alert("Login ho gai bhai.............");
        router.push('/home');
    } else {
        alert("worng password!!!!!!!!!!");
    }
} else {
    alert("user not found!!!!!!!!!!!!!!!!!")
}

        } catch (error) {
            alert("user not found");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1>Login</h1>
                {error && <div className={styles.error}>{error}</div>}
                <label className ={styles.lablewala} >Email</label>
                <input
                    type="email"
                    placeholder="Enter mail"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <label className ={styles.lablewala} >Password</label>
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder=" Enter Password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                <div className={styles.checkboxinput}>
                <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                />
                <label className ={styles.lablewala} >Show password</label>
                </div>
                
                
                <button type="submit">Login</button>
                <a className = {styles.anker} href="/register">New user? Register</a>
            </form>
        </div>
    );
}