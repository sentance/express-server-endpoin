const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeMessage = (email, name)=>{
  sgMail.send({
    to: email,
    from: 'order@weblion.net',
    subject: 'Thank you for registration',
    text: `You are a genius. Good luck ${name}`
  }).then(()=>console.log('message has been sent')).catch((e)=>{
    console.log(e)
  })
}

const sendDeleteAccountMessage = (email, name)=>{
  sgMail.send({
    to: email,
    from: 'order@weblion.net',
    subject: 'Your account has been deleted :(',
    text: `Hello ${name}! Your account successful was deleted  `
  }).then(()=>{
    console.log('message has been sent')
  }).catch((e)=>{
    console.log(e)
  })
}
module.exports = {
  sendWelcomeMessage,
  sendDeleteAccountMessage
}
