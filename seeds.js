const mongoose = require('mongoose');
const {User,Post} = require('./models/Schemas');

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
        postedBy: '634a66882c8601114fe03fd2',
        editDate: new Date(),
        title: 'My First Post',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos',
        dateposted: new Date(),
        price: 200000,
        location: 'Manila, PH',
        ratings: [
            {
                ratedBy: '634a66882c8601114fe03fd2',
                rate: 5,
                ratedDate: new Date(),
                updatedDate: new Date(),
                comment: 'Ang ganda!'
            }
        ]

    }
]

// User.insertMany(seedUsers)
//     .then(res => {
//         console.log(res);
//     })
//     .catch(e => {
//         console.log(e);
// })

Post.insertMany(seedPosts)
    .then(res => {
        console.log(res);
    })
    .catch(e => {
        console.log(e);
})
