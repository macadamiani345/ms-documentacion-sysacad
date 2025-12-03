

import { IRegularCertificate, IAlumno, IEspecialidad } from "../types"


export class StudentMapper {

     public static fromEntityToCertificateObject = (student : IAlumno, speciality : IEspecialidad) : IRegularCertificate => {

        return {
            apellido: student.apellido,
            nombre: student.nombre,
            tipo_documento: student.tipo_documento.sigla,
            nro_documento: student.nro_documento,
            nro_legajo: student.nro_legajo,
            especialidad: speciality.especialidad,
            facultad: speciality.facultad,
            universidad: speciality.universidad,
            ciudad: 'San Rafael',
            fecha: `${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()}`
        }
    }

}