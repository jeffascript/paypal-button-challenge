import PayPalButton from './PayPalButton'
import { Formik, FormikConfig } from 'formik'
import './App.css'
import { type PayPalFormValues } from './types'

const submitHandler: FormikConfig<PayPalFormValues>['onSubmit'] = (_, formik) => {
  setTimeout(() => {
    formik.setValues({ _paypal_token: 'fake_paypal_token' })
    formik.setSubmitting(false)
  }, 3000)
}

function App() {
  return (
    <>
      <Formik<PayPalFormValues> onSubmit={submitHandler} initialValues={{}}>
        <PayPalButton />
      </Formik>
    </>
  )
}

export default App
