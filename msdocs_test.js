import http from 'k6/http';
import { Trend, Counter } from 'k6/metrics';
import { check } from 'k6';

const statusTrend = new Trend('status_codes');
const successCounter = new Counter('successful_requests');
const errorCounter = new Counter('error_requests');

export const options = {
    //Para los alumnos que siguen prefiriendo Windows 11 es posible que tengan que descomentar insecureSkipTLSVerify (https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/)
    insecureSkipTLSVerify: true,
    stages: [
        { duration: "10s", target: 100 },
        { duration: "20s", target: 100 },
        { duration: "10s", target: 0 },
    ],
};

export default function () {
    //Tienen que modificar la url que quieren probar
    const BASE_URL = 'https://msdocs.sysacad.localhost/certificate/1/docx';

    //Para probar con post enviando un json, no es el caso para los proyectos de ustedes
    const payload = JSON.stringify({});
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    //Creo que para todos los proyectos es get
    const res = http.get(`${BASE_URL}/`, payload, params);
    
    statusTrend.add(res.status);

    const isSuccess = check(res, {
        'response is valid': (r) => [200, 404].includes(r.status),
        'no server errors': (r) => r.status < 500,
    });

    // Usar isSuccess para contadores
    if (isSuccess) {
        successCounter.add(1);
    } else {
        errorCounter.add(1);
        // Opcional: log para debugging
        console.log(`Error: status=${res.status}, res=${res.body}`);
    }


}