const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config();


const {userRouter} = require('./routes/user')
const {adminRouter} = require('./routes/admin')

const app = express();


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/admin", adminRouter)



app.get("/", (req, res) => {
    res.json({
        message: "server is running"
    })
})




const main = async() => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(console.log("DB connceted"))
    .catch(err => console.log(err))
    const PORT = process.env.PORT || 8080
    app.listen(PORT, () => {
        console.log(`Server is runing http://localhost:${PORT}`)
    })
}
main()