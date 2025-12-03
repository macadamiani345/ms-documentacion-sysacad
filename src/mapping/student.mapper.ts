
import { IRegularCertificate, IAlumno } from "../types"


export class StudentMapper {

    public static fromEntityToCertificateObject = (data : IAlumno) : IRegularCertificate => {

        return {
            apellido: data.apellido,
            nombre: data.nombre,
            tipo_documento: data.tipo_documento.sigla,
            nro_documento: data.nro_documento,
            nro_legajo: data.nro_legajo,
            especialidad: data.especialidad.nombre,
            facultad: data.especialidad.facultad.nombre,
            universidad: data.especialidad.facultad.universidad.nombre,
            ciudad: data.especialidad.facultad.ciudad,
            fecha: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
        }
    }

}