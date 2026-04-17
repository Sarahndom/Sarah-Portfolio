import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from:    "SarahPortfolio <onboarding@resend.dev>",
      to:      ["sarahndom620@gmail.com"],
      subject: `New portfolio message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family:sans-serif;line-height:1.6;max-width:600px">
          <h2 style="color:#1d4ed8">New Contact Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f1f5f9;padding:1rem;border-radius:8px">${message}</p>
        </div>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}