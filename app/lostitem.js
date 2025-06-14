'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";

export default function Lostitem() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  let saman = [
    {
      id:"1",
      fullName : "aniket",
      contact:"1234567890",
      dateLost:"09/25/2025",
      timeLost:"01:22",
      itemLost:"ID Card",
      itemDescription:"srm ka id hai",
      location:"Near V - Block",
      photo:"https://media.licdn.com/dms/image/v2/C510BAQGikFtlBr3v3A/company-logo_200_200/company-logo_200_200/0/1631390746545?e=2147483647&v=beta&t=ztcbxIymeoiGRp5DC8cJqhHkwSV-9JDM6ecIJlutddM"
    },
    {
    id: "2",
    fullName: "Vaishnav Rao",
    contact: "9876543210",
    dateLost: "09/20/2025",
    timeLost: "14:45",
    itemLost: "Water Bottle",
    itemDescription: "Steel bottle with name label",
    location: "Library",
    photo: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQig7_BLlwWCIeO-RF8_dwJa6sdGgiplvIh74KDpCLhqGWc4whnCz8QvDI8bHkm0qmXhhf98Ei6CV00S0VGzQfTdpU29If_Vg6woXuguUdx1dnlsvs3IxHT"
  },
  {
    id: "3",
    fullName: "Riya Reddy",
    contact: "7891234560",
    dateLost: "09/21/2025",
    timeLost: "11:10",
    itemLost: "Power Bank",
    itemDescription: "Mi power bank, black color, 10000mAh",
    location: "Near Hostel Gate",
    photo: "https://images.unsplash.com/photo-1618838895724-4c94fd5ce808?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "4",
    fullName: "Rohan Mehta",
    contact: "9123456789",
    dateLost: "09/22/2025",
    timeLost: "16:20",
    itemLost: "Bluetooth Speaker",
    itemDescription: "JBL portable speaker, red color",
    location: "Cafeteria",
    photo: "https://images.unsplash.com/photo-1585386959984-a4155227c9ea?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "5",
    fullName: "Isha Kulkarni",
    contact: "9988776655",
    dateLost: "09/24/2025",
    timeLost: "19:00",
    itemLost: "Spectacles",
    itemDescription: "Ray-Ban glasses in black case",
    location: "Main Auditorium",
    photo: "https://images.unsplash.com/photo-1581609958476-96b7c93af5d8?auto=format&fit=crop&w=200&q=80"
  }
  ]

  useEffect(() => {
    setTimeout(() => {
      setUsers(saman);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div>Ruk Bhai .....</div>;
  if (error) return <div>Kuch tho gadbad hai daya ....... {error}</div>;

  return (
    <div className={styles.container}>
      {users.map((item) => (
        <div key={item.id} className={styles.card}>
          <div className={styles.cardContent}>
            <div>
              <h1>{item.fullName}</h1>
              <div className={styles.dateandtime}>
                <p><strong>Date Lost:</strong> {item.dateLost}</p>
                <p><strong>Time Lost:</strong> {item.timeLost}</p>
                </div>
            </div>
            <div className={styles.otherInfo}>
              <p><strong>Contact:</strong> {item.contact}</p>
              <p><strong>Description:</strong> {item.itemDescription}</p>
              <p><strong>Location:</strong> {item.location}</p>
            </div>

            <div className={styles.cardBtn}>
              <button>click me</button>
            </div>
            
            
          </div>
          <div className={styles.imgbox}>
            <div>
              <img
              src={item.photo}
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
