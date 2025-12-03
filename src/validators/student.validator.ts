
import * as z from "zod"


const TipoDocumentoSchema = z.object({
    id: z.number().positive().min(1),
    sigla: z.literal(['DNI', 'LC', 'LE', 'CI', 'PASAPORTE']),
    nombre: z.string().min(1)
})

const UniversidadSchema = z.object({
    id: z.number().positive().min(1),
    nombre: z.string().min(1),
    sigla: z.string().min(1)
})

const FacultadSchema = z.object({
    id: z.number().positive().min(1),
    nombre: z.string().min(1),
    abreviatura: z.string().min(1),
    directorio: z.string().min(1),
    sigla: z.string().min(1),
    codigoPostal: z.string().min(1),
    ciudad: z.string().min(1),
    domicilio: z.string().min(1),
    telefono: z.string().min(1),
    contacto: z.string().min(1),
    email: z.string().min(1),
    universidad: UniversidadSchema,
})

const EspecialidadSchema = z.object({
    id: z.number().positive().min(1),
    nombre: z.string().min(1),
    letra: z.string().min(1),
    observacion: z.string().min(1),
    tipo_especialidad: z.string().min(1),
    facultad: FacultadSchema,
})

const AlumnoSchema = z.object({

    id: z.number().positive().min(1),
    apellido: z.string().min(1),
    nombre: z.string().min(1),
    nro_documento: z.number().positive().min(1),
    tipo_documento: TipoDocumentoSchema,
    fecha_nacimiento: z.iso.datetime(),
    sexo: z.literal(["M", "F"]),
    nro_legajo: z.number().positive().min(1),
    fecha_ingreso: z.iso.datetime(),
    especialidad: EspecialidadSchema

}).strict()


export type AlumnoCreateInput = z.infer<typeof AlumnoSchema>


export class StudentValidator {

    public static check = (obj : object) : boolean => {

        const result = AlumnoSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}

