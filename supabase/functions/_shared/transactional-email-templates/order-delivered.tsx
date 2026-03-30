import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface OrderDeliveredProps { orderNumber?: string }

const OrderDeliveredEmail = ({ orderNumber = 'BB-2026-00001' }: OrderDeliveredProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Your BrandBazaar Order Has Arrived!</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Your Order Has Arrived! 🎉</Heading>
      <Text style={text}>Order <strong style={{ color: '#202124' }}>{orderNumber}</strong> has been delivered. We hope you love your custom merchandise!</Text>
      <Text style={text}>We'd love to hear your feedback — it helps us improve and helps others make confident choices.</Text>
      <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/orders`}>Leave a Review</Button></Section>
      <Text style={textCenter}>Need to reorder? <a href={`${SITE_URL}/dashboard/orders`} style={link}>View your order history →</a></Text>
      <Text style={textCenter}>Having issues? <a href={`${SITE_URL}/#contact`} style={link}>Contact support →</a></Text>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: OrderDeliveredEmail, subject: 'Your BrandBazaar Order Has Arrived!',
  displayName: 'Order delivered', previewData: { orderNumber: 'BB-2026-00042' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const textCenter = { ...text, textAlign: 'center' as const }
const link = { color: '#1A73E8', textDecoration: 'none', fontWeight: '500' as const }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
