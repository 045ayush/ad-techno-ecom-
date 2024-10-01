import React from 'react';

const AccessibilityStatement = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Accessibility Statement</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          At Ad-Techno Solutions, we are committed to ensuring that our website is accessible to all users, including those with disabilities. We strive to provide an inclusive experience that allows everyone to access our content and services.
        </p>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">Our Accessibility Goals</h2>
        <ul className="list-disc list-inside text-lg text-slate-600 mb-6 leading-relaxed space-y-2">
          <li>Conform to the Web Content Accessibility Guidelines (WCAG) 2.1.</li>
          <li>Ensure our website is navigable using a keyboard and screen reader.</li>
          <li>Provide text alternatives for all non-text content.</li>
          <li>Use clear and easy-to-read fonts and colors to improve readability.</li>
        </ul>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">How to Contact Us</h2>
        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          If you encounter any issues while accessing our website or need assistance with any aspect of our accessibility features, please contact us. We are dedicated to addressing any concerns you may have.
        </p>
        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          Email: <a href="mailto:admin@adtechnosolutions.com" className="text-blue-600 hover:underline">admin@adtechnosolutions.com</a>
        </p>
        <p className="text-lg text-slate-600 mb-6">
          Phone: <a href="tel:9953017197" className="text-blue-600 hover:underline">9953017197</a> , <a href="tel:9711546037" className="text-blue-600 hover:underline">9711546037</a>
        </p>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">Additional Resources</h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          For more information on web accessibility, you can visit the following resources:
        </p>
        <ul className="list-disc list-inside text-lg text-slate-600 mb-6 leading-relaxed space-y-2">
          <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">WCAG Quick Reference</a></li>
          <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">W3C Web Accessibility Initiative (WAI)</a></li>
        </ul>
      </div>
    </div>
  );
};

export default AccessibilityStatement;
