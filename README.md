ofcourse-backend
================

[ ![Codeship Status for wblankenship/ofcourse-backend](https://www.codeship.io/projects/bf3d7f40-2fd4-0132-3e73-2e3607fd60d8/status)](https://www.codeship.io/projects/39654)

The backend REST server for ofCourse

# Local Dev

## Checking out the source code

```
git clone --recursive git@github.com:wblankenship/ofcourse-backend backend
cd backend
npm install
cd frontend
npm install
cd ../
```

## Running the tests

Running the tests requires that you have a local mock setup that mirrors our heroku setup. We have built a docker container to accomplish this.

If you do not already have docker installed, consult [this tutorial](http://docs.docker.com/installation/).

Run CI tests locally with:

```
docker run -itv ${PWD}:/usr/src/app wblankenship/npg
```

The output should look something like this:

```
Pulling repository wblankenship/npg
688665fcb7e6: Download complete
511136ea3c5a: Download complete
5a7d9470be44: Download complete
feb755848a9a: Download complete
5cdb6235f0cd: Download complete
e91212685ca9: Download complete
bf87011928f2: Download complete
2e9094567fe1: Download complete
daed94b672eb: Download complete
71ad11502cd4: Download complete

[ ok ] Starting PostgreSQL 9.3 database server: main.

> ofCourse-backend@0.0.0 test /usr/src/app
> mocha

  ✓ should pass

  1 passing (8ms)
```

## Running the code

Pretty much the exact same as running the tests, but instead you pass a command to the container:

```
docker run -itv ${PWD}:/usr/src/app wblankenship/npg npm start
```
