const express = require('express');
const {Router} = express
const {AdminModel,CourseModel} = require('../db')
const JWT = require('jsonwebtoken')
const adminAuth = require('../auth/adminAuth')


const adminRouter = Router();

adminRouter.post("/login",  async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password)  return res.status(400).send({ message: "All fields are required to Login" });

        const findUser = await AdminModel.findOne({email});

        if(!findUser) return res.status(404).send({ message: "no user found" });

        let passwordValidation = findUser.password === btoa(password) ? true : false;

        if(!passwordValidation) return res.status(404).send({ message: "wrong credentials" });
        
        const token = JWT.sign(
            { adminId: findUser._id, email: findUser.email }, 
            process.env.SECRET_KEY_ADMIN, 
            { expiresIn: '1h' }
        );

        return res.status(201).send({message : "user logged successfully", token : token});

    } catch (error) {
        return res.status(500).send({ message: error });
    }
})

adminRouter.post("/register", async (req, res) => {
    try {
        const { email, password, firstname, lastname } = req.body;
       
        if (!email || !password || !firstname || !lastname) {
            return res.status(404).send({ message: "All fields are required to register" });
        }
       
        const findUser = await AdminModel.findOne({ email });
        if (findUser) {
            return res.status(404).send({ message: "admin already exists with the same email" });
        }

      
        const hashPassword = btoa(password)
        const user = new AdminModel({
            email,
            password: hashPassword,
            firstName: firstname,
            lastName: lastname 
        });

        await user.save();
        return res.status(201).send({ message: "successfully created admin" });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})


adminRouter.post("/course/create", adminAuth, async (req, res) => {
    try {
        const {title, description, price, image, creatorId} = req.body;
        if(!title || !description) return res.status(404).send({message : "all details are required to create course"})

        const findCourse = await CourseModel.findOne({title})
        if(findCourse) return res.status(404).send({message : "course with same title already exists"})

        const newCourse = new CourseModel({
            title, description, price, imageUrl : image, creatorId
        })

        await newCourse.save();
        return res.status(201).send({message : "course created"})  
    } catch (error) {
        return res.status(404).send({message : error})        
    }
})

adminRouter.get("/course/view", adminAuth, async (req, res) => {
    try {
        const {creatorId} = req.body
        // console.log(req.body)
        const findCourse = await CourseModel.find({creatorId})

        if(findCourse.length > 0) return res.status(201).send({message: "course details", data : findCourse})
        return  res.status(201).send({message: "no course available", data : findCourse})
    } catch (error) {
        return res.status(404).send({message : error})        
    }
})


module.exports = { adminRouter}