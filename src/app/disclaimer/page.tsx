import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Disclaimer - Diamond Global Securities',
  description: 'Investment risk disclaimer and regulatory disclosures for Diamond Global Securities.',
}

export default function Disclaimer() {
  return (
    <LegalPage title="Disclaimer" updated="19 September 2026">
      <h2>1. Investment Risk</h2>
      <p>
        <strong>The value of investments can fall as well as rise, and you may not get back the amount you
        invested.</strong> Past performance is not a reliable indicator of future results. Investing in
        securities on the Dar es Salaam Stock Exchange involves risk, including market, liquidity, and
        currency risk. You should only invest money you can afford to put at risk.
      </p>

      <h2>2. Not Personalised Advice</h2>
      <p>
        General information on this website — including market commentary and news — is provided for
        informational purposes only and does not constitute personalised investment advice. Personalised
        advice is only given within the scope of a formal advisory or fund management engagement with us.
      </p>

      <h2>3. Regulatory Status</h2>
      <p>
        Diamond Global Securities Limited is authorised and regulated by the Capital Markets and Securities
        Authority (CMSA) of Tanzania and is a licensed dealing member of the Dar es Salaam Stock Exchange
        (DSE), holding licences to provide dealing, investment advisory, and fund management services.
      </p>

      <h2>4. Conflicts of Interest</h2>
      <p>
        We maintain policies designed to identify and manage conflicts of interest that may arise between
        Diamond Global Securities, our staff, and our clients, so that client interests are treated fairly.
      </p>

      <h2>5. Complaints</h2>
      <p>
        If you are unhappy with any aspect of our service, please contact us directly at{' '}
        <a href="mailto:info@diamondsecurities.co.tz">info@diamondsecurities.co.tz</a> so we can address it.
        If a complaint cannot be resolved with us directly, you may escalate it to the Capital Markets and
        Securities Authority (CMSA).
      </p>

      <h2>6. No Warranty</h2>
      <p>
        While we take care to keep information on this website accurate and current, we make no warranty
        that it is complete, accurate, or up to date at all times, and it should not be relied upon as the
        sole basis for an investment decision.
      </p>
    </LegalPage>
  )
}
