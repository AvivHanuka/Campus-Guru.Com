import { indexedStorageDB } from "@/utils/local-forage";

export const getAuthHeader = async () => {
  const db = (await indexedStorageDB.getItem("persist:root")) as string;
  
  const jwt = JSON.parse(db, (_, value) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  })?.auth?.jwt;

  return jwt ? jwt : "";
};
