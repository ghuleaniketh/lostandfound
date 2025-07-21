import db from "@/lib/db";

export async function POST(req){
    try{
        
    const data = await req.json();
    const {email,passowrd} = data;
    console.log(email);
    const q = 'SELECT * FROM users WHERE email = ?';
    const [userdata] =await db.execute(q,[email]);
    return Response.json({ success: true, data: userdata[0]});
    }catch{
        console.log("problem ho gaya bhai");
    }
}