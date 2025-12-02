
import { Request, Response, RequestHandler } from "express"
import { CerficateService } from "../services/certificate.service"
import { isIntegerString } from "../utils/objectFunctions"


export class CertificateController {

    public static getPDFByStudentId : RequestHandler = async (req : Request, res : Response) => {

        const paramId = req.params.id

        try {

            if (!isIntegerString(paramId)) {
                throw new Error('El ID pasado como parámetro no corresponde a un valor entero')
            }

            const id = parseInt(paramId)

            const result = await CerficateService.generateRegularCertificatePDF(id)

            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `inline; filename="certificado_alumno_regular_${id}.pdf"`)
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else if (error.message === 'El ID pasado como parámetro no corresponde a un valor entero') {
                res.status(400).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }

    public static getDOCXByStudentId : RequestHandler = async (req : Request, res : Response) => {

        const paramId = req.params.id

        try {

            if (!isIntegerString(paramId)) {
                throw new Error('El ID pasado como parámetro no corresponde a un valor entero')
            }

            const id = parseInt(paramId)

            const result = await CerficateService.generateRegularCertificateDOCX(id)

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            res.setHeader('Content-Disposition', 'attachment; filename=certificado.docx')
            
            res.status(200).send(result)

        }
        catch (error : any) {

            if (error.message === 'El recurso con el ID solicitado no existe') {
                res.status(404).json({error: `${error.message}`})
            }
            else if (error.message === 'El ID pasado como parámetro no corresponde a un valor entero') {
                res.status(400).json({error: `${error.message}`})
            }
            else{
                res.status(503).json({error: `${error.message}`})
            }

        }
    }


}