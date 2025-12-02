
import { EspecialidadValidator } from "../validators/specialty.validator"
import { IEspecialidad } from "../types"
import cache from "../config/redis"
import config from "../config/config"


export class SpecialityService {

    public static async getById(id : number) : Promise<IEspecialidad> {

        try{

            const cachedReply = await this.findInCache(id)

            if (cachedReply) return cachedReply

            const response = await fetch(`${config.URL_ACADEMICA}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok && response.status == 404) {
                throw new Error('El recurso con el ID solicitado no existe')
            }
            else if (!response.ok) {
                throw new Error(`Fallo al solicitar información de la especialidad ${id}`)
            }

            const speciality = await response.json()

            if (!EspecialidadValidator.check(speciality)) {
                throw new Error('La especialidad obtenida no coincide con el objeto esperado')
            }

            return speciality

        }
        catch (error : any) {
            throw new Error(error.message)
        }

    }

    private static async findInCache(id : number) : Promise<IEspecialidad | null> {
        try {
            
            const reply = await cache.get(`especialidad_${id}`)

            if(!reply){
                return null
            }

            const parsedReply = JSON.parse(reply)

            if (!EspecialidadValidator.check(parsedReply)) {
                throw new Error('La especialidad obtenida no coincide con el objeto esperado')
            }
            
            return parsedReply

        } 
        catch (error : any) {
            throw new Error(error.message)
        }
    }

}