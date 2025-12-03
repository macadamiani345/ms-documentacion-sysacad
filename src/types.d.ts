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
    fecha_nacimiento: Date
    sexo: "M" | "F"
    nro_legajo: number
    fecha_ingreso: Date
    especialidad: IEspecialidad
}

export interface ITipoDocumento {
    id: number
    sigla: 'DNI' | 'LC' | 'LE' | 'CI' | 'PASAPORTE'
    nombre: string
}

export interface IEspecialidad {
    id: number,
    nombre: string
    letra: string
    observacion: string
    tipo_espacialidad: string
    facultad: IFacultad
}

export interface IFacultad {
    id: number
    nombre: string
    abreviatura: string
    directorio: string
    sigla: string
    codigoPostal: string
    ciudad: string
    domicilio: string
    telefono: string
    contacto: string
    email: string
    universidad: IUniversidad
}

export interface IUniversidad {
    id: number
    nombre: string
    sigla : string
}