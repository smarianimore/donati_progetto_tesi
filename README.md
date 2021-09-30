# donati_progetto_tesi

## Pre-requisites

  - have Node.js and NPM installed, latest versions
  - have Tile38 installed

## Project setup

  1. Clone codebase 
  2. `cd` into project root folder
  3. run `npm install`
  4. run `npm install @vue/cli-service`
  5. `cd` into `backend`folder
  6. run `npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/
  7. run `npm install`
  8. `cd` into `entityVehicle`folder
  9. run `npm install`

## Run project

If everything run ok in project setup, do the following:

  1. from anywhere, run Tile38 with `tile38-server`
  2. open another shell, the `cd` into folder `backend`
  3. run `npm start`
  4. open another shell, the `cd` into folder `entityVehicle` (or `entityPatient`)
  5. run `npm start`
  6. open another shell, the `cd` into project root folder
  7. run `npm run serve`
  8. open a browser (preferably Chrome) and go to `http://localhost:8080/`

If everything run ok you should see the application running and the backend fetching data and triggering alerts.
