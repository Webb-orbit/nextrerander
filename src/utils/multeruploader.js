import multer from "multer";

const storage = multer.memoryStorage()
  
export const multeruploader = multer({ storage: storage })