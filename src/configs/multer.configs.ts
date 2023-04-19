import multer, { FileFilterCallback } from "multer"
import { resolve } from "node:path"
import { Request } from 'express';
import { CustomFile } from "./configs.interfaqces";

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

const fileSize = 1 * 1024 * 1024


export default {
    tmpFolder,

    fileFilter: (
        req: Request, file: CustomFile, callback: FileFilterCallback) => {
        const acceptTypes = file.mimetype
        if (acceptTypes === "text/csv") {
            callback(null, true,)
        } else {
            callback(null, false)
            callback(new Error("O Arquivo deve ser no formato CSV"))
        }
    },

    limits: {
        fileSize
    },

    storage: multer.diskStorage({
        destination: tmpFolder,
        filename: (request, file, callback) => {
            const filename = `${file.originalname}.csv`
            return callback(null, filename)
        }
    })
}