
import { ServerHTTP } from "../src/index"
// import { ClassRoomService } from "../../src/services/classRoom.service"
import { StudentCreateInput} from "../src/validators/student.validator"
import { CerficateService } from "../src/services/certificate.service"
import request from 'supertest'


const mockFetch = jest.fn()
global.fetch = mockFetch as any

const appTest = ServerHTTP.getInstance()

const mockedService = jest.mocked(CerficateService)

beforeAll(async () => {
    appTest.start()
})

beforeEach(async () => {
    jest.clearAllMocks()
})
        

afterAll(async () => {
    appTest.stop()
})


const student : StudentCreateInput = {
    id: 1,
    apellido: 'Diaz Rossi',
    nombre: 'Juan Cruz',
    nro_documento: 45588489,
    tipo_documento: "DNI",
    fecha_ingreso: "2022-03-01",
    sexo: 'M',
    nro_legajo: 8873,
    fecha_nacimiento: "2004-01-21"
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

            expect(response.body).toEqual(expect.any(Buffer))

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