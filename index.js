const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());
const port = 5000;
const data ={
    name:"prashant",
    age:21,
    gender:"male",
    nationality:"nepali",
    status:"present",
};

const heavy = {
    gender: "male",
    class : "S",
    number: 654564,
    video: "https://apivideo-demo.s3.amazonaws.com/hello.mp4",
}

app.get("/msg",(req,res)=>{

    res.send(data);
})


app.get("/heavy",(req,res)=>{
    res.send(heavy);
})


const contact_success = {
    message: "Form submitted successfully"
};

/*POST method for the contact form */
app.post("/contact",(req,res)=>{
    const data = req.body;
    console.log(data);
    res.send(contact_success)
    // res.send("Send Successfull for contact form");
});

const success = {
    msg: "Login Successfully",
    token : "superSecretToken",
};

const success1 = {
    msg: "Signed in Successfully",
    token : "superSecretToken",
};

/*For Login and its validation*/
app.post("/login",(req,res)=>{
    const data = req.body;
    if(req.body.username && req.body.password){
        if(req.body.username === "prashant@gmail.com"){    
            if(req.body.password === "helloguys"){
                res.send(success);
            }else{
                res.status(401).send("Password not matched")
            }  
        }
        else{
            res.status(404).send("User doesn't exist")
        }
        
    }else {
        res.status(422).send("Username or password missing")
    }
    
})

/*For SignUp and its validation*/
app.post("/signup", (req, res) => {
    const {username,password,confirmPassword} = req.body;
    
    // Regular expressions for username and password validation
    const usernameRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    
    if (req.body.username && req.body.password) {
        if (usernameRegex.test(req.body.username)) {
            if (passwordRegex.test(req.body.password)) {
                if (req.body.username !== "prashant@gmail.com") {
                        res.send(success1);
                } else {
                    res.status(404).send("Username already exists please try another")
                }
            } else {
                res.status(401).send("Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter")
            }
        } else {
            res.status(401).send("Invalid email format")
        }
    } else {
        res.status(422).send("Username or password missing")
    }
});

/* For Dynamic routing */

const dynamicData = [
    {name:"prashant", roll:"1"},
    {name:"sushan", roll:"2"},
    {name:"milan", roll:"3"},
    
];
console.log([dynamicData[0]])

app.get("/dynamic/:id",(req,res)=>{
   const id = req.params.id;
   if(isNaN(id)){
    res.status(442).send("Unprocessable entity")
   }else{
       if(1 <=id && id<=dynamicData.length){
        res.send(dynamicData[id-1]);
    }else{
        res.status(404).send("Data not found");
    }
   }
   
})

/* Dynamic for about page */
const dynamicAbout = [
    {name:"anish", roll:"1"},
    {name:"sushant", roll:"2"},
    {name:"sakshyam", roll:"3"},
    
];
console.log([dynamicAbout[0]])

app.get("/about/:aboutid",(req,res)=>{
    const aboutid = req.params.aboutid;
    if(isNaN(aboutid)){
     res.status(442).send("Unprocessable entity")
    }else{
        if(1 <=aboutid && aboutid<=dynamicAbout.length){
         res.send(dynamicAbout[aboutid-1]);
     }else{
         res.status(404).send("Data not found");
     }
    }
    
 })


/* --- */
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});


