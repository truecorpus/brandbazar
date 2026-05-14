import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, projectType } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || email.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    if (!projectType || typeof projectType !== 'string' || projectType.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Project type is required.' },
        { status: 400 }
      );
    }

    console.log('[Contact API] Payload:', JSON.stringify(body, null, 2));

    const inquiryId = `BBI-${Date.now()}`;

    return NextResponse.json({ success: true, inquiryId });
  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
