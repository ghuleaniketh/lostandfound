'use client';
import { useState } from 'react';
import styles from './listfound.module.css';
import Sidebar from '../sidebar';

export default function listfound() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        location: '',
        foundDate: '',
        finderName: '',
        finderEmail: '',
        finderContact: '',
        itemImage: '',
        additionalNotes: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const submitData = new FormData();
            
            
            Object.keys(formData).forEach(key => {
                if (key !== 'itemImage') {
                    submitData.append(key, formData[key]);
                }
            });

            if (imageFile) {
                submitData.append('itemImage', imageFile);
            }

            const response = await fetch('/api/founditem', {
                method: 'POST',
                body: submitData, 
            });

            if (response.ok) {
                alert('Found item reported successfully!');
                setFormData({
                    title: '',
                    description: '',
                    category: '',
                    location: '',
                    foundDate: '',
                    finderName: '',
                    finderEmail: '',
                    finderContact: '',
                    additionalNotes: '',
                    claimedByEmail: null,
                    claimedAt: null,
                    createdAt: null
                });
                setImageFile(null);
                setImagePreview(null);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
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
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Report Found Item</h2>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Item Title"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="documents">Documents</option>
                            <option value="accessories">Accessories</option>
                            <option value="clothing">Clothing</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Location Found"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="datetime-local"
                            name="foundDate"
                            value={formData.foundDate}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="finderName"
                            value={formData.finderName}
                            onChange={handleChange}
                            placeholder="Finder Name"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="finderEmail"
                            value={formData.finderEmail}
                            onChange={handleChange}
                            placeholder="Finder Email"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="finderContact"
                            value={formData.finderContact}
                            onChange={handleChange}
                            placeholder="Finder Contact"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            placeholder="Additional Notes"
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.imageUpload}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className={styles.fileInput}
                            />
                            <span>Choose Image</span>
                        </label>
                        {imagePreview && (
                            <div className={styles.imagePreview}>
                                <img 
                                    src={imagePreview} 
                                    alt="Preview" 
                                    className={styles.previewImage}
                                />
                            </div>
                        )}
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Submit Found Item
                    </button>
                </form>
            </div>
        </>
    );
}