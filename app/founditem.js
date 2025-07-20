import styles from "./page.module.css";



export default function FoundItem() {
    const users = [
        {
            username:"aniketh",
            email:"aniketh@gmail.com"
        },
        {
            username:"pranav",
            email :"pranav@gamil.com"
        }
    ]
  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div key={user.id} className={styles.card}>
          <div className={styles.cardContent}>
            <div>
              <h1>{user.fullName}</h1>
              <div className={styles.dateandtime}>
                <p><strong>Date Lost:</strong> {user.dateLost}</p>
                <p><strong>Time Lost:</strong> {user.timeLost}</p>
                </div>
            </div>
            <div className={styles.otherInfo}>
              <p><strong>Contact:</strong> {user.contact}</p>
              <p><strong>Description:</strong> {user.itemDescription}</p>
              <p><strong>Location:</strong> {user.location}</p>
            </div>

            <div className={styles.cardBtn}>
              <button>Collect</button>
            </div>
            
            
          </div>
          <div className={styles.imgbox}>
            <div>
              <img
              src={user.photo}
              alt={user.itemLost}
              className={styles.itemImage}
              />
            </div>
            
            <div>
              <p><strong>Item Lost:</strong> {user.itemLost}</p>
            </div>
            
          </div>
        </div>
      ))}
    </div>
  );
}
