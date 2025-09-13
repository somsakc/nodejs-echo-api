# Node.js Echo API

## Objectives
Provide quick test of echo-api deploying on container host environment or Kubernetes environment.
 * Verify connection from client into echo-api container
 * Verify HTTP/HTTPS request and echo back to the client
 * Verify bacic functionalities of replicas, readiness, liveness and others related to Kubernetes
 * Verify Prometheues metrics and exporter

## Installation
### Docker
```
docker run -p 8080:8080 --rm mbixtech/nodejs-echo-api
```

### Kubenetes
I tested on RKE2 version 1.31 with CIS profile enabled. 
```
kubectl -f kubernetes/rke2-cis-manifests.yaml
```
You may revise the manifest file with proper settings for your target Kubernetes environment.

## Quick Test
The following example is for Kubernetes environment.
```
$ curl -Lv http://nodejs-echo-api.apps.example.com | jq -r
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0*   Trying xx.xx.xx.xx:80...
* Connected to nodejs-echo-api.apps.example.com (xx.xx.xx.xx) port 80 (#0)
> GET / HTTP/1.1
> Host: nodejs-echo-api.apps.example.com
> User-Agent: curl/7.81.0
> Accept: */*
>
* Mark bundle as not supporting multiuse
< HTTP/1.1 200 OK
< Date: Sat, 13 Sep 2025 10:15:18 GMT
< Content-Type: application/json; charset=utf-8
< Content-Length: 96
< Connection: keep-alive
< X-Powered-By: Express
< ETag: W/"60-x6w9CJIrXCBnw/oYmqXEXxbJOeg"
<
{ [96 bytes data]
100    96  100    96    0     0  14620      0 --:--:-- --:--:-- --:--:-- 16000
* Connection #0 to host nodejs-echo-api.apps.example.com left intact
{
  "hostname": "nodejs-echo-api--5775cb9cf6-7hdng",
  "version": "1.0.0",
  "url": "/",
  "hits": 4631
}
```