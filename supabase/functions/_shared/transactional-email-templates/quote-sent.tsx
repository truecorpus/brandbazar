import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section, Row, Column } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface QuoteSentProps { quoteNumber?: string; items?: Array<{ name: string; qty: number; price: string }>; total?: string; validUntil?: string; managerName?: string }

const QuoteSentEmail = ({ quoteNumber = 'QT-2026-00001', items = [], total = '₹0', validUntil = '', managerName = 'Your Account Manager' }: QuoteSentProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Your Quote is Ready — BrandBazaar Quote #{quoteNumber}</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Your Quote is Ready! 📋</Heading>
      <Text style={text}>Quote <strong style={{ color: '#202124' }}>{quoteNumber}</strong> has been prepared for you.</Text>
      {items.length > 0 && <Section style={tableContainer}>
        <Row style={tableHeader}><Column style={thCol}>Product</Column><Column style={thColSm}>Qty</Column><Column style={thColSm}>Price</Column></Row>
        {items.map((item, i) => <Row key={i} style={tableRow}><Column style={tdCol}>{item.name}</Column><Column style={tdColSm}>{item.qty}</Column><Column style={tdColSm}>{item.price}</Column></Row>)}
        <Row style={{ ...tableRow, backgroundColor: '#F8F9FA' }}><Column style={{ ...tdCol, fontWeight: '600' as const }}>Estimated Total (incl. GST)</Column><Column /><Column style={{ ...tdColSm, fontWeight: '600' as const, color: '#202124' }}>{total}</Column></Row>
      </Section>}
      {validUntil && <Text style={text}>⏰ This quote is valid until <strong style={{ color: '#202124' }}>{validUntil}</strong></Text>}
      <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/quotes`}>View & Accept Quote</Button></Section>
      <Text style={text}>Questions? Contact {managerName} or <a href={`${SITE_URL}/#contact`} style={link}>reach out to us</a>.</Text>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: QuoteSentEmail, subject: (data: Record<string, any>) => `Your Quote is Ready — BrandBazaar Quote #${data.quoteNumber || 'QT-2026-00001'}`,
  displayName: 'Quote sent', previewData: { quoteNumber: 'QT-2026-00015', items: [{ name: 'Custom Polo Shirts', qty: 200, price: '₹58,000' }, { name: 'Branded Caps', qty: 200, price: '₹18,000' }], total: '₹89,680', validUntil: '30 April 2026', managerName: 'Priya Sharma' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const tableContainer = { margin: '16px 32px', border: '1px solid #E8EAED', borderRadius: '8px', overflow: 'hidden' as const }
const tableHeader = { backgroundColor: '#F8F9FA', padding: '10px 16px' }
const thCol = { fontSize: '12px', fontWeight: '600' as const, color: '#5F6368', textTransform: 'uppercase' as const }
const thColSm = { ...thCol, width: '70px', textAlign: 'right' as const }
const tableRow = { padding: '12px 16px', borderTop: '1px solid #E8EAED' }
const tdCol = { fontSize: '14px', color: '#202124' }
const tdColSm = { fontSize: '14px', color: '#3C4043', width: '70px', textAlign: 'right' as const }
const link = { color: '#1A73E8', textDecoration: 'none', fontWeight: '500' as const }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
