
import config from './config'
import { createClient } from 'redis'

const cache = createClient({
    socket: {
        host: config.Redis.REDIS_HOST,
        port: parseInt(config.Redis.REDIS_PORT)
    },
    password: config.Redis.REDIS_PASSWORD,
    database: parseInt(config.Redis.REDIS_DB)
})


cache.on('ready', () => {
    console.log('Cliente Redis conectado exitosamente.')
})

cache.on('error', (err) => {
    console.error('Error de conexión o de comandos en Redis')
})

cache.connect().catch(err => {
    console.error('Error al intentar conectar el cliente Redis')
    process.exit(1)
})


export default cache