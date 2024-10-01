import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Privacy Policy</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
        </p>

        {/* Sections of Privacy Policy */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Introduction</h2>
            <p className="text-lg text-slate-600">
              Welcome to our Privacy Policy. Your privacy is critically important to us. We are committed to safeguarding the personal information you provide to us and ensuring that your experience on our website is safe and secure.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Information We Collect</h2>
            <p className="text-lg text-slate-600">
              We collect information from you when you visit our website, make a purchase, or interact with our customer service. This may include personal details such as your name, email address, phone number, and payment information.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">How We Use Your Information</h2>
            <p className="text-lg text-slate-600">
              The information we collect is used to provide and improve our services, process transactions, and communicate with you about your orders and promotions. We may also use your information for marketing purposes, with your consent.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Data Security</h2>
            <p className="text-lg text-slate-600">
              We implement industry-standard security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Changes to This Policy */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Changes to This Policy</h2>
            <p className="text-lg text-slate-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes by posting the updated policy on our website.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
            <p className="text-lg text-slate-600">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href="mailto:admin@adtechnosolutions.com" className="text-blue-600 hover:underline">admin@adtechnosolutions.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
