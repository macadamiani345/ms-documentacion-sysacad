
class Hola {

    public static jaja = () => {

        try{

            console.log("hola")
            throw new Error('Nuevito')
            console.log("chau")

        }
        catch(error : any){
            throw new Error(error.message)
        }

    }

}

console.log(Hola.jaja())