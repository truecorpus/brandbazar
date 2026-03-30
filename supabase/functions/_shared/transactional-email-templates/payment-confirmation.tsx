import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface PaymentConfirmationProps { orderNumber?: string; amount?: string; transactionId?: string; invoiceNumber?: string }

const PaymentConfirmationEmail = ({ orderNumber = 'BB-2026-00001', amount = '₹0', transactionId = '', invoiceNumber = '' }: PaymentConfirmationProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Payment Received — {invoiceNumber ? `Invoice #${invoiceNumber}` : `Order #${orderNumber}`} | BrandBazaar</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Payment Received ✅</Heading>
      <Text style={text}>Thank you! Your payment has been successfully processed.</Text>
      <Section style={detailsBox}>
        <Text style={detailRow}>💰 Amount: <strong>{amount}</strong></Text>
        <Text style={detailRow}>📦 Order: <strong>{orderNumber}</strong></Text>
        {transactionId && <Text style={detailRow}>🔢 Transaction ID: <strong>{transactionId}</strong></Text>}
        {invoiceNumber && <Text style={detailRow}>🧾 Invoice: <strong>{invoiceNumber}</strong></Text>}
      </Section>
      <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/orders`}>View Order & Download Invoice</Button></Section>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: PaymentConfirmationEmail,
  subject: (data: Record<string, any>) => `Payment Received — ${data.invoiceNumber ? `Invoice #${data.invoiceNumber}` : `Order #${data.orderNumber || 'BB-2026-00001'}`} | BrandBazaar`,
  displayName: 'Payment confirmation', previewData: { orderNumber: 'BB-2026-00042', amount: '₹23,010', transactionId: 'pay_LmN8xKjP2qR5', invoiceNumber: 'INV-2026-00042' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const detailsBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '8px' }
const detailRow = { fontSize: '14px', color: '#3C4043', margin: '0 0 8px', lineHeight: '1.5' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
