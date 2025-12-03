
import { ServerHTTP } from "../src/index"
import { AlumnoCreateInput } from "../src/validators/student.validator"
import request from 'supertest'


const mockFetch = jest.fn()
global.fetch = mockFetch as any

const appTest = ServerHTTP.getInstance()

beforeAll(async () => {
    appTest.start()
})

beforeEach(async () => {
    jest.clearAllMocks()
})
        

afterAll(async () => {
    appTest.stop()
})



const student : AlumnoCreateInput = {
    id: 1,
    apellido: 'Diaz Rossi',
    nombre: 'Juan Cruz',
    nro_documento: 45588489,
    tipo_documento: {
        id: 1,
        nombre: 'Documento Nacional de Identidad',
        sigla: 'DNI'
    },
    fecha_ingreso: new Date().toISOString(),
    sexo: 'M',
    nro_legajo: 8873,
    fecha_nacimiento: new Date().toISOString(),
    especialidad: {
        id: 1,
        nombre: 'Sistemas',
        letra: 'S',
        observacion: 'Ninguna',
        tipo_especialidad: 'Ingeniería',
        facultad: {
            id: 1,
            nombre: 'Facultad Regional San Rafael',
            abreviatura: 'FR San Rafael',
            directorio: 'No se',
            sigla: 'FRSR',
            codigoPostal: 'M5600',
            ciudad: 'San Rafael',
            domicilio: 'Urquiza 400',
            telefono: '2604XXXXXX',
            contacto: 'La Facultad SR',
            email: 'admin@frsr.utn.edu.com.ar',
            universidad: {
                id: 1,
                nombre: 'Universidad Tecnológica Nacional',
                sigla : 'UTN'
            }
        }
    }
}

const mockFetchSuccess = (data: any) => Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data), 
} as Response)

const mockErrorNotFound = {error: "El recurso con el ID solicitado no existe"}
const mockErrorFail = {error: "Fallo al solicitar información del Alumno 1"}

const mockFetchError = (data: any, code: number) => Promise.resolve({
    ok: false,
    status: code,
    json: () => Promise.resolve(data), 
} as Response)


describe("Certificate controller", () => {


    describe("GET /certificate/:id/pdf", () => {


        test("Should response with a 200 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchSuccess(student))

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send(student)

            console.log(response.body.error)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(expect.any(Buffer))

        })

        
        test("Should response with a 400 status code and error", async () => {

            const response = await request(appTest.getApp()).get('/certificate/hola/pdf').send(student)

            expect(response.statusCode).toBe(400)

            expect(response.body.error).toBe('El ID pasado como parámetro no corresponde a un valor entero')

        })

        test("Should response with a 404 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchError(mockErrorNotFound, 404))

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send(student)

            expect(response.statusCode).toBe(404)

            expect(response.body.error).toBe('El recurso con el ID solicitado no existe')

        })

        test("Should response with a 503 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchError(mockErrorNotFound, 500))

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send(student)

            expect(response.statusCode).toBe(503)

            expect(response.body.error).toBe('Fallo al solicitar información del Alumno 1')

        })

    })


    describe("GET /certificate/:id/docx", () => {

        test("Should response with a 200 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchSuccess(student))

            const response = await request(appTest.getApp()).get('/certificate/1/docx').send(student)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(expect.any(Object))

        })

        test("Should response with a 400 status code and error", async () => {

            const response = await request(appTest.getApp()).get('/certificate/hola/docx').send(student)

            expect(response.statusCode).toBe(400)

            expect(response.body.error).toBe('El ID pasado como parámetro no corresponde a un valor entero')

        })

        test("Should response with a 404 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchError(mockErrorNotFound, 404))

            const response = await request(appTest.getApp()).get('/certificate/1/docx').send(student)

            expect(response.statusCode).toBe(404)

            expect(response.body.error).toBe('El recurso con el ID solicitado no existe')

        })

        test("Should response with a 503 status code and buffer data", async () => {

            mockFetch.mockImplementationOnce(() => mockFetchError(mockErrorNotFound, 500))

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send(student)

            expect(response.statusCode).toBe(503)

            expect(response.body.error).toBe('Fallo al solicitar información del Alumno 1')

        })

    })

})