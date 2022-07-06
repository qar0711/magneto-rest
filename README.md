[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# api_xmen
## _API useful by magneto to looking for titans_
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).


## Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:8080/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.

Or if you want to test the API, use the next endpoint deployed 

GET: https://magneto-api-node-js-1-6ujbcrxg2q-uc.a.run.app/api/stats

POST: https://magneto-api-node-js-1-6ujbcrxg2q-uc.a.run.app/api/mutant

#### Validate if some dna  is mutant
[POST] /api/mutant
Request:
```
  {
    "dna" : [["ATGCGA"],["JAGGYC"],["YCAYPT"],["QADAGG"],["CACCTG"],["JCACTG"],["TCGQGG"]]
  }
```
Response:
***Is mutant***: HTTP 200-OK
***Is human***: HTTP 403-Forbidden


#### statistics and checks
[GET] /api/stats
Response:
```
  {
    "count_mutant_dna": 9,
    "count_human_dna": 8,
    "ratio": 1.125
  }
```

## Database
- **db.mixin**: Set `MONGO_URI` environment variables with your mongo host

## Useful links

* Moleculer website: https://moleculer.services/
* Moleculer Documentation: https://moleculer.services/docs/0.14/
* Project Documentation: https://docs.google.com/document/d/1aTesZ8vKlqCrMa99lL9NVH68vDt017WK/edit?usp=sharing&ouid=110238250355506866993&rtpof=true&sd=true

## Coverage Test

* over 84%


File                | % Stmts | % Branch | % Funcs | % Lines | 
--------------------|---------|----------|---------|---------|
All files           |   91.35 |    84.21 |     100 |   90.78 |
 mixins             |      75 |       50 |     100 |      75 |
 db.mixin.js        |      75 |       50 |     100 |      75 | 
 services           |   95.38 |    90.62 |     100 |      95 |
 helper.service.js  |      96 |    92.85 |     100 |   95.65 | 
 mutant.service.js  |   93.33 |       75 |     100 |   92.85 | 


## NPM scripts

- `first`: Select magneto folder!

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run start`: Start production mode (set `SERVICES` env variable to load certain services)
- `npm run cli`: Start a CLI and connect to production. Don't forget to set production namespace with `--ns` argument in script
- `npm run lint`: Run ESLint
- `npm run ci`: Run continuous test mode with watching
- `npm test`: Run tests & generate coverage report

