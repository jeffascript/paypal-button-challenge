import { useFormikContext } from 'formik'
import { useCallback, useMemo, useEffect, useState } from 'react'
import { PayPalFormValues, PayPalInstance, PaypalComponentStyles } from './types'

const buttonStyle = {
  color: 'gold',
  fundingicons: false,
  label: 'checkout',
  shape: 'rect',
  size: 'responsive',
  tagline: false,
} as PaypalComponentStyles

const envKeys: Readonly<{ sandbox: string; commit: boolean }> = {
  sandbox: 'sandbox',
  commit: true,
}

//🚀 Hook for  initializing the Paypal Instance
const initialisePaypal = () => {
  const [paypalInstance, setPaypalInstance] = useState<PayPalInstance>(null)

  useEffect(() => {
    const initializePayPal = () => {
      const paypalObject = typeof window !== 'undefined' && window['paypal']
      if (paypalObject) {
        setPaypalInstance(paypalObject)
      }
    }

    initializePayPal()
  }, [])

  return paypalInstance
}

// 🛠️ Hook for getting all props
const getPaypalButtonProps = () => {
  const [paypalError, setPaypalError] = useState<unknown>(undefined)

  const {
    submitForm,
    isSubmitting,
    isValid,
    values,
    setSubmitting,
    errors: formikErrors,
  } = useFormikContext<PayPalFormValues>()

  const createOrderOrBillingAgreement = useCallback(async () => {
    try {
      await submitForm() // submit will call api with form values and inject _paypal_token into the form values
      if (isValid) setSubmitting(true)
      return values._paypal_token ?? ''
    } catch (error) {
      throw error
    }
  }, [isSubmitting])

  const onApprove = useCallback(async () => {
    // do something on success
    console.log('can never be called for this Demo!')
  }, [])

  const onCancel = useCallback(() => {
    setSubmitting(false)
  }, [setSubmitting])

  const onError = useCallback(
    (err: unknown) => {
      setSubmitting(false)

      if (err) setPaypalError(err)
    },
    [setSubmitting]
  )

  return useMemo(
    () => ({
      createOrderOrBillingAgreement,
      onApprove,
      onCancel,
      onError,
      isSubmitting,
      formikErrors,
      buttonStyle,
      envKeys,
      paypalError,
    }),
    [createOrderOrBillingAgreement, onApprove, onCancel, onError, isSubmitting, formikErrors, paypalError]
  )
}

export { getPaypalButtonProps, initialisePaypal }
