import * as z from "zod"
import { isEmpty } from "../utils/objectFunctions"


const StudentInputCreateSchema = z.object({

    id: z.number().positive().min(1),
    apellido: z.string().min(1),
    nombre: z.string().min(1),
    nro_documento: z.number().positive().min(1),
    tipo_documento: z.literal("DNI"),
    fecha_nacimiento: z.iso.date(),
    sexo: z.literal(["M", "F"]),
    nro_legajo: z.number().positive().min(1),
    fecha_ingreso: z.iso.date()

}).strict()

const StudentInputUpdateSchema = z.object({

    id: z.optional(z.number().positive().min(1)),
    apellido: z.optional(z.string().min(1)),
    nombre: z.optional(z.string().min(1)),
    nro_documento: z.optional(z.number().positive().min(1)),
    tipo_documento: z.literal("DNI"),
    fecha_nacimiento: z.optional(z.iso.date()),
    sexo: z.optional(z.literal(["M", "F"])),
    nro_legajo: z.optional(z.number().positive().min(1)),
    fecha_ingreso: z.optional(z.iso.date())

}).strict()


export type StudentCreateInput = z.infer<typeof StudentInputCreateSchema>
export type StudentUpdateInput = z.infer<typeof StudentInputUpdateSchema>


export class StudentValidator {

    public static create = (obj : object) : boolean => {

        const result = StudentInputCreateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }


    public static update = (obj : object) : boolean => {

        if (isEmpty(obj)) {
            return false
        }

        const result = StudentInputUpdateSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}