'use client';
import { useState } from 'react';
import styles from './listfound.module.css';

export default function listfound() {
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
            // Create FormData object to handle file upload
            const submitData = new FormData();
            
            // Append all form fields
            Object.keys(formData).forEach(key => {
                if (key !== 'itemImage') {
                    submitData.append(key, formData[key]);
                }
            });

            // Append the image file
            if (imageFile) {
                submitData.append('itemImage', imageFile);
            }

            const response = await fetch('/api/founditem', {
                method: 'POST',
                body: submitData, // Remove headers as FormData sets them automatically
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
                    itemImage: '',
                    additionalNotes: ''
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
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Report Found Item</h2>
                
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Item Name"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Detailed Description (color, brand, condition, etc.)"
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
                        placeholder="Where did you find it?"
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
                        placeholder="Your Name"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="email"
                        name="finderEmail"
                        value={formData.finderEmail}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <input
                        type="tel"
                        name="finderContact"
                        value={formData.finderContact}
                        onChange={handleChange}
                        placeholder="Contact Number"
                        required
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

                <div className={styles.inputGroup}>
                    <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        placeholder="Additional Notes (optional)"
                    />
                </div>

                <button type="submit" className={styles.submitButton}>
                    Submit Found Item
                </button>
            </form>
        </div>
    );
}