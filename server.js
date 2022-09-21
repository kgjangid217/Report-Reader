var express = require("express")
var app = express()
var cors = require('cors')
let formCollection; 

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())


//add database connection...
const uri = "mongodb+srv://kjmelbourne217:kartiks217@cluster0.bftkys0.mongodb.net/?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb')
const client = new MongoClient(uri, {useNewUrlParser: true})

//create collection....
const createCollection = () => {
    client.connect(function (err,db) {
        formCollection =  client.db().collection("Form");
        if(!err) {
            console.log('MongoDB Connected')
        }
        else {
            console.log("DB Error: ", err);
            process.exit(1);
        }
    })
}

//insert project......
const insertProjects = (project, callback) => {
    formCollection.insert(project,callback);
}

// post api....
app.post('/api/form',(req,res) => {
    console.log("Form init", req.body)
    var formData = req.body;

    if(formData.first_name == "" || formData.last_name == "" || formData.password == "" || formData.email == "") {
        console.log("invalid form data");
        return res.status(400).json({message: "invalid form data! Enter all fields."});
    }

    insertProjects(formData,(err,result) => {
        if(err) {
            console.log("form submit in db error");
            res.status(400).json({message: err})
        }
        else {
            console.log("form submit in db success");
            res.status(200).json({message:"Form added to DB successfully", data: result})
        }
    })
})

var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port)
    createCollection()
})