import { sendEmail } from "@/lib/nodemailer/mailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
    const { to, subject, html } = await req.json();

        await sendEmail(to, subject, html);
        return NextResponse.json({ message: 'Email sent successfully' }, {status : 200});
     
    } catch (error: any) {
      // Return an error message if something goes wrong
      return NextResponse.json(
        { message: "An error has occurred: " + error.message },
        { status: 500 }
      );
    }
  }