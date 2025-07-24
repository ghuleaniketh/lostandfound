import db from '@/lib/db'
import multer from 'multer';

const Upload = multer ({dest:'uploads/'})

export const config = {
  api: {
    bodyParser: false, // required for formidable to work
  },
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        console.log(formData);
        const {imageFile} = formData;
        console.log(imageFile);
        const file = Upload.single()

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Upload error:', err);
        return new Response(JSON.stringify({ success: false, error: err.message }), {
            status: 500,
        });
    }
}
