import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="space-y-8 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Lumeo (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). This Privacy Policy explains how DCTR s.r.o., 
            operating as Lumeo, collects, uses, and protects your personal information when you use 
            our AI video generation platform.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">2. Information We Collect</h2>
          <p className="mb-4">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Account information (name, email, password)</li>
            <li>Payment information</li>
            <li>Content you upload or generate using our platform</li>
            <li>Communications with our support team</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">3. How We Use Your Information</h2>
          <p className="mb-4">We use your information to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide and improve our video generation services</li>
            <li>Process your payments</li>
            <li>Send you important updates about our service</li>
            <li>Respond to your requests and support needs</li>
            <li>Analyze and improve our platform&apos;s performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">4. Data Storage and Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational measures to protect your personal data 
            against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">5. Your Rights</h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to data processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">6. Contact Us</h2>
          <p className="mb-4">
            If you have any questions about this Privacy Policy, please contact us at:<br />
            DCTR s.r.o.<br />
            Email: hello@lumeo.com
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">7. Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the &ldquo;Last Updated&rdquo; date.
          </p>
          <p className="text-sm text-gray-500 mt-8">Last Updated: December 2024</p>
        </section>
      </div>
    </div>
  )
}
