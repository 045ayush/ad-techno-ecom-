import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Terms of Service</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          Please read these terms of service carefully before using our website or services.
        </p>

        {/* Introduction */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Introduction</h2>
            <p className="text-lg text-slate-600">
              Welcome to Ad-Techno Solutions. By using our website and services, you agree to the following terms and conditions. If you do not agree, please do not use our website.
            </p>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">User Responsibilities</h2>
            <p className="text-lg text-slate-600">
              Users are responsible for maintaining the confidentiality of their account and password. You agree to notify us immediately of any unauthorized use of your account.
            </p>
            <p className="text-lg text-slate-600">
              You agree to use our website in accordance with all applicable laws and regulations.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Intellectual Property</h2>
            <p className="text-lg text-slate-600">
              All content, trademarks, and other intellectual property on our website are owned by Ad-Techno Solutions. You may not use, reproduce, or distribute any content without our prior written permission.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Limitation of Liability</h2>
            <p className="text-lg text-slate-600">
              To the maximum extent permitted by law, Ad-Techno Solutions shall not be liable for any indirect, incidental, special, or consequential damages arising from or in connection with the use of our website or services.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Changes to Terms</h2>
            <p className="text-lg text-slate-600">
              We may update these terms of service from time to time. We will notify you of any changes by posting the new terms on our website. Your continued use of our website after any changes signifies your acceptance of the updated terms.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
            <p className="text-lg text-slate-600">
              If you have any questions about these terms of service, please contact us at <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
