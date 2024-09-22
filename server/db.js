const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin' 
    }
});

const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
});

const purchaseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course' 
    }
});


const UserModel = mongoose.model('User', userSchema);
const AdminModel = mongoose.model('Admin', adminSchema);
const CourseModel = mongoose.model('Course', courseSchema);
const PurchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchaseModel
};
