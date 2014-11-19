ofcourse-backend
================

[ ![Codeship Status for wblankenship/ofcourse-backend](https://www.codeship.io/projects/bf3d7f40-2fd4-0132-3e73-2e3607fd60d8/status)](https://www.codeship.io/projects/39654)

The backend REST server for ofCourse

# Local Dev

## Creating New Model

When creating a new model.
  1.) Add the model to the array in v1/db/init.js
  2.) Create a copy of model in v1/models with the types declared (see current models for example)

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
```
  curl -X POST --header "Content-Type: application/json" -d '{"firstName":"testfirst","lastName":"testlast","university":"siu","id":1234,"email":"testemail@mytestemail.com"}' localhost:5000/v1/user
```

sample Events: 
```
  insert into parent_events (cid,start,"end") values
  (1,'2014-11-01','2014-11-29');
  insert into events (userid, title, parentid, courseid, start, "end",type) values 
  (9,'Test Event 1',1,1,'2014-11-07','2014-11-07',1),(9,'Test Event 2',1,1,'2014-11-08','2014-11-08',1),
  (9,'Test Event 3',1,1,'2014-11-09','2014-11-09',1),(9,'Test Event 4',1,1,'2014-11-10','2014-11-10',1),
  (9,'Test Event 5',1,1,'2014-11-11','2014-11-11',1),(9,'Test Event 6',1,1,'2014-11-12','2014-11-12',1),
  (9,'Test Event 7',1,1,'2014-11-13','2014-11-14',1),(9,'Week Long Event Test',1,1,'2014-11-01','2014-11-07',1);
```

sample Courses:
```
 insert into courses (university, title, number, section) values ('Southern Illinois University', 'test course 1', '1', '001'),
 ('Southern Illinois University', 'test course 2', '2', '002'),('Southern Illinois University', 'test course 5', '5', '005'),
 ('Southern Illinois University', 'test course 3', '3', '003'),('Southern Illinois University', 'test course 6', '6', '006'),
 ('Southern Illinois University', 'test course 4', '4', '004'),('Southern Illinois University', 'test course 7', '7', '007')
```

clear database:
```
  drop table courses cascade; drop table events cascade; drop table fb cascade; drop table parent_events cascade; 
  drop table universities cascade; drop table users cascade; drop table course_user cascade;
```

 
 
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
