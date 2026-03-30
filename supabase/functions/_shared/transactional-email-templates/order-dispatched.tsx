import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface OrderDispatchedProps { orderNumber?: string; courierName?: string; trackingNumber?: string; trackingUrl?: string; address?: string; expectedDate?: string }

const OrderDispatchedEmail = ({ orderNumber = 'BB-2026-00001', courierName = 'BlueDart', trackingNumber = 'BD123456789', trackingUrl = '', address = '', expectedDate = '' }: OrderDispatchedProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Your Order is On Its Way! Track #{orderNumber}</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Your Order is On Its Way! 🚚</Heading>
      <Text style={text}>Order <strong style={{ color: '#202124' }}>{orderNumber}</strong> has been dispatched.</Text>
      <Section style={detailsBox}>
        <Text style={detailRow}>📦 Courier: <strong>{courierName}</strong></Text>
        <Text style={detailRow}>🔢 Tracking: <strong>{trackingNumber}</strong></Text>
        {expectedDate && <Text style={detailRow}>📅 Expected delivery: <strong>{expectedDate}</strong></Text>}
        {address && <Text style={detailRow}>📍 Delivering to: {address}</Text>}
      </Section>
      {trackingUrl ? (
        <Section style={btnSection}><Button style={button} href={trackingUrl}>Track Your Order</Button></Section>
      ) : (
        <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/orders`}>View Order</Button></Section>
      )}
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: OrderDispatchedEmail, subject: (data: Record<string, any>) => `Your Order is On Its Way! Track #${data.orderNumber || 'BB-2026-00001'}`,
  displayName: 'Order dispatched', previewData: { orderNumber: 'BB-2026-00042', courierName: 'BlueDart Express', trackingNumber: 'BD987654321', trackingUrl: 'https://bluedart.com/track/BD987654321', address: '123 MG Road, Bengaluru', expectedDate: '18 April 2026' },
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
