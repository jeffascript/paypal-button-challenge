import React, { useMemo } from 'react'
import ReactDOM from 'react-dom'
import { getPaypalButtonProps, initialisePaypal } from './usePaypalProps'
import { PayPalButtonComponent } from './types'

const PayPalButton = () => {
  const paypalInstance = initialisePaypal()
  const {
    createOrderOrBillingAgreement,
    onApprove,
    onCancel,
    onError,
    isSubmitting,
    paypalError,
    formikErrors,
    envKeys,
    buttonStyle,
  } = getPaypalButtonProps()

  const Button = useMemo(
    () =>
      paypalInstance
        ? ((paypalInstance.Buttons! as any).driver('react', {
            React,
            ReactDOM,
          }) as PayPalButtonComponent)
        : null,
    [paypalInstance]
  )

  if (!Button) return null

  // 🚨 dummy error ===> I am just keeping this here just to show that errors are caught successfully.
  console.log('message' in formikErrors && JSON.parse(JSON.stringify(formikErrors.message)))
  console.log(paypalError && JSON.parse(JSON.stringify(paypalError)))

  return (
    <div>
      <div style={(isSubmitting && { display: 'none' }) || {}}>
        <Button
          commit={envKeys.commit}
          env={envKeys.sandbox}
          createBillingAgreement={createOrderOrBillingAgreement}
          onApprove={onApprove}
          onCancel={onCancel}
          onError={onError}
          style={buttonStyle}
        />
      </div>
    </div>
  )
}

const PaypalButton = React.memo(PayPalButton)

export default PaypalButton
