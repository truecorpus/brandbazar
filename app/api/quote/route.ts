import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation
    if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!body.email || typeof body.email !== 'string' || body.email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.products) || body.products.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one product is required' },
        { status: 400 }
      );
    }

    const quoteId = `BBQ-${Date.now()}`;

    // eslint-disable-next-line no-console
    console.log('[Quote API] Received submission:', {
      quoteId,
      ...body,
    });

    return NextResponse.json({ success: true, quoteId });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
