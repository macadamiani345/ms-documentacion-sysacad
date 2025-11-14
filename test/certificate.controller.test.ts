


import { ServerHTTP } from "../src/index"
// import { ClassRoomService } from "../../src/services/classRoom.service"
import { StudentCreateInput, StudentUpdateInput } from "../src/validators/student.validator"
import request from 'supertest'


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



describe("Certificate controller", () => {


    describe("POST /certificate/pdf", () => {


        test("Should response with a 200 status code and buffer data", async () => {

            const student : StudentCreateInput = {
                id: 1,
                nombre: 'Juan Cruz',
                apellido: 'Diaz Rossi',
                nro_documento: 45588489,
                tipo_documento: "DNI",
                fecha_ingreso: '01-03-2022',
                sexo: 'M',
                nro_legajo: 8873,
                fecha_nacimiento: '21-01-2004'
            }

            const response = await request(appTest.getApp()).post('/certificate/pdf').send(student)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(expect.any(Buffer))

        })

        
        test("Should response with a 400 status code and error", async () => {

            const student : any = {
                id: 1,
                nombre: 'Juan Cruz',
                nro_documento: 45588489,
                tipo_documento: "DNI",
                fecha_ingreso: '01-03-2022',
                sexo: 'M',
                nro_legajo: 8873,
                fecha_nacimiento: '21-01-2004'
            }

            const response = await request(appTest.getApp()).post('/certificate/pdf').send(student)

            expect(response.statusCode).toBe(400)

            expect(response.body.error).toBe('Los datos enviados son incorrectos')

        })

    })


    describe("POST /certificate/docx", () => {


        test("Should response with a 200 status code and buffer data", async () => {

            const student : StudentCreateInput = {
                id: 1,
                nombre: 'Juan Cruz',
                apellido: 'Diaz Rossi',
                nro_documento: 45588489,
                tipo_documento: "DNI",
                fecha_ingreso: '01-03-2022',
                sexo: 'M',
                nro_legajo: 8873,
                fecha_nacimiento: '21-01-2004'
            }

            const response = await request(appTest.getApp()).post('/certificate/docx').send(student)

            expect(response.statusCode).toBe(200)

            expect(response.body).toEqual(expect.any(Buffer))

        })

        
        test("Should response with a 400 status code and error", async () => {

            const student : any = {
                id: 1,
                nombre: 'Juan Cruz',
                nro_documento: 45588489,
                tipo_documento: "DNI",
                fecha_ingreso: '01-03-2022',
                sexo: 'M',
                nro_legajo: 8873,
                fecha_nacimiento: '21-01-2004'
            }

            const response = await request(appTest.getApp()).post('/certificate/docx').send(student)

            expect(response.statusCode).toBe(400)

            expect(response.body.error).toBe('Los datos enviados son incorrectos')

        })

        // test("Should response with a 503 status code and error", async () => {

        // })

    })

})






