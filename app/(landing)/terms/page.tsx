import React from 'react'

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
      
      <div className="space-y-8 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">1. Agreement to Terms</h2>
          <p className="mb-4">
            By accessing or using Lumeo&apos;s AI video generation platform, you agree to be bound by these 
            Terms and Conditions. If you disagree with any part of these terms, you may not access or 
            use our service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">2. Description of Service</h2>
          <p className="mb-4">
            Lumeo is an AI-powered video generation platform operated by DCTR s.r.o. We provide users 
            with tools and services to create, edit, and generate video content using artificial 
            intelligence technology.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">3. User Accounts</h2>
          <p className="mb-4">When creating an account, you agree to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Promptly update your account information as needed</li>
            <li>Accept responsibility for all activities under your account</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            You retain rights to your original content. However, you grant Lumeo a license to use, 
            store, and process your content as necessary to provide our services. The platform, 
            including its software, features, and interfaces, remains the property of DCTR s.r.o.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">5. Acceptable Use</h2>
          <p className="mb-4">You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Generate content that violates any applicable laws</li>
            <li>Infringe on intellectual property rights</li>
            <li>Create or distribute harmful or malicious content</li>
            <li>Attempt to breach or circumvent our security measures</li>
            <li>Resell or redistribute our services without authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">6. Payment Terms</h2>
          <p className="mb-4">
            Some features of Lumeo require payment. By subscribing to our paid services, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pay all applicable fees on time</li>
            <li>Maintain valid payment information</li>
            <li>Accept our refund and cancellation policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            DCTR s.r.o. provides Lumeo &ldquo;as is&rdquo; without any warranty. We are not liable for any 
            indirect, incidental, special, or consequential damages arising from your use of our 
            service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">8. Changes to Terms</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will notify users of any 
            material changes via email or through our platform. Continued use of Lumeo after such 
            changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-muted-foreground mb-4">9. Contact Information</h2>
          <p className="mb-4">
            For questions about these Terms and Conditions, please contact:<br />
            DCTR s.r.o.<br />
            Email: hello@lumeo.com
          </p>
          <p className="text-sm text-gray-500 mt-8">Last Updated: December 2024</p>
        </section>
      </div>
    </div>
  )
}
