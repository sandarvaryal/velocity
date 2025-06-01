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

export const sendEmailOnDelivered = async (
  recipentEmail: string,
  awbNumber: string
) => {
  try {
    let info = await transporter.sendMail({
      ///on EMAIL-------------------
      from: "Nexus Courier",
      //-------------------------------
      to: recipentEmail,
      subject: "Shipment Delivered",
      text: `Your shipment has been delivered. AwbNumber number: ${awbNumber}`,
    });
    return true;
  } catch (error) {
    console.log("error sending email", error);
    return false;
  }
};
