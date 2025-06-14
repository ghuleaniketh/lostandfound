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
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <div className={styles.buttoncont}>
                    <button className={styles.btn}>click me</button>
                </div>
                
            </div>
            <div className={styles.imageContainer}>
                    <img 
                        src="https://media.licdn.com/dms/image/v2/C510BAQGikFtlBr3v3A/company-logo_200_200/company-logo_200_200/0/1631390746545?e=2147483647&v=beta&t=ztcbxIymeoiGRp5DC8cJqhHkwSV-9JDM6ecIJlutddM" 
                        alt="Item"
                        className={styles.itemImage}
                    />
                </div>
        </div>
      ))}
    </div>
  );
}
