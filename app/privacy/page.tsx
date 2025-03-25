"use client"

import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 pb-4 text-center">
          <span className="relative">
            Privacy Policy
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-purple-200 rounded-full"></div>
          </span>
        </h1>
        <div className="text-lg text-gray-600 max-w-3xl mx-auto">
          <p className="mb-4">Effective Date: 25 March 2025</p>
          
          <p className="mb-4">At notabl.ai, we are committed to protecting the privacy of our users and customers. This Privacy Policy explains how we collect, use, and disclose personal information when you use our website.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">1. Information Collection</h2>
          
          <p className="mb-4">We collect information from you when you use our website or service, including:</p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Device Information:</strong> When you visit our website, we collect information about your device, such as your IP address, browser type, and operating system. We also collect information about your browsing activity on our website, such as the pages you visit, the links you click, and the search terms you use.</li>
            <li><strong>Log Data:</strong> We also collect log data when you access our website or service, which includes information about your device, browser, and internet service provider, as well as the date and time of your request.</li>
            <li><strong>Cookies:</strong> We use cookies to improve your experience on our website and to remember your preferences. Cookies are small text files that are stored on your device when you visit a website.</li>
            <li><strong>Google Analytics and Metrics:</strong> We use these services to track and analyze website traffic, usage, and behavior.</li>
            <li><strong>Third-Party Services:</strong> We may also use third-party services such as X.com for tracking and analyzing website traffic, usage, and behavior. These services may collect and share your personal information for their own uses and purposes.</li>
          </ul>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">2. Use of Personal Information</h2>
          
          <p className="mb-4">We use the personal information we collect for the following purposes:</p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li>To provide and improve our website and service</li>
            <li>To process your orders and payments</li>
            <li>To communicate with you about your account, orders, and other transactions</li>
            <li>To screen for potential risk or fraud</li>
            <li>To provide you with information or advertising relating to our products or services</li>
            <li>To comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
          </ul>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">3. Disclosure of Personal Information</h2>
          
          <p className="mb-4">We do not sell or share your personal information with third parties for their own marketing or commercial use. However, we may share your personal information with third parties for the following purposes:</p>
          
          <ul className="list-disc pl-5 mb-4 space-y-2">
            <li><strong>Service Providers:</strong> We may share your personal information with third-party service providers who assist us with various aspects of our business operations, such as website hosting, data analysis, payment processing, and customer service.</li>
            <li><strong>Compliance with Laws and Law Enforcement:</strong> We may disclose your personal information to government authorities or law enforcement officials in order to comply with applicable laws, regulations, or legal process.</li>
            <li><strong>Protection of Rights and Safety:</strong> We may disclose your personal information to protect the rights, property, or safety of notabl.ai, our users, or the public.</li>
          </ul>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">4. Changes to This Privacy Policy</h2>
          
          <p className="mb-4">We may update this Privacy Policy from time to time to reflect changes in our practices or to comply with legal or regulatory requirements.</p>
          
          <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-black">5. Contact Us</h2>
          
          <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:hello@notabl.ai" className="text-purple-600 hover:text-purple-700 underline">hello@notabl.ai</a>.</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy