
# node-server
## A simple CRUD Nodejs server that connects to a free mongodb Atlas account using express and mongoose

To use this: sign up for MongoDB Atlas, and open a cluster.
Get the URL for the cluster: Connect button -> Connect Your Application -> then copy the Connection String URL

Create a config.js file at the root of this project with the following text:
```
module.exports = {
    url: '<insert YOUR Connection String URL Here and remove the greaterthanlessthan signs>',
    serverport: 3000
}
```

at the command line, type
```
node server.js
```
it should say it is listening on port 3000

To test, open postman, and while the server is running on port 3000 you can do the following things:

POST to `localhost:3000/app`
In the POST Body, place the JSON necessary for an application such as:
`{"first_name": "John", "last_name": "Doe", "birth_date": "03/12/1964", "email": "johndoe@gmail.com"}`

You should see a return of the object in postman, and the console.log of the object at the command line.  Do this a few more times, then
run a 
GET to `localhost:3000/app`
and it should return all the applications you entered.

To GET a single application, copy the applicationId from one that you POSTed, and put it in the URL as so:
`localhost:3000/app/93h39jfi9hi0-jhei`

Just change the `93h39jfi9hi0-jhei` to whatever an applicationId is from one you created.

You may also edit a single application with a PUT, and include the applicationId in the URL, and it should change the database.
PUT `localhost:3000/app/93h39jfi9hi0-jhei`
Insert JSON in the body of the request, then send.  Record updated.

Delete a single application?  You guessed it, use the applicationID in the URL and send a DELETE request.  It should no longer be in the database.

localhost:3000/product should also POST, PUT, GET, and DELETE.  See the schema for JSON object creation necessary for POSTing and PUTting.

Create your own schema, controller, and routes,  (don't forget to add the route file to server.js), and you should be able to save whatever you want!
