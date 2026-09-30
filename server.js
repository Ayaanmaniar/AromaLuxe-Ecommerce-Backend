const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
mongoose.connect("mongodb://localhost:27017/ministore")
    .then((
        console.log("Connected to MongoDB")
    ))

    .catch((error) => {

        console.log(error)

    })

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,

        },
        password: {
            type: String,
            required: true,
        }
    },
    {
        timeStamp: true
    }
)
// create model step-3
const User = mongoose.model("User", userSchema)
// post api step-4

app.post("/register", async (req, res) => {

    try {
        const user = await User.create(req.body)

        res.json({
            message: " User Register Successfully ",
            user: user
        })
    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: error.message,
        })
    }
});


app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
            email: email
        });
        
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        if (user.password !== password) {
            return res.status(401).json({
                message: "incorrect password"
            })
        }


        res.json({
            message: "User login Successfully",
            user: user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: message.error,
        });
    }
});

app.listen(3000, () => {
    console.log("server is runnning");
});