import Link from 'next/link'
import React from 'react'

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">About Us</h4>
            <p>We are a company dedicated to connecting job seekers with their dream jobs.</p>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <span className="hover:text-blue-400">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <span className="hover:text-blue-400">Jobs</span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="hover:text-blue-400">About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-blue-400">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" passHref>
                  {/* <span className="flex items-center hover:text-blue-400" target="_blank">
                    <i className="fab fa-facebook-f mr-2"></i> Facebook
                  </span> */}
                </Link>
              </li>
              <li>
                <Link href="#" passHref>
                  {/* <span className="flex items-center hover:text-blue-400" target="_blank">
                    <i className="fab fa-twitter mr-2"></i> Twitter
                  </span> */}
                </Link>
              </li>
              <li>
                <Link href="#" passHref>
                  {/* <span className="flex items-center hover:text-blue-400" target="_blank">
                    <i className="fab fa-linkedin-in mr-2"></i> LinkedIn
                  </span> */}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-700 py-4 mt-8 text-center">
        <p>&copy; 2023 Job Board. All rights reserved.</p>
      </div>
    </footer>
  )
}
