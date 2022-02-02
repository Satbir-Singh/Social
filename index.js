const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');
const User = require('./models/user');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'expanded',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));
//make the upload path available to the browser
app.use('/uploads' , express.static(__dirname + '/uploads'));


app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);





//use express router
//by default routes to ./routes/index.js
// app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views');

//mongo store is used to store the
app.use(session({

    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    // ,
    // store: new MongoStore(
    //     {
    //             mongooseConnection: db,
    //             autoRemove: 'disabled'
    //     },
    //     function(err){
    //         console.log(err || 'connect-mongodb setup is ok')
    //     }
    
    // )

    // store: MongoStore.create({
    //     mongoUrls: 'mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb',
    //     // autoRemove: 'native' // Default

    // })


}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes'));





app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});