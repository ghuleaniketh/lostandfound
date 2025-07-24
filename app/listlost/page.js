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
            const uploadData = new FormData();

            // Append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                uploadData.append(key, value);
            });

            // Append the file
            if (imageFile) {
                uploadData.append('image', imageFile); // 'image' must match backend field name
            }

            const res = await fetch('/api/lostitem', {
                method: 'POST',
                body: uploadData, // No need to set headers
            });

            if (!res.ok) {
                const errorMsg = await res.text();
                setError(errorMsg || 'Failed to submit the report.');
                setSuccess('');
                return;
            }

            setSuccess('Lost item added successfully!');
            setError('');

            // Reset form
            setFormData({
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
            setImageFile(null);
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

                <form onSubmit={handleSubmit} className={styles.form} encType='multipart/form-data'>
                    {[
                        { label: 'Title', key: 'title', type: 'text' },
                        { label: 'Description', key: 'description', type: 'textarea' },
                        { label: 'Category', key: 'category', type: 'text' },
                        { label: 'Location', key: 'location', type: 'text' },
                        { label: 'Date & Time Lost', key: 'date', type: 'datetime-local' },
                        { label: 'Contact Info', key: 'contactInfo', type: 'text' },
                        { label: 'Your Username', key: 'ownerUsername', type: 'text' },
                        { label: 'Your Email', key: 'ownerEmail', type: 'email' }
                    ].map(({ label, key, type }) => (
                        <div className={styles.formGroup} key={key}>
                            <label>{label}</label>
                            {type === 'textarea' ? (
                                <textarea
                                    required
                                    value={formData[key]}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            ) : (
                                <input
                                    type={type}
                                    required
                                    value={formData[key]}
                                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                />
                            )}
                        </div>
                    ))}

                    <div className={styles.formGroup}>
                        <label>Photo of Item</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
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
