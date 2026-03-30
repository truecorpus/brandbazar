import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface ProductionStartedProps { orderNumber?: string; expectedDate?: string }

const ProductionStartedEmail = ({ orderNumber = 'BB-2026-00001', expectedDate = '15 April 2026' }: ProductionStartedProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>We're Printing Your Order! #{orderNumber} is Now in Production</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Production Has Started! 🏭</Heading>
      <Text style={text}>Your order <strong style={{ color: '#202124' }}>{orderNumber}</strong> is now in production. Our team is working to deliver quality merchandise.</Text>
      {expectedDate && <Section style={infoBox}><Text style={infoText}>📅 Expected completion: <strong>{expectedDate}</strong></Text></Section>}
      <Text style={text}>We'll notify you as soon as your order is ready to ship.</Text>
      <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/orders`}>Track Your Order</Button></Section>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: ProductionStartedEmail, subject: (data: Record<string, any>) => `We're Printing Your Order! #${data.orderNumber || 'BB-2026-00001'} is Now in Production`,
  displayName: 'Production started', previewData: { orderNumber: 'BB-2026-00042', expectedDate: '15 April 2026' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const infoBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#E8F0FE', borderRadius: '8px', border: '1px solid #C2D9FC' }
const infoText = { fontSize: '14px', color: '#174EA6', margin: '0' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
