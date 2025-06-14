import mysql from 'mysql2/promise'; 

const db =  mysql.createPool({
    host: 'localhost',
    user : 'root',
    password: 'jaishreeram',
    database:'collage'
});

const q = 'SELECT * FROM users;';
try {
    const [rows] = await db.query(q);
    console.log(rows);
} catch (error) {
    console.error('Database query error:', error);
}

const data = await req.json();
    const {email,pass} = data ;
    console.log(email);