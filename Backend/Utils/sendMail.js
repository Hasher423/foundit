import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (email, founderEmail) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Match Found",
      text: `Hello,

We have identified a potential match for the lost item you reported. 
You may contact the finder directly at ${founderEmail} to confirm the details and take the next steps.

Best regards,
The FindIt Team`,
    });
    console.log("Email sent: ", info.response);
    return info;
  } catch (err) {
    console.error("Error sending email: ", err);
    throw err;
  }
};
