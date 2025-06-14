import mysql from 'mysql2/promise'; 

const db =  mysql.createPool({
    host: 'localhost',
    user : 'root',
    password: 'jaishreeram',
    database:'collage'
});

export async function POST(req){
    try{
        const data = await req.json();
    const {id,username,email,phone,gender,pass} = data ;
    console.log(id);
    console.log(username);
    console.log(email);
    console.log(phone);
    console.log(gender)
    console.log(pass);


    let q = 'INSERT INTO users (id,username,email,phone,gender,pass ) VALUES (?, ?, ?, ?, ?, ? , ? )';
    await db.query( q,[id,username,email,phone,gender,pass]);

    return new Response(JSON.stringify({ message: 'User added successfully!' }), {
    status: 200,
    });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error adding user', error: error.message }), {
            status: 500,
        });
    }
};

