require('dotenv').config()
var express = require("express")
var app = express()
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient;

// dbConnect
const uri = 'mongodb+srv://kjmelbourne217:kartiks217@cluster0.bftkys0.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser: true})

client.connect((err) => {
     if(!err){
       console.log('Database Connected')
     }else{
       console.log('[error]',err)
     }
 });


app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

let prescriptionsCollection;
setTimeout(() => {
    prescriptionsCollection = client.db().collection("Prescriptions");
}, 500)

const getPrescriptions = (callback) => {
    prescriptionsCollection.find({}).toArray(callback);
}

app.get('/prescriptions', (req,res) => {
    getPrescriptions((err,result) => {
    if(err) {
        res.json({statusCode: 400, message: err})
    }
    else {
        res.json({statusCode: 200, message:"Success", data: result})
    }})
})

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
})