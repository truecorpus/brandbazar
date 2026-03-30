import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section, Row, Column } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'BrandBazaar'
const SITE_URL = 'https://brandbazar.lovable.app'

interface OrderConfirmationProps {
  orderNumber?: string; items?: Array<{ name: string; qty: number; price: string; customization?: string }>
  subtotal?: string; gst?: string; total?: string; address?: string; timeline?: string; hasArtworkPending?: boolean
}

const OrderConfirmationEmail = ({ orderNumber = 'BB-2026-00001', items = [], subtotal = '₹0', gst = '₹0', total = '₹0', address = '', timeline = '7-10 business days', hasArtworkPending = false }: OrderConfirmationProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Order {orderNumber} Confirmed — BrandBazaar</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Order Confirmed! 🎉</Heading>
      <Text style={text}>Your order <strong style={{ color: '#202124' }}>{orderNumber}</strong> has been placed successfully.</Text>
      <Section style={tableContainer}>
        <Row style={tableHeader}><Column style={thCol}>Item</Column><Column style={thColSm}>Qty</Column><Column style={thColSm}>Price</Column></Row>
        {items.map((item, i) => (
          <Row key={i} style={tableRow}><Column style={tdCol}>{item.name}{item.customization ? <Text style={custText}>{item.customization}</Text> : null}</Column><Column style={tdColSm}>{item.qty}</Column><Column style={tdColSm}>{item.price}</Column></Row>
        ))}
      </Section>
      <Section style={totalsBox}>
        <Row><Column style={totalLabel}>Subtotal</Column><Column style={totalValue}>{subtotal}</Column></Row>
        <Row><Column style={totalLabel}>GST (18%)</Column><Column style={totalValue}>{gst}</Column></Row>
        <Hr style={{ borderColor: '#E8EAED', margin: '8px 0' }} />
        <Row><Column style={{ ...totalLabel, fontWeight: '600', color: '#202124' }}>Total</Column><Column style={{ ...totalValue, fontWeight: '600', color: '#202124' }}>{total}</Column></Row>
      </Section>
      {address && <><Text style={sectionTitle}>Delivery Address</Text><Text style={text}>{address}</Text></>}
      <Text style={sectionTitle}>Expected Timeline</Text><Text style={text}>{timeline}</Text>
      {hasArtworkPending && <Section style={alertBox}><Text style={alertText}>⚠️ Artwork upload is pending for one or more items. Please upload your artwork to start production.</Text>
        <Button style={button} href={`${SITE_URL}/dashboard/artwork`}>Upload Artwork</Button></Section>}
      <Section style={btnSection}><Button style={button} href={`${SITE_URL}/dashboard/orders`}>View Order Details</Button></Section>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: OrderConfirmationEmail, subject: (data: Record<string, any>) => `Order #${data.orderNumber || 'BB-2026-00001'} Confirmed — BrandBazaar`,
  displayName: 'Order confirmation', previewData: { orderNumber: 'BB-2026-00042', items: [{ name: 'Custom T-Shirts', qty: 100, price: '₹15,000', customization: 'Front: Logo print' }, { name: 'Branded Notebooks', qty: 50, price: '₹4,500' }], subtotal: '₹19,500', gst: '₹3,510', total: '₹23,010', address: '123 MG Road, Bengaluru 560001', timeline: '7-10 business days', hasArtworkPending: true },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const sectionTitle = { fontSize: '13px', fontWeight: '600' as const, color: '#202124', textTransform: 'uppercase' as const, letterSpacing: '0.5px', margin: '24px 32px 8px' }
const tableContainer = { margin: '16px 32px', border: '1px solid #E8EAED', borderRadius: '8px', overflow: 'hidden' as const }
const tableHeader = { backgroundColor: '#F8F9FA', padding: '10px 16px' }
const thCol = { fontSize: '12px', fontWeight: '600' as const, color: '#5F6368', textTransform: 'uppercase' as const }
const thColSm = { ...thCol, width: '60px', textAlign: 'right' as const }
const tableRow = { padding: '12px 16px', borderTop: '1px solid #E8EAED' }
const tdCol = { fontSize: '14px', color: '#202124' }
const tdColSm = { fontSize: '14px', color: '#3C4043', width: '60px', textAlign: 'right' as const }
const custText = { fontSize: '12px', color: '#9AA0A6', margin: '2px 0 0' }
const totalsBox = { margin: '0 32px 24px', padding: '16px', backgroundColor: '#F8F9FA', borderRadius: '8px' }
const totalLabel = { fontSize: '14px', color: '#5F6368' }
const totalValue = { fontSize: '14px', color: '#5F6368', textAlign: 'right' as const }
const alertBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#FFF8E1', borderRadius: '8px', border: '1px solid #FFE082' }
const alertText = { fontSize: '13px', color: '#5D4037', margin: '0 0 12px' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
