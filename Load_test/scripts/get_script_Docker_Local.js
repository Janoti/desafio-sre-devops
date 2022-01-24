import http from 'k6/http';
import { check } from "k6";
export let options = {
  stages: [
      // Ramp-up from 1 to 5 VUs in 5s
      { duration: "5s", target: 5 },
      // Stay at rest on 5 VUs for 10s
      { duration: "10s", target: 5 },
      // Ramp-down from 5 to 0 VUs for 5s
      { duration: "5s", target: 0 }
  ]
};

export default function () {
  const url = "http://host.docker.internal:"
  const res = http.get(url+'5000/api/v1/users', {headers: {Accepts: "application/json"}});
  check(res, { 'status was 200': (r) => r.status == 200 });
};
