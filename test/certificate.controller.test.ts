
import { ServerHTTP } from "../src/index"
import { AlumnoCreateInput } from "../src/validators/student.validator"
import { EspecialidadCreateInput } from "../src/validators/specialty.validator"
import { StudentService } from "../src/services/student.service"
import { SpecialityService } from "../src/services/speciality.service"
import request from 'supertest'


jest.mock('../src/services/student.service', () => ({
    StudentService: {
        getById: jest.fn(),
    }
}))

jest.mock('../src/services/speciality.service', () => ({
    SpecialityService: {
        getById: jest.fn(),
    }
}))

const appTest = ServerHTTP.getInstance()

const mockedStudentService = jest.mocked(StudentService)
const mockedSpecialityService = jest.mocked(SpecialityService)

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
    fecha_nacimiento: new Date().toISOString(),
    sexo: 'M',
    nro_legajo: 8873,
    fecha_ingreso: new Date().toISOString(),
    id_especialidad: 1
}

const speciality : EspecialidadCreateInput = {
    especialidad: 'Sistemas',
    facultad: 'FRSR',
    universidad: 'UTN',
}



describe("Certificate controller", () => {


    describe("GET /certificate/:id/pdf", () => {


        test("Should response with a 200 status code and buffer data", async () => {

            mockedStudentService.getById.mockResolvedValue(student)
            mockedSpecialityService.getById.mockResolvedValue(speciality)

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send()

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(expect.any(Buffer))

        })

        
        test("Should response with a 400 status code and error", async () => {

            const response = await request(appTest.getApp()).get('/certificate/hola/pdf').send()

            expect(response.statusCode).toBe(400)

            expect(response.body.error).toBe('El ID pasado como parámetro no corresponde a un valor entero')

        })

        test("Should response with a 404 status code and buffer data", async () => {

            mockedStudentService.getById.mockRejectedValue(new Error('El recurso con el ID solicitado no existe'))
            mockedSpecialityService.getById.mockResolvedValue(speciality)

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send()

            expect(response.statusCode).toBe(404)

            expect(response.body.error).toBe('El recurso con el ID solicitado no existe')

        })

        test("Should response with a 503 status code and buffer data", async () => {

                mockedStudentService.getById.mockRejectedValue(new Error('Fallo al solicitar información del Alumno 1'))
            mockedSpecialityService.getById.mockResolvedValue(speciality)

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send()

            expect(response.statusCode).toBe(503)

            expect(response.body.error).toBe('Fallo al solicitar información del Alumno 1')

        })

    })


    describe("GET /certificate/:id/docx", () => {

        test("Should response with a 200 status code and buffer data", async () => {

            mockedStudentService.getById.mockResolvedValue(student)
            mockedSpecialityService.getById.mockResolvedValue(speciality)

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

            mockedStudentService.getById.mockRejectedValue(new Error('El recurso con el ID solicitado no existe'))
            mockedSpecialityService.getById.mockResolvedValue(speciality)

            const response = await request(appTest.getApp()).get('/certificate/1/docx').send(student)

            expect(response.statusCode).toBe(404)

            expect(response.body.error).toBe('El recurso con el ID solicitado no existe')

        })

        test("Should response with a 503 status code and buffer data", async () => {

            mockedStudentService.getById.mockRejectedValue(new Error('Fallo al solicitar información del Alumno 1'))
            mockedSpecialityService.getById.mockResolvedValue(speciality)

            const response = await request(appTest.getApp()).get('/certificate/1/pdf').send(student)

            expect(response.statusCode).toBe(503)

            expect(response.body.error).toBe('Fallo al solicitar información del Alumno 1')

        })

    })

})