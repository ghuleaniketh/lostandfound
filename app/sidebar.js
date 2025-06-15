'use client';
import styles from './sidebar.module.css';
import Link from 'next/link';

export default function Sidebar({ isOpen, onClose }) {
    return (
        <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeButton} onClick={onClose}>×</button>
            <nav className={styles.sidebarNav}>
                <Link href="/" className={styles.sidebarLink}>
                Home
                </Link>
                <Link href="/profile" className={styles.sidebarLink}>
                Profile
                </Link>                
                <Link href="/listlost" className={styles.sidebarLink}>
                List Lost Item
                </Link>
                <Link href="/dashboard" className={styles.sidebarLink}>
                Dashboard
                </Link>
                <Link href="/login" className={styles.sidebarLink}>
                Logout
                </Link>
            </nav>
        </div>
    );
}