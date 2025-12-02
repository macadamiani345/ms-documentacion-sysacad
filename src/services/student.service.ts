
import { StudentValidator } from "../validators/student.validator"
import { IAlumno } from "../types"
import config from "../config/config"


export class StudentService {

    public static async getById(id: number) : Promise<IAlumno> {
            
        try{

            const response = await fetch(`${config.URL_ALUMNOS}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok && response.status == 404) {
                throw new Error('El recurso con el ID solicitado no existe')
            }
            else if (!response.ok) {
                throw new Error(`Fallo al solicitar información del Alumno ${id}`)
            }

            const student = await response.json()

            if (!StudentValidator.check(student)) {
                throw new Error('El estudiante obtenido no coincide con el objeto esperado')
            }

            return student

        }
        catch (error : any) {
            throw new Error(error.message)
        }
    }

}