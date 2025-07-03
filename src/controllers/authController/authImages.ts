import { Request, Response } from 'express';
import AuthService from '../../services/authService/authService';

const getImages = async (_req: Request, res: Response): Promise<void> => {
    try {
        const result = await AuthService.getAllImages();
        console.log('entro al controlador de imágenes');
        
        if(result.length === 0){
            res.status(404).json({error: 'No hay registros'})
            return;
        }
        // const result = await PresaleService.getAllPresales();
        console.log('IMAGES:', result);
        res.status(200).json({ result });
    } catch (error: any) {
        if (error && error.code === "ER_DUP_ENTRY") {
            res.status(500).json({ errorInfo: error.sqlMessage });
        } else {
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }
    }
}

export default getImages;