const express = require('express');
const { OpenAI } = require('openai');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const uploadDir = 'uploads';
require ("dotenv").config()

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.get("/",async(req,res)=>{
    res.send("audio translator")
})


app.post("/translate",upload.single("audio"),  async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Provide an audio file",
                status: "error",
            });
        }
console.log(req.file.originalname)
        const transcriptions = await openai.audio.transcriptions.create({
            file: fs.createReadStream(`uploads/${req.file.originalname}`),
                
            model: "whisper-1",
        });

        console.log(transcriptions);

        res.json({
            status: 200,
            data: transcriptions,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong",
        });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server running on " + port);
});

module.exports=app