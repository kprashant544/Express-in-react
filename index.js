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


 /* Post for the react hook form  */

 const form_success = {
    message: "Form submitted successfully haii"
};
// Route for form submission (replace with your actual form endpoint)
app.post("/reacthookform",(req,res)=>{
    const data = req.body;
    console.log(data);
    // res.send(form_success)
    // res.send("Send Successfull for react hook form");

    const errors = []; // Array to store error messages
  
    const { name, email, password, gender, hobbies, message } = req.body;
  
    // Name validation
    if (!name || name.trim() === '') {
      errors.push('Name is required');
    }
  
    // Email validation (basic check)
    if (!email || !email.includes('@') || !email.includes('.')) {
      errors.push('Invalid email format');
    }
  
    // Password validation (basic check)
    if (!password || password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
  
    // Gender validation
    if (!gender || !['male', 'female', 'other'].includes(gender)) {
      errors.push('Invalid gender');
    }
  
    // Hobbies validation (basic check)
    // if (!hobbies || hobbies.length === 0) {
    //   errors.push('Select at least one hobby');
    // }
  
    // Message validation
    if (!message || message.trim() === '') {
      errors.push('Message is required');
    }
  
    if (errors.length > 0) {
      // Send bad request with error messages
      return res.status(400).json({ errors });
    }
  
    // Process validated form data
    console.log(`Name: ${name}, Email: ${email}, Password: ${password} (hidden)`);
    console.log(`Gender: ${gender}, Hobbies: ${hobbies}, Message: ${message}`);
  
    // res.send({ message: 'Form submitted successfully!' });
    res.send(data);
  });




/* GET method for table in form */
const detailsTable = [
    {name:"peter", roll:"101", grade: "A"},
    {name:"ben", roll:"202", grade : "B+"},
    {name:"sid", roll:"303", grade : "A+"},
    {name:"hulk", roll:"404", grade : "C+"},
    {name:"tommy", roll:"505", grade : "B+"},
    {name:"mike", roll:"606", grade : "A"},
    {name:"john", roll:"707", grade : "B"},

    
];
console.log([detailsTable[0]])

app.get("/tableData",(req,res)=>{
   
  res.send(detailsTable);
    
 })

 /* GET method for material-react-table*/

const matTable = [
    {
      name: {
        firstName: "John",
        lastName: "Doe",
      },
      address: "261 Erdman Ford",
      city: "East Daphne",
      state: "Kentucky",
    },
    {
      name: {
        firstName: "Jane",
        lastName: "Doe",
      },
      address: "769 Dominic Grove",
      city: "Columbus",
      state: "Ohio",
    },
    {
      name: {
        firstName: "Joe",
        lastName: "Doe",
      },
      address: "566 Brakus Inlet",
      city: "South Linda",
      state: "West Virginia",
    },
    {
      name: {
        firstName: "Kevin",
        lastName: "Vandy",
      },
      address: "722 Emie Stream",
      city: "Lincoln",
      state: "Nebraska",
    },
    {
      name: {
        firstName: "Joshua",
        lastName: "Rolluffs",
      },
      address: "32188 Larkin Turnpike",
      city: "Charleston",
      state: "South Carolina",
    },
  ];

  console.log([matTable[0]])

  app.get("/mattable",(req,res)=>{
     
    res.send(matTable);
      
   })

/* --- */
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
});


