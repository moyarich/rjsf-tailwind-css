import {  Auth, Storage } from "aws-amplify";

export type AccessLevel = "public" | "private";

const handleS3FileUpload = async (file: File, level?: AccessLevel) => {
  const result = await Storage.put(file.name, file, {
      contentType: file.type,
      level: level || "protected",
  });
  return { key: result.key };
};

export default handleS3FileUpload