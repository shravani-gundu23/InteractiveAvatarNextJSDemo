export async function sendEmails(selectedCandidates: any[], editedEmails: { [id: number]: string }) {
  for (const c of selectedCandidates) {
    const email = editedEmails[c.id];
    const avatarLink = 'https://interactive-avatar-ara-demo.vercel.app/avatar'; // Replace with your actual domain
    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          subject: "Advance to Phone Screening",
           text:
            `Dear ${c.firstName} ${c.lastName},\n\n` +
            `You have advanced to phone screening!\n\n` +
            `Interact with your avatar here: ${avatarLink}\n`,
        }),
      });
      console.log(`Email sent to ${c.firstName} ${c.lastName} at ${email}`);
    } catch (error) {
      console.error(`Failed to send email to ${c.firstName} ${c.lastName}:`, error);
    }
  }
}