'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Lostitem() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('/api/getlostitemdata');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const items = await response.json();
      console.log(items);
      setUsers(items);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  if (loading) return <div>loading.................</div>;
  if (error) return <div>Kuch tho gadbad hai daya ....... {error}</div>;

  return (
    <div className={styles.container}>
      {users.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardContent}>
            <div>
              <h1>{item.owner_username}</h1>
              <div className={styles.dateandtime}>
                <p><strong>Date Lost:</strong> {item.date_lost}</p>
                <p><strong>Time Lost:</strong> {item.timeLost}</p>
                </div>
            </div>
            <div className={styles.otherInfo}>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p><strong>Description:</strong> {item.itemDescription}</p>
              <p><strong>Location:</strong> {item.location}</p>
            </div>

            <div className={styles.cardBtn}>
              <button>Collect</button>
            </div>
            
            
          </div>
          <div className={styles.imgbox}>
            <div>
              <img
              src={item.img}
              alt={item.itemLost}
              className={styles.itemImage}
              />
            </div>
            
            <div>
              <p><strong>Item Lost:</strong> {item.itemLost}</p>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}
