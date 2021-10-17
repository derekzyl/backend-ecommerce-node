const express = require('express');
const app = express();
const bodyParser = require('body-parser');
  const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const productRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories')
const userRouter =require('./routes/users');
const authJwt = require('./helpers/jwt')

require('dotenv/config');
const api = process.env.API_URL



//middleware

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(authJwt);

// routers
app.use(`${api}/products**es**`, productRouter);

app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/users`, userRouter);

// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);




const uri = process.env.LONG

mongoose.connect(uri,{
dbName:'myFirstDatabase',
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(()=>{ console.log('database working')})
.catch((err)=>{ console.log(err)}) 
 

PORT = 3007
 app.listen(PORT, ()=>{ console.log(`app is listening to port ${PORT}`) })
 