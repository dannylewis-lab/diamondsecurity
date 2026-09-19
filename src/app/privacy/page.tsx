import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - Diamond Global Securities',
  description: 'How Diamond Global Securities collects, uses, and protects your personal information.',
}

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privacy Policy" updated="19 September 2026">
      <h2>1. Introduction</h2>
      <p>
        Diamond Global Securities Limited (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy and is
        committed to protecting your personal information in line with Tanzania&apos;s Personal Data Protection Act,
        2022, and the regulatory obligations that apply to us as a capital markets intermediary.
      </p>

      <h2>2. Information We Collect</h2>
      <ul>
        <li>Contact details you give us directly — name, email address, phone number, and any message you send via our contact or account-opening forms.</li>
        <li>Identity and account-opening documents you submit to open a trading account, such as your national ID or passport, a passport photo, and bank account details.</li>
        <li>Basic technical information (such as browser type) generated automatically while you use this website.</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <ul>
        <li>To respond to inquiries you submit through our website.</li>
        <li>To process account opening applications and carry out the identity verification (KYC) required of a licensed capital markets intermediary.</li>
        <li>To communicate with you about your account, our services, and matters we are required to disclose.</li>
        <li>To meet our legal, regulatory, and reporting obligations under Tanzanian law.</li>
      </ul>

      <h2>4. Legal Basis for Processing</h2>
      <p>
        We process your information on the basis of your consent (for example, when you submit an inquiry or
        application), the performance of a contract with you (once you become a client), and compliance with
        legal and regulatory obligations that apply to a licensed securities dealer.
      </p>

      <h2>5. Sharing Your Information</h2>
      <p>
        We do not sell your personal information. We may share it with regulators and market infrastructure
        bodies where required by law, with service providers who support our operations under confidentiality
        obligations, and with your consent where you ask us to act on your behalf.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain personal information for as long as necessary to provide our services and to meet legal,
        regulatory, and accounting requirements.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Subject to applicable law, you may ask us to confirm what personal information we hold about you,
        correct inaccurate information, or delete information we are not required to retain. You may also
        withdraw consent for processing that relies on consent, without affecting anything already done
        on that basis.
      </p>

      <h2>8. Cookies and Local Storage</h2>
      <p>
        This website uses your browser&apos;s local storage only to remember your display preference
        (light or dark mode). We do not use tracking or advertising cookies.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        For any question about this policy or your personal information, contact us at{' '}
        <a href="mailto:info@diamondsecurities.co.tz">info@diamondsecurities.co.tz</a>.
      </p>
    </LegalPage>
  )
}
