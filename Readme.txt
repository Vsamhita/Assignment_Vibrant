Auth APIs
--------------------------------------------

POST /signup

body
{
   "name": "Samhita",
   "email": "sam10@gmail.com",
   "phone": "7899097431",
   "password": "jsabcd"
}

description : To signup

--------------------------------------------

POST /login

body
{
   "email": "sam10@gmail.com",
   "password": "jsabcd"
}

description : To login

--------------------------------------------

GET /logout 

description : To logout 


--------------------------------------------
--------------------------------------------

blogs APIs

--------------------------------------------

POST /api/blogs

body
{
    "title": "NodeJs new 2",
    "description": "NodeJS",
    "comments": ["hi","hello"],
    
}

description : To post a blog with author as logged user

--------------------------------------------

GET /api/blogs

description : To get all the blogs posted by logged user

GET /api/blogs/:id

description : To get the blog with id and posted by logged user

--------------------------------------------

PUT /api/blogs/:id

description : To update a blog given by id and posted by logged user

--------------------------------------------

DELETE /api/blogs/:id

description : To delete a blog given by id and posted by logged user
