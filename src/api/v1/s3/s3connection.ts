import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { S3_ACCESS_KEY, S3_BUCKET_NAME, S3_BUCKET_REGION, S3_SECRET_ACCESS_KEY } from "../../../config/config";

const s3 = new S3Client({
  credentials: {
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    accessKeyId: S3_ACCESS_KEY,
  },
  region: S3_BUCKET_REGION,
});

export const insertImage = async (name: string, buffer: Buffer, contentType: string) => {
  const params = { Bucket: S3_BUCKET_NAME, Key: name, Body: buffer, ContentType: contentType };
  const command = new PutObjectCommand(params);
  await s3.send(command);
};

export const getImage = async (name: string) => {
  const signedUrl = await getSignedUrl(s3, new GetObjectCommand({ Bucket: S3_BUCKET_NAME, Key: name }), { expiresIn: 3600 * 3 });
  return signedUrl;
};

export const deleteImage = async (name: string) => {
  const params = { Bucket: S3_BUCKET_NAME, Key: name };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
};
