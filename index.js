const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.get('/',()=>{
    resizeBy.send('welcome to my forma')
})

app.post('/api/forma',(req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'phuongthuy.npt.nts@gmail.com',
            pass: 'Thuy0941418110'
        }
    });
    
    let mailOption={
        form:data.email,
        to: 'phuongthuy.npt.nts@gmail.com',
        subject: `Message from ${data.name}`,
        html:`
        
        <h3>Information</h3>
        <ul>
        <li>Name: ${data.name}<li>
        <li>Phone: ${data.phone}<li>
        <li>Email: ${data.email}<li>
        </ul>

        <h3>Message</h3>
        <p>${data.message}</p>
        `
    };

    smtpTransport.sendMail(mailOption,(error,response)=>{

        if(error){
            res.send(error)
        }
        else{
            res.send('Success')
        }
    })

    smtpTransport.close();
})

const PORT = process.env.PORT||3001;
app.listen(PORT,()=>{
    console.log(`server starting at a port ${PORT}`)
})