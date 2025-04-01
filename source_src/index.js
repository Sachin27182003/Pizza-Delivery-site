// If you clone this from my github repositry you have to run a command "npm install" to terminal
// to install node_module file. it's very important for youu !!

const express = require('express');

// helps to read json file from api
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/dbConfig');
// const userRouter = require('./Routes/userRoute');
const { cartRouter, userRouter, authRouter, productRouter, getProductRouter, deleteProductRouter, orderRouter, getProductsRouter } = require('./Routes/Router');
const cors = require('cors');
// const user = require('./Schema/userSchema');


const app = express();
// app.use(cors());

app.use(cors({
    origin: "http://localhost:5173", // NO trailing slash
    // methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies if needed
}));

app.use(cookieParser());

app.use(bodyParser.json());
// helps to read json file coming from servers
app.use(bodyParser.text());
// helps to read text file coming from servers
app.use(bodyParser.urlencoded({extended: true}));
// helps to read form data coming from servers and {extended:true} helps to get complex data
// if its true it get complex data using qs library if its false it will not get any complex data

// Another alternative exist if you dont want to use body-parser you can directly use express.Json


//Routing middleware
app.use('/users', userRouter);
app.use('/carts', cartRouter);
app.use('/auth', authRouter);
app.use('/add', productRouter);
app.use('/product', getProductRouter);
app.use('/products', getProductsRouter);
app.use('/product', deleteProductRouter);
app.use('/orders', orderRouter);

app.get('/ping',(req, res)=>{
    console.log(req.body);
    console.log(req.cookies);
    return res.json({message: "pong"});
})


app.listen(serverConfig.PORT || 4000, async () => {
    await connectDB();
    console.log(`server started on port ${serverConfig.PORT}...!`);
    
})

// To start directly write "npm start" on terminal


// username : sachinsachinkumar27082003
// password: pK9yeItSxme9qxef


//  mongodb+srv://sachinsachinkumar27082003:pK9yeItSxme9qxef@cluster0.18vnj
/// .mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

// Dependencies
// npm install express nodemon dotenv mongoose bcrypt jsonwebtoken cookie-parser cloudinary multer
