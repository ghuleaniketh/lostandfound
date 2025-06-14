'use client';
import { useState } from 'react';
import styles from './lostform.module.css';
import { v4 as uuidv4 } from 'uuid';



export default function LostForm() {
    const [formData, setFormData] = useState({
        id:uuidv4(),
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
        <div className={styles.formContainer}>
            <h1>Lost Item Report</h1>
            {error && <div className={styles.error}>{error}</div>}
            <form method='post' action={"/api/lost_item"} onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label>Full Name </label>
                    <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Contact Email / Phone </label>
                    <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Date Lost </label>
                        <input
                            type="date"
                            required
                            value={formData.dateLost}
                            onChange={(e) => setFormData({...formData, dateLost: e.target.value})}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Approximate Time</label>
                        <input
                            type="time"
                            value={formData.timeLost}
                            onChange={(e) => setFormData({...formData, timeLost: e.target.value})}
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Item Name </label>
                    <input
                        type="text"
                        required
                        placeholder="e.g. Wallet, Phone"
                        value={formData.itemName}
                        onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Item Description </label>
                    <textarea
                        required
                        placeholder="Color, brand, identifying marks, etc."
                        value={formData.itemDescription}
                        onChange={(e) => setFormData({...formData, itemDescription: e.target.value})}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Location Last Seen </label>
                    <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                    />
                </div>

                {/* <div className={styles.formGroup}>
                    <label>Identification on Item</label>
                    <input
                        type="text"
                        placeholder="Any stickers, tags, or initials"
                        value={formData.identification}
                        onChange={(e) => setFormData({...formData, identification: e.target.value})}
                    />
                </div> */}

                <div className={styles.formGroup}>
                    <label>Photo of Item</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className={styles.fileInput}
                    />
                </div>

                {/* <div className={styles.formGroup}>
                    <label>Additional Notes</label>
                    <textarea
                        placeholder="Any other relevant information"
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    />
                </div> */}

                <button type="submit" className={styles.submitButton}>
                    Submit Report
                </button>
            </form>
        </div>
    );
}