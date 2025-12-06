

import dotenv from "dotenv"

dotenv.config()

interface ConfigI {
    PORT : string
    URL_ALUMNOS : string
    URL_ACADEMICA : string
    Redis : {
        REDIS_HOST : string
        REDIS_PORT : string
        REDIS_PASSWORD : string
        REDIS_DB : string
    }
    Helmet : object
    RateLimit : object
}

const config : ConfigI = {

    PORT: process.env.PORT || '3000',
    URL_ALUMNOS: process.env.URL_ALUMNOS || '',
    URL_ACADEMICA: process.env.URL_ACADEMICA || '',
    Redis: {
        REDIS_HOST: process.env.REDIS_HOST || '',
        REDIS_PORT: process.env.REDIS_PORT || "6379",
        REDIS_PASSWORD: process.env.REDIS_PASSWORD || '',
        REDIS_DB: process.env.REDIS_DB || '0',
    },
    Helmet: {
        contentSecurityPolicy: { // Configura CSP
            directives: {
            defaultSrc: ["'self'"], // Solo permite recursos de tu propio dominio
            scriptSrc: ["'self'"], // Permite scripts de tu dominio y un CDN específico
            }
        },
        xXssProtection: true, // protección XSS del navegador 
        frameguard: { action: 'deny' }, // Asegura que tu página no pueda ser incrustada en un frame
    },
    RateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 10000
    }
    
}

export default config