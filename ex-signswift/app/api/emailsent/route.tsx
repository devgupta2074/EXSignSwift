import { NextRequest, NextResponse } from "next/server";
// import Welcome from "../../emails/Welcome"
import EmailTemp from "../../emails/EmailTemp";
import { Resend } from "resend";

const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_MAIL, // generated ethereal user
    pass: process.env.SMTP_PASSWORD, // generated ethereal password
  },
});

export async function POST(req: NextRequest) {
  // const { email, subject, message } = req.body;
  // console.log(email, subject, message);
  // const welcomeContent = useServerAction(() => {
  //     return <Welcome />;
  // });

  console.log("check");

  //   const emailHtml = renderTo(<Welcome />);

  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: ["ag213@snu.edu.in", "gupta.archit01@gmail.com"],
    subject: "check_multiple in main",
    // react: <Welcome />
    // html: emailHtml,
    html: " <h3>heloo</h3>",
  };

  console.log("check2");
  await transporter.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      // console.log(check3)
      console.log(error);
    } else {
      console.log("Email sent successfully!");
      return NextResponse.json("data");
    }
  });
  return NextResponse.json("data");
}

// const resend = new Resend(process.env.EMAIL_KEY);

// export async function POST(req: NextRequest) {
//   // console.log(await req.json())
//   const { email, subject, email_body } = await req.json();
//   console.log(email);
//   try {
//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev",
//       // to:"ag213@snu.edu.in",
//       to: email,
//       subject: "EX Squared India: Full Time Job Letter",
//       react: EmailTemp({ subject, email_body }),
//     });

//     return NextResponse.json(data);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error });
//   }
// }
