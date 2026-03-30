import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_URL = 'https://brandbazar.lovable.app'

interface MockupReadyProps { orderNumber?: string; itemName?: string }

const MockupReadyEmail = ({ orderNumber = 'BB-2026-00001', itemName = 'Custom T-Shirts' }: MockupReadyProps) => (
  <Html lang="en" dir="ltr"><Head /><Preview>Your Design Mockup is Ready — Please Approve to Begin Production</Preview>
    <Body style={main}><Container style={container}>
      <Section style={header}><Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text></Section>
      <Heading style={h1}>Your Mockup is Ready! 🎨</Heading>
      <Text style={text}>Great news! The design mockup for <strong style={{ color: '#202124' }}>{itemName}</strong> (Order {orderNumber}) is ready for your review.</Text>
      <Section style={infoBox}><Text style={infoText}>📌 Please review the mockup carefully. Once you approve, production will begin and changes may not be possible.</Text></Section>
      <Section style={btnSection}>
        <Button style={button} href={`${SITE_URL}/dashboard/artwork`}>Review & Approve Mockup</Button>
      </Section>
      <Text style={text}>If you need changes, you can request revisions directly from your dashboard.</Text>
      <Hr style={hr} /><Text style={footer}>BrandBazaar · Premium Custom Merchandise</Text>
    </Container></Body></Html>
)

export const template = {
  component: MockupReadyEmail, subject: 'Your Design Mockup is Ready — Please Approve to Begin Production',
  displayName: 'Mockup ready', previewData: { orderNumber: 'BB-2026-00042', itemName: 'Branded Polo Shirts' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const infoBox = { margin: '16px 32px', padding: '16px', backgroundColor: '#E8F0FE', borderRadius: '8px', border: '1px solid #C2D9FC' }
const infoText = { fontSize: '13px', color: '#174EA6', margin: '0' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
