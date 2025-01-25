import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken');

/*Se importan los tipos Request, Response y NextFunction de Express para tipar los parámetros
- Se define un interfaz para el token codificado
- Para los errores se utiliza unknown y se hace un casting a Error para acceder al mensaje
- Se asegura que la variable de entorno sea tratada como una cadena.
*/
interface DecodedToken {
    user: string;
}

// Extender la interfaz de Express Request para incluir la propiedad de usuario
declare module 'express-serve-static-core' {
    interface Request {
        user?: DecodedToken;
    }
}

const middlewareAutentication = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        return res.status(403).json({
            message: "Authentication token is required."
        });
    };

    jwt.verify(token, process.env.JWT_SECRET as string, (error: unknown, decoded: DecodedToken | undefined) => {
        if(error) {
            return res.status(401).json({message: 'Invalid token', error: (error as Error).message});
        }

        req.user = decoded;
        next();
        
    });
};

export default middlewareAutentication;