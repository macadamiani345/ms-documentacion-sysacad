
import cache from '../src/config/redis'


afterAll(async () => {
    await cache.close()
})


describe('Basic operations with redis cache database', () => {

    const data = {
        name: 'Juan Cruz',
        last_name: 'Diaz Rossi',
        age: 21
    }

    const stringData = JSON.stringify(data)


    test('Should create a new value in cache', async () => {

        const result = await cache.set('new_value', stringData, {
            EX: 30,
            NX: true
        })

        expect(result).toEqual('OK')

    })

    test('Should get the created value in cache', async () => {

        const result = await cache.get('new_value')

        expect(result).toBe(stringData)

    })

    test('Should delete the created value in cache', async () => {

        const result = await cache.del('new_value')

        expect(result).toBe(1)

    })

})