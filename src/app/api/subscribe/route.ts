import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return Response.json({ error: "Valid email is required" }, { status: 400 });
    }

    if (!resend) {
      console.log("[Subscribe] No RESEND_API_KEY set. Data:", { email });
      return Response.json({ success: true, notice: "Email not sent (Resend not configured)" });
    }

    await resend.emails.send({
      from: "Swana Gems <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "hello@swanagems.com",
      subject: "New Newsletter Subscriber",
      html: `
        <h2>New Newsletter Subscriber</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><small>Unsubscribe handling: add to your email list manually.</small></p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("[Subscribe] Error:", error);
    return Response.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
