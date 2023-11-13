- test: `pnpm test`
- local test runner: `pnpm test:dev`
- start: `pnpm dev`,

# Frontend Engineer: Technical Challenge PayPal Button

## Task

Take a look at the component `PayPalButton`, located in `/src/PayPalButton.tsx`.

1. ✅ What issues with it can you spot?

   _Answer_: ...

   <span style="color: white; font-size: medium; ">

   - The PayPalButton is a class component, which can be less performant than a functional component with hooks.

   - The `sleepUntilSubmitted` function is as a polling mechanism is not an optimal solution. The `submitForm` prop of the Formik component that handles the form submission can return a promise that resolves with the PayPal token.

   - There was no error handling indication, since the mock API is bound to fail

   - The `Connect` HOC is not necessary, since `Formik` exports a util `useFormikContext` which makes it easier to collocate/encapsulate in where needed, hence prop drilling and re-rendering are avoided.

   - The Paypal Instance is not memoized/cached, hence will cause unnecessary re-rendering.

   - It's assumed that the PayPal API (`window['paypal']`) will be available, but there is no check to ensure that the API is loaded before trying to access it.

   - Should be memoized to avoid memory leaks and unnecessary re-renders

     </span>

2. ✅ Re-factor the class component into a functional component, while applying improvements regarding the problems you noted before and any other optimizations.

3. ✅ Bonus: Get rid of the HOC connect component (perhaps by utilising other available APIs).

4. ✅ Bonus: There is an issue with running the current implementation in `React.StrictMode` - the PayPal button will be duplicated, how would you go about solving this problem?

   _Answer_: ...

   <span style="color: white; font-size: medium; ">

   - <u><strong>Top of my head</strong></u>, I would undo any side effects that is created in the useEffect hook with `AbortController` for example, use a cleanup function to remove the script element that loads the PayPal SDK. Or maybe store a reference to the button before rendering it, and then use the close method to remove it when the component unmounts.

   - <u><strong>But, from my research</strong></u>, the official `@paypal/react-paypal-js` library handles the cleanup of the PayPal button automatically. So I would strongly suggest this as the way to go

     </span>

### Additional notes

- The component uses [PayPal SDK](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/). Keep in mind that due to the mock returning a fake value, `onAccept` will never be executed in this demo and the expected result is the SDK failing with `500` while trying to call `https://www.sandbox.paypal.com/smart/api/payment/fake_paypal_token/ectoken`
- The component also utilises [formik](https://formik.org/) as form/state management library.

## Submit your solution

You can provide your solution either

- as a zipped file containing the code or
- as a link to a fork of this repository.
