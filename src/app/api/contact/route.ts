import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return Response.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    // If Resend is not configured, simulate success
    if (!resend) {
      console.log("[Contact] No RESEND_API_KEY set, skipping email. Data:", { name, email, message });
      return Response.json({ success: true, notice: "Email not sent (Resend not configured)" });
    }

    await resend.emails.send({
      from: "Swana Gems <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@swanagems.com",
      subject: `New Contact Inquiry from ${name}`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Contact] Error:", error);
    return Response.json({ error: "Failed to send message" }, { status: 500 });
  }
}
