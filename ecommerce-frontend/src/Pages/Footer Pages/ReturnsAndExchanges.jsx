import React from 'react';

const ReturnAndExchange = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Return and Exchange Policy</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          We want you to be completely satisfied with your purchase. If for any reason you're not, our return and exchange policy is here to help.
        </p>

        {/* Policy Sections */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Introduction</h2>
            <p className="text-lg text-slate-600">
              Our return and exchange policy allows you to return or exchange items within a specified period if you are not satisfied with your purchase.
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Eligibility</h2>
            <p className="text-lg text-slate-600">
              To be eligible for a return or exchange, the item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>
          </section>

          {/* Return Process */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Return Process</h2>
            <p className="text-lg text-slate-600">
              To initiate a return, please contact our customer service team. You will be provided with a return authorization number and instructions on how to send the item back to us.
            </p>
          </section>

          {/* Exchange Process */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Exchange Process</h2>
            <p className="text-lg text-slate-600">
              If you wish to exchange an item, please contact our customer service team. We will guide you through the process and help you select a replacement item.
            </p>
          </section>

          {/* Non-Returnable Items */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Non-Returnable Items</h2>
            <p className="text-lg text-slate-600">
              Some items are non-returnable, including but not limited to personalized items and products with missing original packaging or accessories.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
            <p className="text-lg text-slate-600">
              If you have any questions about our return and exchange policy, please contact us at <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnAndExchange;
