"use server"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as dotenv from "dotenv";
dotenv.config();

const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'AKIA6JKEXUU4STV2MMKZ',
      secretAccessKey: process.env.AWS_SECRET_KEY_ID || '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',
    },
});

const bucketName = process.env.S3_BUCKET_NAME;

export default async function uploadProductImages(formData: FormData) {
    try {
      const files = formData.getAll('files') as File[] | null;
      console.log("files: ", files);
      if(!files) return JSON.stringify({ success: false, error: 'File not provided' });

      const imageURLs = [];

      for(const file of files){
        console.log(file.name);

        const fileExtension = file.name.toLowerCase().split('.')[file.name.toLowerCase().split('.').length-1];

        if (fileExtension === "png" || fileExtension === "jpg" ||  fileExtension === "jpeg") {
            const buffer = Buffer.from(await file.arrayBuffer());
    
            // Configure the upload parameters
            const uploadParams = {
                Bucket: bucketName,
                Key: file.name,
                Body: buffer,
                ContentType: `image/${fileExtension}`,
            };
        
            // Upload the file
            const data = await s3Client.send(new PutObjectCommand(uploadParams));

            console.log("Upload successful: ", data);

            // const signedUrl = await getSignedUrl(s3Client, new PutObjectCommand({ 
            //     Bucket: bucketName, 
            //     Key: file.name 
            // }), {
            //     expiresIn: 60 * 60 * 24 * 365 * 100
            // });

            const signedUrl = `https://onestop-vyapar.s3.ap-south-1.amazonaws.com/${file.name}`;

            imageURLs.push(signedUrl);
        }else{
            return JSON.stringify({ success: false, error: "Only .png, .jpg, .jpeg files are allowed"});
        }
      }

      return JSON.stringify({ success: true, message: 'File upload to object store', imageURLs: imageURLs });
    } catch (error) {
      console.error("Error uploading Image:", error);
      return JSON.stringify({ success: false, error: error });
    }
}