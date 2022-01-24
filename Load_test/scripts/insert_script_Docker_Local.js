import http from 'k6/http';

export const options = {
    stages: [
      { duration: '30s', target: 1000 },
      { duration: '1m30s', target: 2000 },
      { duration: '20s', target: 10 },
    ],
    thresholds: {
      http_req_failed: ['rate<0.01'], // http errors should be less than 1%
      http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
    },
  };

export default function () {
    const url = 'http://host.docker.internal';
    const compl = ':5000/api/v1/users'
    const payload = JSON.stringify({
      name: 'Test_k6',
      last_name: 'Sobrenome',
      cpf: '11233233213',
      email: 'k6tests@email.com',
      birthdate: '19/01/1989',
    });
  
    const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };


    http.post(url+compl, payload, params);
}
 