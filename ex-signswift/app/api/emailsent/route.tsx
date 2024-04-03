import { NextRequest, NextResponse } from "next/server";
// import Welcome from "../../emails/Welcome"
import EmailTemp from "../../emails/EmailTemp";
import { Resend } from "resend";

const resend = new Resend(process.env.EMAIL_KEY);

export async function POST(req: NextRequest) {
  // console.log(await req.json())
  const { email, subject, email_body } = await req.json();
  console.log(email);
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      // to:"ag213@snu.edu.in",
      to: email,
      subject: "EX Squared India: Full Time Job Letter",
      react: EmailTemp({ subject, email_body }),
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}
