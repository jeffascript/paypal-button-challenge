/**
 * @jest-environment jsdom
 */

import { describe, expect, it, vi } from 'vitest'
import { render, act, renderHook } from '@testing-library/react'

import { getPaypalButtonProps, initialisePaypal } from './usePaypalProps'

import PayPalButton from './PayPalButton'

vi.mock('formik', () => ({
  useFormikContext: vi.fn().mockReturnValue({
    submitForm: vi.fn(),
    isSubmitting: false,
    isValid: true,
    values: { _paypal_token: '123' },
    setSubmitting: vi.fn(),
    setErrors: vi.fn(),
    errors: {},
  }),
}))

window.paypal = (window['paypal'] as any) || {
  Buttons: {
    driver: vi.fn(),
  },
}

describe('PayPalButton', () => {
  it('should render without crashing', () => {
    const { container } = render(<PayPalButton />)
    expect(container).toBeInTheDocument()
    expect(document.querySelector('div')).toBeInTheDocument()
  })

  it('should be available when initialisePaypal returns a paypal instance', () => {
    const { result } = renderHook(() => initialisePaypal())

    // create a dummy component that uses the hook for testing
    const DummyComponent = () => {
      const paypalInstance = result.current
      return <div>{paypalInstance ? 'Paypal ready' : 'Paypal not ready'}</div>
    }

    render(<DummyComponent />)

    const { container } = render(<DummyComponent />)
    expect(container).toHaveTextContent('Paypal ready')

    expect(result.current).not.toBeNull()
  })

  it('should call createOrderOrBillingAgreement and return the correct value', async () => {
    const { result } = renderHook(() => getPaypalButtonProps())
    const createOrderOrBillingAgreement = result.current.createOrderOrBillingAgreement
    act(() => {
      createOrderOrBillingAgreement()
    })
    expect(createOrderOrBillingAgreement()).resolves.toBe('123')
  })

  it('getPaypalButtonProps returns expected props', () => {
    const { result } = renderHook(() => getPaypalButtonProps())
    expect(result.current).toHaveProperty('createOrderOrBillingAgreement')
    expect(result.current).toHaveProperty('onApprove')
    expect(result.current).toHaveProperty('onCancel')
    expect(result.current).toHaveProperty('onError')
    expect(result.current).toHaveProperty('isSubmitting')
    expect(result.current).toHaveProperty('paypalError')
    expect(result.current).toHaveProperty('formikErrors')
    expect(result.current).toHaveProperty('buttonStyle')
    expect(result.current).toHaveProperty('envKeys')
  })

  it('should onApprove log a console.log message', () => {
    const consoleLog = vi.spyOn(console, 'log')
    const { result } = renderHook(() => getPaypalButtonProps())
    const onApprove = result.current.onApprove
    act(() => {
      onApprove()
    })
    expect(consoleLog).toHaveBeenCalledWith('can never be called for this Demo!')
  })
})
