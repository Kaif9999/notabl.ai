import { Mic } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 bg-white border-t-2 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-lg border-2 bg-black border-black flex items-center justify-center">
                <Mic className="h-6 w-6 text-purple-700" />
              </div>
              <span className="ml-2 text-2xl font-bold text-purple-600">
                Notabl.ai
              </span>
            </div>
            <p className="mt-4 text-gray-600 max-w-xs">
              Transform your note-taking experience with our intelligent
              platform.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-black">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-black">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-black">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-purple-700 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 text-gray-600 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Notabl. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a
                href="#"
                className="hover:text-purple-700 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-purple-700 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="hover:text-purple-700 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer