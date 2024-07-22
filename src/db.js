const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const uri = 'mongodb+srv://chaolaolo:chaolaolo@cluster0.ng1qeww.mongodb.net/AND103'

const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
let carsModel = require('../model/carModel');

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/upload.html');
})


//== Post file 
const multer = require('multer');
const fs = require('fs');
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname;
        let newFileName = fileName;

        cb(null, newFileName);
    }
})

const upload = multer({ storage: _storage });

app.post('/uploadFile', upload.single('myFile'), async (req, res, next) => {
    let file = req.file;
    if (!file) {
        var error = new Error('cannot choose file');
        error.httpStatusCode = 400;
        return next(error);
    }
    let pathFileInServer = file.path;
    console.log(pathFileInServer);
    res.send(file);

})



// // //DELETE ONE 
// app.delete('/delete_car/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedCar = await carsModel.findByIdAndDelete(id);

//         if (!deletedProduct) {
//             return res.status(404).send('Car not found');
//         }

//         res.json({ message: 'Car deleted successfully', deletedCar });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })



// //=====Update  
// app.put('/update_car/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateData = req.body;
//         const options = { new: true };

//         const updateCar = await carsModel.findByIdAndUpdate(id, updateData, options);

//         if (!updateCar) {
//             return res.status(404).send('Car not found');
//         }

//         res.json(updateCar);
//     } catch (error) {
//         console.log(error);
//         res.status(500).send(error);
//     }
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
module.exports = app;