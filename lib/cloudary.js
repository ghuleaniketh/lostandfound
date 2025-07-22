import { v2 as cloudinary } from 'cloudinary';

    const cloudinary = cloudinary.config({ 
        cloud_name: 'dethahoug', 
        api_key: '684834859387855', 
        api_secret: '5WRYDW8XhINJXcU0XxP1T3v7OZk' 
    });


    export default cloudinary;