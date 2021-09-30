# donati_progetto_tesi

## Pre-requisites

  - have Git installed
  - have Node.js and NPM installed, latest versions
  - have Tile38 installed

## Project setup

  1. Clone codebase, **branch `develop`**
     a. `git clone ...`
     b. `git checkout -b develop origin/develop`
  3. delete *every* `node_modules` directory and `package-lock.json` file
     - there should be 1 of each in project root folder
     - 1 of each in `backend` folder
     - 1 of each in `entityPatient` folder
     - 1 of each in `entityVehicle` folder
  5. `cd` into project root folder
  6. run `npm install`
  7. `cd` into `backend` folder
  8. run `npm config set @here:registry https://repo.platform.here.com/artifactory/api/npm/maps-api-for-javascript/`
  9. run `npm install`
  10. `cd` into `entityPatient` folder (`entityVehicle` is not working atm)
  11. run `npm install`

## Run project

If everything run ok in project setup, do the following:

  1. from anywhere, run Tile38 with `tile38-server`
  2. open another shell, the `cd` into folder `backend`
  3. run `npm start`
  4. open another shell, the `cd` into folder `entityPatient` (`entityVehicle` is not working atm)
  5. run `npm start`
  6. open another shell, the `cd` into project root folder
  7. run `npm run serve`
  8. open a browser (preferably Chrome) and go to `http://localhost:8080/`

If everything run ok you should see the application running and the backend fetching data and triggering alerts.
