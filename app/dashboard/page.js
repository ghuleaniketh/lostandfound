'use client';

import styles from "../topnav.module.css";
import { useState } from "react";
import Sidebar from '../sidebar'

export default function Dashboard(){
    const [activeTab, setActiveTab] = useState('lost');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

return(
    <>
            
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className={styles.navContainer}>
                <button 
                    className={styles.menuButton}
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
                <div className={styles.nav}>
                    <div 
                        className={`${styles.navButton} ${activeTab === 'lost' ? styles.active : ''}`}
                        onClick={() => setActiveTab('lost')}
                    >
                        Returned
                    </div>
                    <div 
                        className={`${styles.navButton} ${activeTab === 'found' ? styles.active : ''}`}
                        onClick={() => setActiveTab('found')}
                    >
                        Clamed
                    </div>
                </div>
                <div className={styles.sidebarIcon}></div>
            </div>
            {/* {activeTab === 'lost' ? <Lostitem /> : <FoundItem />} */}
        </>
)
}