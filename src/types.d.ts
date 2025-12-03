
// Interfaz para crear un alumno regular

export interface IRegularCertificate {
    apellido: string
    nombre: string
    tipo_documento: string
    nro_documento: number
    nro_legajo: number
    especialidad: string
    facultad: string
    universidad: string
    ciudad: string
    fecha: string
}

export interface IAlumno {
    id: number
    apellido: string
    nombre: string
    nro_documento: number
    tipo_documento: ITipoDocumento
    fecha_nacimiento: string
    sexo: "M" | "F"
    nro_legajo: number
    fecha_ingreso: string
    id_especialidad: number
}

export interface ITipoDocumento {
    id: number
    sigla: 'DNI' | 'LC' | 'LE' | 'CI' | 'PASAPORTE'
    nombre: string
}

export interface IEspecialidad {
    especialidad: string,
    facultad: string,
    universidad: string,
}