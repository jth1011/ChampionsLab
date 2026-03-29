import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const type = String(formData.get("type") || "feedback").trim();
    const message = String(formData.get("message") || "").trim();
    const image = formData.get("image") as File | null;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }

    // Basic email format validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: "Message too long (max 5000 characters)." }, { status: 400 });
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (image && image.size > 0) {
      if (image.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "Image too large (max 5MB)." }, { status: 400 });
      }
      const buffer = Buffer.from(await image.arrayBuffer());
      attachments.push({ filename: image.name, content: buffer });
    }

    const emailBody = [
      `New ${type} from Champions Lab`,
      `---`,
      `Name: ${name}`,
      `Email: ${email}`,
      `Type: ${type}`,
      ``,
      `Message:`,
      message,
    ].join("\n");

    await transporter.sendMail({
      from: `"Champions Lab" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Champions Lab] ${type} from ${name}`,
      text: emailBody,
      attachments,
    });

    return NextResponse.json({ success: true, message: "Thanks for your message! We'll get back to you soon." });
  } catch (err) {
    console.error("[Contact Form Error]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
