import React from 'react';

const HelpAndSupport = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Help & Support</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          We’re here to assist you with any questions or issues you may have. Find the information you need below or contact us directly for personalized support.
        </p>

        {/* Support Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-slate-700">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600 mb-4">
              Check out our FAQs to find answers to common questions about our products and services.
            </p>
            <a href="/faqs" className="text-blue-600 hover:underline text-lg font-medium">View FAQs</a>
          </div>

          {/* Live Chat */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-slate-700">Live Chat</h2>
            <p className="text-lg text-slate-600 mb-4">
              For real-time assistance, use our live chat feature to connect with a support representative.
            </p>
            <a href="/live-chat" className="text-blue-600 hover:underline text-lg font-medium">Start Live Chat</a>
          </div>

          {/* Contact Support */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold mb-4 text-slate-700">Contact Support</h2>
            <p className="text-lg text-slate-600 mb-4">
              If you need further assistance, you can contact our support team via email or phone.
            </p>
            <a href="/contact-us" className="text-blue-600 hover:underline text-lg font-medium">Contact Us</a>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-slate-700">Additional Resources</h2>
          <p className="text-lg text-slate-600 mb-4">
            Explore additional resources and support materials to help you get the most out of our products and services.
          </p>
          <a href="/resources" className="text-blue-600 hover:underline text-lg font-medium">Explore Resources</a>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;
