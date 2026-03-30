import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Button, Hr, Section,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'BrandBazaar'
const SITE_URL = 'https://brandbazar.lovable.app'

interface WelcomeProps { name?: string }

const WelcomeEmail = ({ name }: WelcomeProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Welcome to BrandBazaar — Let's Brand Something Great</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={logoText}>Brand<span style={{ color: '#1A73E8' }}>Bazaar</span></Text>
        </Section>
        <Heading style={h1}>Welcome to BrandBazaar{name ? `, ${name}` : ''}!</Heading>
        <Text style={text}>
          We're thrilled to have you on board. BrandBazaar is your one-stop platform for premium
          customized merchandise — from corporate gifting to branded apparel.
        </Text>
        <Text style={text}>Here's what you can do:</Text>
        <Text style={listItem}>🎨 Browse our catalog of 500+ customizable products</Text>
        <Text style={listItem}>📦 Place orders with artwork upload & mockup approval</Text>
        <Text style={listItem}>💼 Request a corporate quote for bulk pricing</Text>
        <Text style={listItem}>📊 Track orders in your personal dashboard</Text>
        <Section style={btnSection}>
          <Button style={button} href={`${SITE_URL}/shop`}>Browse Products</Button>
        </Section>
        <Text style={text}>
          Need bulk or corporate pricing?{' '}
          <a href={`${SITE_URL}/#quote`} style={link}>Request a Quote →</a>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          BrandBazaar · Premium Custom Merchandise<br />
          Questions? Reply to this email or contact us at support@brandbazar.in
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: WelcomeEmail,
  subject: "Welcome to BrandBazaar — Let's Brand Something Great",
  displayName: 'Welcome email',
  previewData: { name: 'Rahul' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Inter', Arial, sans-serif" }
const container = { padding: '0', maxWidth: '600px', margin: '0 auto' }
const header = { backgroundColor: '#202124', padding: '24px 32px', borderRadius: '12px 12px 0 0' }
const logoText = { color: '#ffffff', fontSize: '22px', fontWeight: '600' as const, margin: '0', fontFamily: "'Poppins', Arial, sans-serif" }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#202124', margin: '32px 32px 16px', fontFamily: "'Poppins', Arial, sans-serif" }
const text = { fontSize: '14px', color: '#5F6368', lineHeight: '1.6', margin: '0 32px 16px' }
const listItem = { fontSize: '14px', color: '#3C4043', lineHeight: '1.6', margin: '0 32px 8px', paddingLeft: '4px' }
const btnSection = { textAlign: 'center' as const, margin: '24px 32px' }
const button = { backgroundColor: '#1A73E8', color: '#ffffff', padding: '12px 32px', borderRadius: '8px', fontSize: '14px', fontWeight: '600' as const, textDecoration: 'none' }
const link = { color: '#1A73E8', textDecoration: 'none', fontWeight: '500' as const }
const hr = { borderColor: '#E8EAED', margin: '24px 32px' }
const footer = { fontSize: '12px', color: '#9AA0A6', lineHeight: '1.5', margin: '0 32px 32px' }
