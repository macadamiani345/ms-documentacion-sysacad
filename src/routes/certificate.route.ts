
import express from 'express'
import { CertificateController } from '../controllers/certificate.controller'

const certifcateRouter = express.Router()

certifcateRouter.get('/:id/pdf', CertificateController.getPDFByStudentId)
certifcateRouter.get('/:id/docx', CertificateController.getDOCXByStudentId)

export default certifcateRouter