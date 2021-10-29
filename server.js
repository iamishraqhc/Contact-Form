import express from 'express'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import db from './database.js'
import flash from 'express-flash'
import session from 'express-session'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())
app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body)

    const salutation = req.body.salutation
    const name = req.body.name
    const email = req.body.email
    const inquiry = req.body.inquiry
    const message = req.body.message

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    })

    const mailOptions = {
        sender: email,
        to: process.env.USER,
        subject: `${inquiry} by ${name} from ${email}`,
        text: message
    }
    console.log(mailOptions)

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send('error')
            return
        } else {
            console.log('Email sent')
            res.send('success')
            let sql = `INSERT INTO contact_form (salutation, name, email, inquiry, message) VALUES ("${salutation}", "${name}", "${email}", "${inquiry}", "${message}")`;
            db.query(sql, (err, result) => {
                if (err) throw err;
                console.log('record inserted');
                req.flash('success', 'Data added successfully!');
            });
        }
    })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})