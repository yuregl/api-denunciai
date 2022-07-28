import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
 
import dotenv from "dotenv";

dotenv.config();

interface ISaveInS3 {
  buffer: Buffer,
  userId: string,
  complaintId: string,
  fileName: string
}

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.S3_AWS_SECRET_KEY || '',
  },
  region: process.env.S3_REGION,
});

const saveFile = async (value:ISaveInS3 ): Promise<string> => {
  const key = `${value.userId}/${value.complaintId}/${value.fileName}`
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: value.buffer,
  }

  await s3.send(new PutObjectCommand(params))

  const url = `${process.env.PRE_URL_AWS_S3}/${key}`
  return url;
}

export { saveFile }
