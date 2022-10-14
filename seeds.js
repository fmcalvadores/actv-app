const mongoose = require('mongoose');
const {User,Post} = require('./models/Schemas');
const bcyrpt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

mongoose.connect('mongodb://localhost:27017/actvDB')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    });

const seedUsers = [
    {
        username: 'fmdc',
        email: 'email@email.com',
        password: 'Test1234',
        firstName: 'Francis',
        lastName: 'Calvadores',
        
    }
];

const seedPosts = [
    {
        //postedBy: 'Anonymous',
        editDate: new Date(),
        title: 'My First Post',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos',
        dateposted: new Date(),
        price: 200000,
        location: 'Manila, PH'

    }
]

User.insertMany(seedUsers)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
})

Post.insertMany(seedPosts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
})
