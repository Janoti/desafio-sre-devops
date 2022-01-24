import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('Content OK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  httpDebug: 'full',
  thresholds: {
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
    'Content OK': ['rate>0.95'],
    'ContentSize': ['value<4000'],
    'Errors': ['count<100'],
  },
};

export default function () {
  const cpf   = '2334656787823';
  const url   = 'http://host.docker.internal:';
  const compl = '5000/api/v1/users/' ;
  const res = http.get(url+compl+cpf);
  const contentOK = res.json()[0]['name'] === 'Maria' ; 

  TrendRTT.add(res.timings.duration); 
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}