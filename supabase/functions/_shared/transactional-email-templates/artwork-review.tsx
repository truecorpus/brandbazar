import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface ArtworkReviewProps { orderNumber?: string; itemName?: string; status?: 'approved' | 'revision_needed'; reviewerNotes?: string }

const ArtworkReviewEmail = ({ orderNumber = 'BB-2026-00001', itemName = 'Custom T-Shirts', status = 'approved', reviewerNotes = '' }: ArtworkReviewProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Your Artwork Has Been {status === 'approved' ? 'Approved' : 'Reviewed'} — Order #{orderNumber}</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>{status === 'approved' ? 'Artwork Approved ✅' : 'Artwork Needs Revision ✏️'}</Heading>
      <Text style={text}>Order: <strong style={{ color: '#202124' }}>{orderNumber}</strong></Text>
      <Text style={text}>Product: <strong style={{ color: '#202124' }}>{itemName}</strong></Text>
      {status === 'approved' ? (
        <Section style={successBox}><Text style={successText}>Your artwork has been approved! Production will begin shortly.</Text></Section>
      ) : (
        <><Section style={warningBox}><Text style={warningText}>Our design team has reviewed your artwork and requires some changes before production can begin.</Text>
          {reviewerNotes && <Text style={{ ...warningText, marginTop: '8px', fontStyle: 'italic' }}>"{reviewerNotes}"</Text>}</Section>
          <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/artwork`}>Upload New Artwork</Button></Section></>
      )}
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: ArtworkReviewEmail,
  subject: (data: Record<string, any>) => `Your Artwork Has Been ${data.status === 'approved' ? 'Approved' : 'Reviewed'} — Order #${data.orderNumber || 'BB-2026-00001'}`,
  displayName: 'Artwork review result', previewData: { orderNumber: 'BB-2026-00042', itemName: 'Branded Polo Shirts', status: 'revision_needed', reviewerNotes: 'Logo resolution is too low. Please upload a vector file (AI/EPS/SVG) at 300 DPI minimum.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 12px' }
const successBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#E6F4EA', borderRadius: '8px', border: '1px solid #A8DAB5' }
const successText = { fontSize: '14px', color: '#137333', margin: '0' }
const warningBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFE082' }
const warningText = { fontSize: '14px', color: '#5D4037', margin: '0' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
