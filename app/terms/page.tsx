"use client"

import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const Terms = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 text-center">
          <span className="relative">
            Terms and Conditions
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></div>
          </span>
        </h1>
        <div className="text-lg text-gray-600 max-w-3xl mx-auto">
          <p className="mb-4">Effective Date: 25 March 2025</p>
          
          <p className="mb-4">Welcome to "notabl.ai" ("Service"), a tool provided by Base Layer Limited. By using the Service, you ("User") agree to be bound by the following terms and conditions (the "Terms of Use"). If you do not agree to these Terms of Use, do not use the Service.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">1. Use of the Service</h2>
          
          <p className="mb-4">The Service allows User to access and use the app. The User is granted a license to use the Service for personal and commercial use, provided that they comply with the terms and conditions of the Service. The User is responsible for making sure they use the service in accordance with all applicable laws and regulations.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">2. AI models, their terms and licenses for use</h2>
          
          <p className="mb-4">notabl.ai uses third party AI models to transcribe and summarize content uploaded by the User for the User. The User agrees to grant notabl.ai the content licenses needed in order to use the AI models used to deliver the Service.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">3. Fair Usage Policy</h2>
          
          <p className="mb-4">While we market our subscription plans as offering "unlimited usage," this is subject to a Fair Usage Policy to ensure a sustainable service for all customers. We reserve the right to monitor usage patterns and, at our sole discretion, limit or suspend usage that we determine to be excessive, abusive, or significantly above the average usage of our other customers. In such cases, we may contact you to discuss an appropriate plan or resolution. Abuse of this policy may result in termination of your account.</p>
          
          <p className="mb-4">This policy ensures that the service remains fair and accessible for the majority of users and prevents unsustainable operational costs.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">4. Modification and Discontinuation of Service</h2>
          
          <p className="mb-4">notabl.ai reserves the right to modify or discontinue the Service, or any portion thereof, at any time without notice. notabl.ai will not be liable to the User or any third party for any modification, suspension, or discontinuation of the Service.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">5. Limitation of Liability</h2>
          
          <p className="mb-4">notabl.ai will not be liable for any damages arising out of or in connection with your use of the Service, including but not limited to direct, indirect, incidental, special, consequential or punitive damages, regardless of the form of action or the basis of the claim, even if notabl.ai has been advised of the possibility of such damages. Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so this limitation and exclusion may not apply to you. The total liability of notabl.ai cannot, whatever the circumstances, exceed the amount charged from the User in the last six months.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">6. Warranty Disclaimer</h2>
          
          <p className="mb-4">The Service is provided "as is" and notabl.ai makes no warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose. notabl.ai does not warrant that the Service will be uninterrupted or error-free, and notabl.ai will not be liable for any interruptions or errors. notabl.ai does not endorse, warrant, or guarantee any third-party content or service that may be accessed through the Service. The User acknowledges that the Service uses third-party AI models as part of the Service and that AI generated content needs to be reviewed by the User. notabl.ai is not responsible for any issues with or arising from AI generated content.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">7. Indemnification</h2>
          
          <p className="mb-4">The User agrees to indemnify and hold notabl.ai, its directors, officers, employees, agents, and assigns, harmless from any claims, losses, damages, liabilities, and expenses (including reasonable attorneys' fees) arising out of or in connection with your use of the Service, or any violation of these Terms of Use.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">8. Governing Law</h2>
          
          <p className="mb-4">These Terms of Use shall be governed by the laws of Hong Kong without giving effect to any principles of conflicts of law. Any disputes arising out of or in connection with these Terms of Use will be resolved in the courts of Hong Kong.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">9. Severability</h2>
          
          <p className="mb-4">If any provision of these Terms of Use is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">10. Entire Agreement</h2>
          
          <p className="mb-4">These Terms of Use constitute the entire agreement between the User and notabl.ai regarding the use of the Service.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">11. Refund policy</h2>
          
          <p className="mb-4">Unless otherwise required by law, all sales are final and there are no refunds.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">12. Contact Us</h2>
          
          <p className="mb-4">For any questions or concerns regarding the Service or these Terms of Use, please contact us at <a href="mailto:hello@notabl.ai" className="text-purple-600 hover:text-purple-700 underline">hello@notabl.ai</a> or any other communication means we put at the customer's disposition.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Terms