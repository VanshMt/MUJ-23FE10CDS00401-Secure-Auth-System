// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, text) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     });

//     // const mailOptions = {
//     //   from: process.env.EMAIL_USER,
//     //   to,
//     //   subject,
//     //   text
//     // };

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text
//     });

//     console.log("📧 Email sent successfully");
//   } catch (err) {
//     console.log("❌ Email error:", err);
//   }

//   //const verifyLink = `http://localhost:3000/auth/verify-email/${verifyToken}`;

//   await sendEmail({
//     to: user.email,
//     subject: "Verify your email",
//     text: `Click to verify:\n\n${verifyLink}`
// });
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text
    });

  } catch (err) {
    // Previous behavior swallowed the failure; retained disabled so delivery errors reach the route:
    // console.log("Email error:", err);
    console.error("Email delivery failed:", err.message);
    throw new Error("Email delivery failed");
  }
};

module.exports = sendEmail;
