
import { PDFGenerator } from "../utils/pdf"
import { StudentMapper } from "../mapping/student.mapper"
import { StudentService } from "./student.service"
import { SpecialityService } from "./speciality.service"
import { DOCXGenerator } from "../utils/docx"


export class CerficateService {

    public static async generateRegularCertificatePDF(id : number) : Promise<Uint8Array | null> {

        try {

            const student = await StudentService.getById(id)
            const speciality = await SpecialityService.getById(id)

            const certificateInput = StudentMapper.fromEntityToCertificateObject(student, speciality)

            const certificate = await PDFGenerator.regularCertificate(certificateInput)

            return certificate

        } 
        catch (error : any) {
            throw new Error(error.message)
        }

    }

    public static async generateRegularCertificateDOCX(id : number) : Promise<Buffer | null> {

        try {

            const student = await StudentService.getById(id)
            const speciality = await SpecialityService.getById(id)

            const certificateInput = StudentMapper.fromEntityToCertificateObject(student, speciality)

            const certificate = await DOCXGenerator.regularCertificate(certificateInput)

            return certificate

        } 
        catch (error : any) {
            throw new Error(error.message)
        }

    }


}