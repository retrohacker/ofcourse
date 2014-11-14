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
```

## Database

We use postgresql. The easiest way to get up and running is to use the docker postgres container:

```
docker run -dp 5432:5432 postgres:9.3
```

At this point you have a default docker setup running on port 5432 of your local host. The default username is postgres as is the default database.

You will also need redis for the session keys. To do this simply run:

```
docker run -dp 6379:6379 redis:2.8.12
```


sample database insert:
  curl -X POST --header "Content-Type: application/json" -d '{"firstName":"testfirst","lastName":"testlast","university":"siu","id":1234,"email":"testemail@mytestemail.com"}' localhost:5000/v1/user
sample Events:
  insert into events (userid, id, title, number, section, start, "end") values (36,'testevent1','Test Event 1','1','1','2014-11-07','2014-11-07'),
  (36,'testevent2','Test Event 2','1','1','2014-11-08','2014-11-08'),
  (36,'testevent3','Test Event 3','1','1','2014-11-09','2014-11-09'),(36,'testevent4','Test Event 4','1','1','2014-11-10','2014-11-10'),
  (36,'testevent5','Test Event 5','1','1','2014-11-11','2014-11-11'),(36,'testevent6','Test Event 6','1','1','2014-11-12','2014-11-12'),
  (36,'testevent7','Test Event 7','1','1','2014-11-13','2014-11-14'),(36,'testevent8','Week Long Event Test','1','1','2014-11-01','2014-11-07');


## Running the tests

*REMEMBER* running the tests requires postgres to be running on your localhost. Refer to the section above.

To run the tests, simply:

```
npm test
```

## Running the code

*REMEMBER* running the code requires postgres to be running on your localhost. Refer to the section above.

```
node start.js
```

 _start.js_ will start the server, compile the server, and then watch for changes in the filesystem. When there is a change, it will recompile the server.
