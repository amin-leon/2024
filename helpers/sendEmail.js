import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'



const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD


const SendEmail = (email, verificationCode, subject, description, intro, name) =>{
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        }
    }

    let transporter = nodemailer.createTransport(config);

    // email template or design
    let MailGenerator = new Mailgen({
      theme: "default",
      product : {
          name: "nplcodes",
          link : 'https://mailgen.js/'
      }
  })

  // Email contents or body
  let response = {
    body: {
        name : name,
        intro: intro,
        table : {
            data : [
                {
                    data : verificationCode,
                    description: description,
                }
            ]
        },
        outro: "Looking forward!"
    }
} 

    // template and body together
    let mail = MailGenerator.generate(response);
    // Message to send
    let message = {
      from : EMAIL,
      to : email,
      subject: subject,
      html: mail
    }

    // 
    transporter.sendMail(message)

}

export default SendEmail;