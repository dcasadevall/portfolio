import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { PDFTemplate } from './PDFTemplate';
import React from 'react';
import { person } from '@/app/resources/content';

export async function GET() {
    try {
        // Generate PDF
        const pdfBuffer = await renderToBuffer(React.createElement(PDFTemplate));

        // Return the PDF with appropriate headers
        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${person.name}'s Resume.pdf"`,
            },
        });
    } catch (error) {
        console.error('PDF generation failed:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
} 