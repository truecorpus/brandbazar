/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as welcome } from './welcome.tsx'
import { template as orderConfirmation } from './order-confirmation.tsx'
import { template as artworkReview } from './artwork-review.tsx'
import { template as mockupReady } from './mockup-ready.tsx'
import { template as productionStarted } from './production-started.tsx'
import { template as orderDispatched } from './order-dispatched.tsx'
import { template as orderDelivered } from './order-delivered.tsx'
import { template as quoteSent } from './quote-sent.tsx'
import { template as paymentConfirmation } from './payment-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'welcome': welcome,
  'order-confirmation': orderConfirmation,
  'artwork-review': artworkReview,
  'mockup-ready': mockupReady,
  'production-started': productionStarted,
  'order-dispatched': orderDispatched,
  'order-delivered': orderDelivered,
  'quote-sent': quoteSent,
  'payment-confirmation': paymentConfirmation,
}
