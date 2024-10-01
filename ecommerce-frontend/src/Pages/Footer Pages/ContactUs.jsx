import React from 'react';

const ContactUs = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Contact Us</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          We’d love to hear from you! Feel free to reach out to us through our contact details below.
        </p>
        
        {/* Contact Details */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold mb-4 text-slate-700">Our Contact Details</h2>
          <p className="text-lg text-slate-600 mb-4">
            You can reach us using the following methods:
          </p>
          <p className="text-lg text-slate-600 mb-2">
            Email: <a href="mailto:admin@adtechnosolutions.com" className="text-blue-600 hover:underline">admin@adtechnosolutions.com</a> / <a href="mailto:ranjeet@adtechnosolutions.com" className="text-blue-600 hover:underline">ranjeet@adtechnosolutions.com</a>
          </p>
          
          <p className="text-lg text-slate-600 mb-2">
            Mobile: <a href="tel:+919722546037" className="text-blue-600 hover:underline">+91 9722546037</a> / <a href="tel:+919953017197" className="text-blue-600 hover:underline">+91 9953017197</a>
          </p>
          <p className="text-lg text-slate-600">
            Address: 605, Vishal bhawan (near modi tower), Nehru Place, Delhi
            110019
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
