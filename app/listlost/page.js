'use client';
import { useState } from 'react';
import styles from './lostform.module.css';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from  '../sidebar';



export default function LostForm() {
    
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        id:uuidv4(),
        fullName: '',
        contact: '',
        dateLost: '',
        timeLost: '',
        itemName: '',
        itemDescription: '',
        location: '',
        identification: '',
        additionalNotes: ''
    });
    const [photo, setPhoto] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });
            if (photo) {
                formDataToSend.append('photo', photo);
            }

            const res = await fetch('/api/lost_item', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                setError(errorMsg || 'Failed to submit the report.');
                return;
            }
            
            setFormData({
                fullName: '',
                contact: '',
                dateLost: '',
                timeLost: '',
                itemName: '',
                itemDescription: '',
                location: '',
                // identification: '',
                // additionalNotes: ''
            });
            setPhoto(null);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <button 
                className={styles.menuButton}
                onClick={() => setIsSidebarOpen(true)}
            >
                ☰
            </button>
            <div className={styles.formContainer}>
                <h1>Lost Item Report</h1>
                {error && <div className={styles.error}>{error}</div>}
                <form method='post' action={"/api/lost_item"} onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title || ''}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            required
                            value={formData.description || ''}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <input
                            type="text"
                            required
                            value={formData.category || ''}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Location</label>
                        <input
                            type="text"
                            required
                            value={formData.location || ''}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <div className={styles.formGroup}>
                            <label>Date Lost</label>
                            <input
                                type="datetime-local"
                                required
                                value={formData.date || ''}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Info</label>
                        <input
                            type="text"
                            required
                            value={formData.contactInfo || ''}
                            onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Status</label>
                        <input
                            type="text"
                            required
                            value={formData.status || ''}
                            onChange={(e) => setFormData({...formData, status: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Your Username</label>
                        <input
                            type="text"
                            required
                            value={formData.ownerUsername || ''}
                            onChange={(e) => setFormData({...formData, ownerUsername: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Your Email</label>
                        <input
                            type="email"
                            required
                            value={formData.ownerEmail || ''}
                            onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Photo of Item</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            className={styles.fileInput}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Submit Report
                    </button>
                </form>
            </div>
        </>
    );
}