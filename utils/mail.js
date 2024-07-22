const nodemailer = require("nodemailer");
module.exports.sendMail = (to,username,Checkin,Checkout,total)=>{
    let mailer = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'wanderstay247@gmail.com',
            pass:'eplg aqfn chba rvmn',
        }
    })
    let maildetail = {
        from:"wanderstay247@gmail.com",
        to:to,
        subject:"Confirmation of Booking",
        text:`Dear ${username},

We are delighted to confirm your booking with us. Below are the details of your reservation:

Guest Name: ${username}

Check-in Date: ${Checkin.toString().split(" ").slice(1,4).join("-")}

Check-out Date: ${Checkout.toString().split(" ").slice(1,4).join("-")}

total amount to pay: ${total}

Please review the details above and let us know if there are any changes or additional requirements. We look forward to welcoming you on ${Checkin.toString().split(" ").slice(1,4).join("-")}.
Should you have any questions or need further assistance, feel free to contact us at +91 7096334652/9099756390 or reply directly to this email.

Thank you for choosing WanderStay.com. We hope you have a pleasant stay with us!

Best regards,

Aditya Solanki | Keval Chauhan
CEO & Co-Founder
WanderStay.com
wanderstay247@gmail.com`,
}
    mailer.sendMail(maildetail,function(error,result){
        if(error) throw error
        console.log("email send");
    })
}


//When Booking Are cancle then this mail is send

module.exports.cancle = (to,username)=>{
    let mailer = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'wanderstay247@gmail.com',
            pass:'eplg aqfn chba rvmn',
        }
    })
    let maildetail = {
        from:"wanderstay247@gmail.com",
        to:to,
        subject:"Confirmation of BookingConfirmation of Cancellation: Booking",
        text:`Dear ${username},

This email confirms the cancellation of your booking with WanderStay. 
Below are the details of your cancelled reservation:

Guest Name: ${username}

Your cancellation has been processed as requested. If you have any questions or need further assistance,
please feel free to contact us at +91 7096334652/9099756390.

Thank you for choosing WanderStay.com. We hope to have the opportunity to welcome you in the future.


Best regards,

Aditya Solanki | Keval Chauhan
CEO & Co-Founder
WanderStay.com
wanderstay247@gmail.com`,
}
    mailer.sendMail(maildetail,function(error,result){
        if(error) throw error
        console.log("email send");
    })
}