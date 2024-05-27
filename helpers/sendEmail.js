import nodemailer from 'nodemailer'
import Mailgen from 'mailgen'



const EMAIL = process.env.EMAIL
const PASSWORD = process.env.PASSWORD


const SendEmail = (email, verificationCode) =>{
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
        name : "Leon",
        intro: "Your Account have been created, copy the code to verify your account!",
        table : {
            data : [
                {
                    code : verificationCode,
                    description: "Verification code",
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
      subject: "Comfirm registration",
      html: mail
    }

    // 
    transporter.sendMail(message)

}

export default SendEmail;