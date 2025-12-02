import fs from 'fs/promises'
import path from 'path'
import PizZip from 'pizzip'
import Docxtemplater from 'docxtemplater'
import { RegularCertificateInput } from '../types'


export class DOCXGenerator {

    public static regularCertificate = async (studentData : RegularCertificateInput) : Promise<Buffer> => {

        try {
            
            const templatePath = path.resolve(__dirname, '../views/regularCertificate.docx')

            const content = await fs.readFile(templatePath, 'binary')

            const zip = new PizZip(content)

            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            })

            doc.render(studentData)

            const buffer = doc.getZip().generate({
                type: 'nodebuffer',
                compression: 'DEFLATE'
            })

            return buffer

        } 
        catch (error : any) {
            throw new Error(`${error.message}`)
        }

    }

}