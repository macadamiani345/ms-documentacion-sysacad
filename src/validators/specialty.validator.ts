
import * as z from "zod"


const EspecialidadSchema = z.object({
    especialidad: z.string().min(1),
    facultad: z.string().min(1),
    universidad: z.string().min(1),
}).strict()


export type EspecialidadCreateInput = z.infer<typeof EspecialidadSchema>


export class EspecialidadValidator {

    public static check = (obj : object) : boolean => {

        const result = EspecialidadSchema.safeParse(obj)

        if (!result.success) {
            return false 
        } 
        else {
            return true
        }

    }

}