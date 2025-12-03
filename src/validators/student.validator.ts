
import * as z from "zod"


const TipoDocumentoSchema = z.object({
    id: z.number().int().positive().min(1),
    sigla: z.literal(['DNI', 'LC', 'LE', 'CI', 'PASAPORTE']),
    nombre: z.string().min(1)
})

const AlumnoSchema = z.object({

    id: z.number().int().positive().min(1),
    apellido: z.string().min(1),
    nombre: z.string().min(1),
    nro_documento: z.number().positive().min(1),
    tipo_documento: TipoDocumentoSchema,
    fecha_nacimiento: z.iso.datetime(),
    sexo: z.literal(["M", "F"]),
    nro_legajo: z.number().positive().min(1),
    fecha_ingreso: z.iso.datetime(),
    id_especialidad: z.number().int().positive().min(1),

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

