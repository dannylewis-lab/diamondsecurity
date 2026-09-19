import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service - Diamond Global Securities',
  description: 'The terms that govern your use of the Diamond Global Securities website and services.',
}

export default function TermsOfService() {
  return (
    <LegalPage title="Terms of Service" updated="19 September 2026">
      <h2>1. About These Terms</h2>
      <p>
        These terms govern your use of this website and, once you become a client, your relationship with
        Diamond Global Securities Limited for brokerage, investment advisory, and fund management services.
        A separate client agreement, signed when you open an account, sets out the full terms of our
        service relationship.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        Our services are intended for individuals and institutions who are legally able to hold and trade
        securities in Tanzania. We may decline to open an account, or suspend an existing one, where required
        by law or our regulatory obligations.
      </p>

      <h2>3. Account Opening and Client Responsibilities</h2>
      <p>
        You are responsible for providing accurate, complete information and documentation during account
        opening and for promptly informing us of any change to your details. Instructions you or your
        authorised representative give us are your responsibility.
      </p>

      <h2>4. Fees and Charges</h2>
      <p>
        Brokerage commissions and any applicable exchange or regulatory levies are set out in our fee
        schedule, available on request or via our Downloads page. Fees may change from time to time; we
        will give you reasonable notice of any change that affects you.
      </p>

      <h2>5. Investment Risk</h2>
      <p>
        Investing in securities carries risk, including the risk of loss. Please read our{' '}
        <a href="/disclaimer">Disclaimer</a> before making any investment decision.
      </p>

      <h2>6. Website Use</h2>
      <p>
        This website is provided for informational purposes. You agree not to misuse it — for example, by
        attempting unauthorised access to any part of the site or its systems, or by submitting false
        information through our forms.
      </p>

      <h2>7. Intellectual Property</h2>
      <p>
        The content, branding, and design of this website belong to Diamond Global Securities Limited or
        our licensors and may not be reproduced without permission.
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Diamond Global Securities Limited is not liable for losses arising
        from your use of this website, except where those losses result from our negligence or breach of
        a regulatory obligation owed to you.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of the United Republic of Tanzania.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        We may update these terms from time to time. The &quot;Last updated&quot; date at the top of this
        page shows when it was last revised.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        Questions about these terms can be sent to{' '}
        <a href="mailto:info@diamondsecurities.co.tz">info@diamondsecurities.co.tz</a>.
      </p>
    </LegalPage>
  )
}
