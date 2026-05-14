import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with your email service (Resend, Mailchimp, ConvertKit, etc.)
    // For now, log the email for manual collection
    console.log('[Coming Soon] New waitlist signup:', email);

    return NextResponse.json(
      { success: true, message: 'You have been added to the waitlist.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Coming Soon] Error processing signup:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
