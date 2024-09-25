const express = require('express');
const {Router} = express
const {UserModel, PurchaseModel, CourseModel} = require('../db')
const JWT = require('jsonwebtoken')
const userAuth = require('../auth/userAuth')


const userRouter = Router();



/*
    * Status Code Examples
    *   @successful - 201
    *   @not found - 404
    *   @error  - 500
*/


userRouter.post("/login", async (req, res) => {
    try {
        console.log(req.body.userDetails)
        const {email, password} = req.body.userDetails;

        if(!email || !password)  return res.status(400).send({ message: "All fields are required to Login" });

        const findUser = await UserModel.findOne({email});

        if(!findUser) return res.status(404).send({ message: "no user found" });

        let passwordValidation = findUser.password === btoa(password) ? true : false;

        if(!passwordValidation) return res.status(404).send({ message: "wrong credentials" });
        
        const token = JWT.sign(
            { userId: findUser._id, email: findUser.email }, 
            process.env.SECRET_KEY, 
            { expiresIn: '1h' }
        );

        return res.status(201).send({message : "user logged successfully", token});

    } catch (error) {
        return res.status(500).send({ message: error });
    }
})

userRouter.post("/register", async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body.userDetails;
       
        if (!email || !password || !firstName || !lastName) {
            return res.status(404).send({ message: "All fields are required to register" });
        }
       
        const findUser = await UserModel.findOne({ email });
        if (findUser) {
            console.log(findUser)
            return res.status(404).send({ message: "User already exists with the same email" });
        }

      
        const hashPassword = btoa(password)
        const user = new UserModel({
            email,
            password: hashPassword,
            firstName,
            lastName
        });

        await user.save();
        console.log(user)
        return res.status(201).send({ message: "Successfully created user" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});
userRouter.get("/details", userAuth, async (req, res) => {
    // console.log(req.body)
    try {
        const {userId} = req.body
        const findUser = await UserModel.findOne({userId})
        console.log(findUser)
        if(!findUser) return res.status(404).send({message : "no user found"})
        return res.status(201).send({message : "user found", data : findUser})
    } catch (error) {
        return res.status(404).send({message : error})        
    }  
})

userRouter.get("/course/view", userAuth, async (req, res) => {
    
    try {
        // const {userId} = req.body
        const findPurchaseCourse = await PurchaseModel.find({userId})
        const findCourse = await CourseModel.find().populate('creatorId', 'firstName lastName email');
        if(findCourse.length > 0) return res.status(201).send({message : "success", data : findCourse})
        return res.status(404).send({message : "no course found"})
    } catch (error) {
        return res.status(404).send({message : error})        
    }  
})



userRouter.get("/course/mycourse", userAuth, async (req, res) => {
   try {
    const {userId} = req.body
    const findCourse = await PurchaseModel.find({userId}).populate('courseId', 'title description price imageUrl creatorId')

    if(findCourse.length > 0) return res.status(201).send({message : "user courses", data : findCourse});
    return res.status(404).send({message : "no courses available"});

   } catch (error) {
    return res.status(201).send({message :error});    
   }    
});


userRouter.post("/course/buy", userAuth, async (req, res) => {
    try {
        const {userId, courseId} = req.body
        findCourse = await PurchaseModel.findOne({userId, courseId})
        if(findCourse) return res.status(404).send({message : "course already purchased"});
    
     const myCourse = new PurchaseModel({
        userId,
        courseId
     })

     await myCourse.save();
     return res.status(201).send({message : "course purchases successful"}); 

    } catch (error) {
     return res.status(201).send({message :error});    
    }    
 });

 

module.exports = { userRouter}