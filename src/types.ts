import { type PayPalButtonsComponentOptions } from '@paypal/paypal-js'

export type PayPalFormValues = { _paypal_token?: string }

export type PayPalButtonComponent = React.ComponentType<
  PayPalButtonsComponentOptions & { commit: boolean; env: string }
>

export type PaypalComponentStyles = PayPalButtonsComponentOptions['style']

export type PayPalInstance = (typeof window)['paypal'] | null
