//archivo donde se manejara la carga de imagenes y eliminaciones del mismo,usando la libreria multer

import { diskStorage, Options } from "multer";
import {v4 as uuidv4} from 'uuid';

//file-system
import fs = require('fs');

//manejo de rutas
import path = require('path');


//configuramos los tipos de imagenes que se van a manejar
const validMimeType = ['image/png', 'image/jpg', 'image/jpeg'];



//funcion para tomar el archivo,manejando errores tambien
export const saveImagesToStorage = (destination) => {
    return{
         
        storage: diskStorage({
            destination: `./uploads/${destination}`,
            filename: (req, file, callback) => {
                const fileExtension: string = path.extname(file.originalname);
                const filename = uuidv4() + fileExtension;
                callback(null, filename);
            }
        }),
        
        fileFilter: (req, file, callback) => {
            
            const allowedMimeTypes = validMimeType;
            allowedMimeTypes.includes(file.mimetype)
                ? callback(null,true)
                : callback(null, false)
        },
        
    }
}


//funcion para eliminar o remover el archivo seleccionado
export const removeFile = (fullFilePath:string) => {
    try {
        fs.unlinkSync(fullFilePath);
    } catch (e) {
       console.error(new Date(), e)     
    }
}