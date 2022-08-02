import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand
} from "@aws-sdk/client-s3";

import { mountObjectDeleteS3 } from "../utils/mountObjectDeleteS3";

export { IListSave } from "../interfaces/saveS3";
 
import dotenv from "dotenv";
import { IListSave } from "../interfaces/saveS3";

dotenv.config();

interface IResponseSave {
  url: string;
  key: string;
}

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

const saveFile = async (value:ISaveInS3 ): Promise<IResponseSave> => {
  const key = `${value.userId}/${value.complaintId}/${value.fileName}`
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    Body: value.buffer,
  }

  await s3.send(new PutObjectCommand(params))

  const url = `${process.env.PRE_URL_AWS_S3}/${key}`
  const response = {
    url,
    key
  }
  return response;
}

const deleteComplaints = async (value: Array<IListSave>) => {
  const responseMount = mountObjectDeleteS3(value);

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Delete: {
      Objects: responseMount
    }
  };

  await s3.send(new DeleteObjectsCommand(params));
  return;
}

export { saveFile, deleteComplaints }
