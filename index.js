const express = require('express');
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const bcyrpt = require('bcrypt');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(cookieParser());

const {Post,User} = require('./models/Schemas');
//const { Session } = require('inspector');

const mongoURI = 'mongodb://localhost:27017/actvDB';
const oneDay = 1000 * 60 * 3;

mongoose.connect(mongoURI)
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    });

const store = new MongoDBSession({
    uri: mongoURI,
    collection: 'mySessions',

});

app.use(session(
    {
        secret: "actvsecret10111213",
        saveUninitialized: false,
        resave: false,
        store: store,
    }
));


let actvReviews = [
    {
        reviewedBy: 'fmdc',
        createdDate: '10/09/2022 13:02:42',
        updatedDate: '10/09/2022 13:02:42',
        reviewRate: 4.5,
        comment: 'Ang Ganda'
    }
];

const isAuth = (req, res, next) => {
    if(req.session.isAuth)
    {
        res.locals.isAuth = req.session.isAuth;
        next();
    } else {
       return res.render('actv/login');
        
    }

}

app.locals.appTitle = 'Actv';

app.get('/actv/new',isAuth,(req,res)=> {
    console.log(req.session);
    res.render('actv/new');
})

app.get('/actv/sign-up', (req, res) =>{
    res.render('actv/register');
    res.locals.isAuth = false;
})

app.get('/actv/login', (req, res) =>{
    //res.locals.isAuth = false;
    res.render('actv/login');
})

app.get('/actv/:id', async (req,res) => {
    const {id} = req.params;
    res.locals.isAuth = req.session.isAuth;
    res.locals.completeName = req.session.completeName;
    let list = await Post.findById(id);
    res.render('actv/show',{list});
})

app.put('/actv/:id', async (req,res)=> {
    const {id} = req.params;
    res.locals.isAuth = req.session.isAuth;
    const post = await Post.findByIdAndUpdate(id,req.body, {runValidators: true, new :true})
    res.redirect(`/actv/${post._id}`);
})

app.get('/actv/:id/edit',isAuth, async (req,res) => {
    const {id} = req.params;
    res.locals.isAuth = req.session.isAuth;
    const post = await Post.findById(id);
    res.render('actv/edit', {post});
})

app.get('/actv', async (req,res)=> {
    const actvList = await Post.find({});
    res.locals.isAuth = req.session.isAuth;
    res.locals.completeName = req.session.completeName;
    res.render('actv/index',{actvList});
})

app.delete('/actv/:id',isAuth, async (req, res) => {
    const {id} = req.params;
    res.locals.isAuth = req.session.isAuth;
    const deletePost = await Post.findByIdAndDelete(id);
    res.redirect("/actv");
})

app.post('/login', async (req, res) => {
    const {username,password} = req.body;
    let user = await User.findOne({username});
    
    if (!user) {
        return res.redirect('/actv/login');
    }

    let isMatch = await bcyrpt.compare(password, user.password);
    if(!isMatch){
        return res.redirect('/actv/login');
    }
    req.session.isAuth = true;
    req.session.userID = user._id;
    req.session.completeName = `${user.firstName} ${user.lastName}`;
    res.redirect("/actv");
});

app.post('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.redirect("/actv");
    });
});


app.post('/signup', async (req,res)=> {
    const {username,email,password,firstName,lastName} = req.body;
    let user = await User.findOne({username});
    
    if (user) {
         return res.redirect('/actv/sign-up');
    }
    
    const hashPass = await bcyrpt.hash(password, 12);
    
    const newUser = new User({
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
        password: hashPass
    });
    newUser.save();
    res.redirect('/actv/login');
    
});

app.post('/actv', async (req,res)=> {

    const newPost = new Post(req.body);
    newPost.dateposted = new Date();
    newPost.editDate = new Date();
    newPost.postedBy =  req.session.userID;
    await newPost.save();
    res.redirect(`actv/${newPost._id}`);     
})


app.listen(3000, () => {
    console.log("On port 3000!!!");
})
