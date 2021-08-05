const sgMail = require('@sendgrid/mail')
const sendGridApi = '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'

sgMail.setApiKey(sendGridApi)

const msg = {
    to: 'sentance22@gmail.com', // Change to your recipient
    from: 'order@weblion.net', // Change to your verified sender
    subject: 'Thank\'s for your attention',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>Another purchate to mickle</strong>',
  }
// sgMail.send(msg)
//     .then(() => {
//       console.log('Email sent')
//     })
//     .catch((error) => {
//       console.error(error)
//     })
const sendWelcomeMessage = (email, name)=>{
  sgMail.send({
    to: email,
    from: 'order@weblion.net',
    subject: 'Thank you for registration',
    text: `You are a genius. Good luck ${name}`
  }).then(()=>{
    console.log('message has been sent')
  }).catch((e)=>{
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