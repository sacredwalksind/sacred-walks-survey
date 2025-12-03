import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
      throw new Error('Google Sheets URL not configured');
    }

    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow'
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Google Sheets error:', result);
      throw new Error('Failed to save to Google Sheets');
    }
    
    return NextResponse.json({ 
      success: true
    });
  } catch (error) {
    console.error('Error submitting survey:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit survey' },
      { status: 500 }
    );
  }
}