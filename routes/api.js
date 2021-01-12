const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const Blogs = require('../models/blogs.js');

// get the user id from JWT token
const getUserFromToken = (req)=>{
    const token = req.cookies.jwt;
    let id ;
    if (token) {
        jwt.verify(token, 'secret code', (err, decodedToken) => {
            id = decodedToken.id;
            
        });
    } 
    console.log("id",id);
    return id;
}

// get a list of blogs from the db
router.get('/blogs', function(req, res, next){
    let author = getUserFromToken(req);

    Blogs.find({'author': author}).then(function(blogs){
       res.send(blogs);
    }).catch(next);
});

router.get('/blogs/:id', function(req, res, next){
    
    let author = getUserFromToken(req);
    let id = req.params.id;

    // find document with id 
    Blogs.findById(id, function (err, docs) { 
        if (err){ 
            console.log(err.message); 
            res.status(400).json({'error':'error in fetching'})
        } 
        else{ 
            if (docs==null){ 
                res.status(400).json({'error':'Id not found'})
                return;
            } 
            console.log("Result:", docs); 
            
            // if logged user matches with the author then return
            if(docs.author == author){
                res.status(200).json(docs)
            }
            else{
                res.status(400).json({'error':'You do not have access to retrieve document created by other users'})
            }

        } 
    }); 
});

// add a new blogs to the db
router.post('/blogs', function(req, res, next){
    let author = getUserFromToken(req);
    let obj= req.body;
    obj.author = author;
    Blogs.create(obj).then(function(blogs){
        res.send(blogs);
    }).catch(next);
});

// update a blogs in the db
router.put('/blogs/:id', function(req, res, next){
    
    let author = getUserFromToken(req);
    let id = req.params.id;

    // find document with id 
    Blogs.findById(id, function (err, docs) { 
        if (err){ 
            console.log(err.message); 
            res.status(400).json({'error':'error in fetching'})
        } 
        else{ 
            if (docs==null){ 
                res.status(400).json({'error':'Id not found'})
                return;
            } 
            console.log("Result:", docs); 
            
            // if logged user matches with the author then update
            if(docs.author == author){
                Blogs.findByIdAndUpdate({_id: req.params.id, }, req.body).then(function(){
                    Blogs.findOne({_id: req.params.id}).then(function(blogs){
                        res.send(blogs);
                    });
                }).catch(next);
            }
            else{
                res.status(400).json({'error':'You do not have access to update document created by other users'})
            }

        } 
    }); 
});

// delete a blogs from the db
router.delete('/blogs/:id', function(req, res, next){
    let author = getUserFromToken(req);
    let id = req.params.id;

    // find document with id 
    Blogs.findById(id, function (err, docs) { 
        if (err){ 
            console.log(err); 
            res.status(400).json({'error':err.message})
        } 
        else{ 
            console.log("Result : ", docs); 
            if (docs==null){ 
                res.status(400).json({'error':'Id not found'})
                return;
            } 

            // if logged user matches with the author then delete
            if(docs.author == author){
                Blogs.findByIdAndRemove({_id: req.params.id}).then(function(blogs){
                    res.send(blogs);
                }).catch(next)
            }
            else{
                res.status(400).json({'error':'You do not have access to delete document created by other users'})
            }

        } 
    }); 

});

module.exports = router;