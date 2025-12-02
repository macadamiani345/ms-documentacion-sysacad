

import http, { Server } from 'http'
import express, { Application } from "express"
import config from "./config/config"
import compression from 'compression'
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import certifcateRouter from './routes/certificate.route'


export class ServerHTTP {

    private static instance : ServerHTTP
    server : Server
    private readonly app : Application
    private readonly port : number
    private options : object

    private constructor(){
        this.setOptions()
        this.app = express()
        this.port = parseInt(config.PORT)
        this.middlewares()
        this.routes()
    }

    // aplicación del patrón de diseño singleton (una única instancia)

    public static getInstance() : ServerHTTP {

        if (!ServerHTTP.instance) {
            this.instance = new ServerHTTP()
        }

        return this.instance

    }

    private setOptions = () => {
        this.options = {
            // key: fs.readFileSync(path.join(__dirname, '../ssl/key.pem')),
            // cert: fs.readFileSync(path.join(__dirname, '../ssl/cert.pem'))
        }
    }
    
    public getApp() : Application {
        return this.app
    }

    public start() : void {
        if (!this.server && this.options) {
            try {
                this.server = http.createServer(this.app).listen(this.port, () => {
                    console.log("Servidor ejecuntandose correctamente")
                })
            } 
            catch (error : any) {
                console.log(`Error al levantar el servidor ${error}`)
            }
        }
    }

    private middlewares() : void {
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(rateLimit(config.RateLimit))
        this.app.use(helmet(config.Helmet))
    }

    private routes() : void {

        this.app.use('/certificate', certifcateRouter)

    }

    public stop() : void {
        if (this.server) {
            this.server.close()
        }
    }

}

const server = ServerHTTP.getInstance()
server.start()