import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      );
    }

    // Brevo API endpoint
    const brevoUrl = 'https://api.brevo.com/v3/smtp/email';

    // Email content
    const emailData = {
      sender: {
        name: name,
        email: process.env.EMAIL_USER,
      },
      to: [{
        email: 'alloulfatimazahra9@gmail.com',
        name: 'Tecserim'
      }],
      replyTo: {
        email: email,
        name: name
      },
      subject: `Nouveau message de: ${name}`,
      textContent: `
        Nom: ${name}
        E-mail: ${email}
        Message:
        ${message}
      `,
      htmlContent: `
        <h3>Nouveau message</h3>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email via Brevo API
    const response = await fetch(brevoUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY as string,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });
    const data = await response.json();
     // Log the full Brevo API response (critical for debugging)
     console.log('Brevo API Response:', JSON.stringify(data, null, 2));
     
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API error:', errorData);
      throw new Error('Failed to send email via Brevo API');
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200, headers: { "Access-Control-Allow-Origin": "*" }  }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error.message, },
      { status: 500 }
    );
  }
}