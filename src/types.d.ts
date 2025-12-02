// Interfaz para crear un alumno regular

export interface RegularCertificateInput {
    id: number
    apellido: string
    nombre: string
    nro_documento: number
    tipo_documento: string
    fecha_nacimiento: Date,
    sexo: "M" | "F",
    nro_legajo: number,
    fecha_ingreso: Date
}