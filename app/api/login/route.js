import mysql from 'mysql2/promise'; 

const db =  mysql.createPool({
    host: 'localhost',
    user : 'root',
    password: 'jaishreeram',
    database:'collage'
});


export async function POST(req) {
        const q = 'SELECT * FROM users WHERE email = ? ;';
    try {
        const data = await req.json();
        const {email,password} = data ;
        console.log(email);
        console.log(password);
        
        const [rows] = await db.query(q,[email]);

            console.log(rows);
            return new Response(JSON.stringify( rows[0]), {
            status: 200,
            });
            
    } catch (error) {
        console.error('Database query error:', error);
    }

    
}
