const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 4444;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(port, () => {
    console.log(`We are live on port ${port}`);
});


app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

app.post('/crix-mail-api/index.js', (req, res) => {
    var data = req.body;

    var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 465,
        auth: {
            user: 'c.delriofrances@gmail.com',
            pass: 'pqvwrnqrzlfwlthp'
        }
    });

    var mailOptions = {
        from: data.email,
        to: 'c.delriofrances@gmail.com',
        subject: data.subject,
        html: `<p>${data.name}</p>
          <p>${data.email}</p>
          <p>${data.message}</p>`
    };

    smtpTransport.sendMail(mailOptions,
        (error, response) => {
            if (error) {
                res.send(error)
            } else {
                res.send('Success')
            }
            smtpTransport.close();
        });

})
