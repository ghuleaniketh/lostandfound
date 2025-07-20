'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './lostform.module.css';
import Sidebar from '../sidebar';

export default function LostForm() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
    id: uuidv4(),
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    contactInfo: '',
    status: 'not found',
    ownerUsername: '',
    ownerEmail: '',
  });

  const [imageFile, setImageFile] = useState(null);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            const uploadData = new FormData();

    for (const key in formData) {
      uploadData.append(key, formData[key]);
    }

    uploadData.append('image', imageFile); // Must match multer field
            const res = await fetch('/api/lostitem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(uploadData),
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                setError(errorMsg || 'Failed to submit the report.');
                setSuccess('');
                return;
            }

            setSuccess('Lost item added successfully!');
            setError('');
            // Optionally reset form fields here
        } catch (err) {
            setError(err.message || 'Something went wrong.');
            setSuccess('');
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
                {success && <div className={styles.success}>{success}</div>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea
                            required
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <input
                            type="text"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Location</label>
                        <input
                            type="text"
                            required
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Date & Time Lost</label>
                        <input
                            type="datetime-local"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Contact Info</label>
                        <input
                            type="text"
                            required
                            value={formData.contactInfo}
                            onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        />
                    </div>
                    
                    <div className={styles.formGroup}>
                        <label>Your Username</label>
                        <input
                            type="text"
                            required
                            value={formData.ownerUsername}
                            onChange={(e) => setFormData({ ...formData, ownerUsername: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Your Email</label>
                        <input
                            type="email"
                            required
                            value={formData.ownerEmail}
                            onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Photo of Item</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, img: e.target.value })}
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
