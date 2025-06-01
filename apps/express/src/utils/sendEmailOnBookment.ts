import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    //ON EMAIL------------------------
    user: "thenexuscourier@gmail.com",
    // --------------------------------
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendEmailOnBookment = async (
  recipentEmail: string,
  awbNumber: string,
  addressTo: any,
  boxesNumber: number
) => {
  try {
    let info = await transporter.sendMail({
      from: '"Nexus Courier" <thenexuscourier@gmail.com>',
      to: recipentEmail,
      subject: "Shipment Booking Confirmation",
      html: `
        <p>Dear Customer,</p>
        <p>We are pleased to inform you that your shipment has been successfully booked.</p>
        <div>
        <h2><strong>📍 Delivery Address:</strong> <br></h2>
            <p><strong>- Receiver Country: </strong>${addressTo.consigneeCountry}</p>
            <p><strong>- Receiver State: </strong>${addressTo.consigneeState}</p>
            <p><strong>- Receiver City: </strong>${addressTo.consigneeCity}</p>
            <p><strong>- Receiver Address1: </strong>${addressTo.consigneeAddress1}</p>
            <p><strong>- Receiver Address2: </strong>${addressTo.consigneeAddress2 ? addressTo.consigneeAddress2 : ""}</p>
            <p><strong>- ZIP Code: </strong>${addressTo.consigneeZip}</p>
            
           <h2><strong>📦 Number Of Boxes:</strong> ${boxesNumber}  </h2>
            <h2><strong>✈️ AWB Number:</strong> ${awbNumber} <h2>
        </div>
        <p>You can track your shipment using our website: 
           <a href="https://thenexuscourier.com/tracking/${awbNumber}" target="_blank">Track Shipment</a></p>
        <p>If you have any questions, feel free to contact our team.</p>
        <p>Best regards,<br>
           <strong>Nexus Courier</strong><br> 
           📧 <a href="mailto:thenexuscourier@gmail.com">thenexuscourier@gmail.com</a><br> <br>
           Office No: 01-4977771 <br> Phone: +977-9846760771 / 9869049690</p>
      `,
    });

    return true;
  } catch (error) {
    console.log("error sending email", error);
    return false;
  }
};
