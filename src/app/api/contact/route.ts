import { NextResponse } from 'next/server';

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactRequestBody = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid name, email, and message.' },
        { status: 400 }
      );
    }

    const brevoUrl = 'https://api.brevo.com/v3/smtp/email';

    const emailData = {
      sender: {
        name: name,
        email: process.env.BREVO_SENDER_EMAIL,
      },
      to: [{
        email: 'alloulfatimazahra9@gmail.com', 
        name: 'Tecserim'
      }],
      replyTo: {
        email: email,
        name: name
      },
      subject: `New Contact Form Message from: ${name}`,
      textContent: `
        Name: ${name}
        Email: ${email}
        Message:
        ${message}
      `,
      htmlContent: `
        <h3>New message from your website's contact form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `,
    };

    const response = await fetch(brevoUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY as string,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', responseData);
      throw new Error(`Brevo API responded with status ${response.status}`);
    }
    return NextResponse.json(
      { message: 'Email sent successfully!', brevoResponse: responseData },
      { status: 200 }
    );

  } catch (error) {
    console.error('An error occurred in the send-email API route:', error);
    return NextResponse.json(
      { error: 'Sorry, something went wrong and we could not send your message.' },
      { status: 500 }
    );
  }
}
