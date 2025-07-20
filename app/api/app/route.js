import { v4 as uuidv4 } from 'uuid';
import db from '@/lib/db';

export async function POST(req){
    try{
        const data = await req.json();
    const {username,email,pass} = data ;
        let id = uuidv4();
        console.log(id);
        console.log(username);
        console.log(email);
        console.log(pass);


        const q = 'INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)';
        await db.query(q, [id, username, email, pass]);


    return new Response(JSON.stringify({ message: 'User added successfully!' }), {
    status: 200,
    });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error adding user', error: error.message }), {
            status: 500,
        });
    }
};

