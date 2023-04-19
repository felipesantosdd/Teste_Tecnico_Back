export interface CustomFile extends Express.Multer.File {
    mimetype: string;
}