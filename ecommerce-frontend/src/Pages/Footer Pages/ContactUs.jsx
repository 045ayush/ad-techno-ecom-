import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Contact Us</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          We’d love to hear from you! Whether you have a question, feedback, or need assistance, feel free to reach out to us using the form below or through our contact details.
        </p>
        
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-slate-700">Send Us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-slate-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-slate-700">Our Contact Details</h2>
          <p className="text-lg text-slate-600 mb-4">
            If you prefer to contact us directly, you can reach us using the following methods:
          </p>
          <p className="text-lg text-slate-600 mb-2">
            Email: <a href="mailto:support@adtechnosolutions.com" className="text-blue-600 hover:underline">support@adtechnosolutions.com</a>
          </p>
          <p className="text-lg text-slate-600 mb-2">
            Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
          </p>
          <p className="text-lg text-slate-600">
            Address: 1234 Tech Street, Innovation City, TX 12345
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
