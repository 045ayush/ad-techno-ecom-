import React from 'react';

const WarrantyInformation = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Warranty Information</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          Learn more about our warranty policy for refurbished products.
        </p>

        {/* Introduction */}
        <div className="space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Introduction</h2>
            <p className="text-lg text-slate-600">
              At Ad-Techno Solutions, we are committed to providing high-quality refurbished products. Our products come with a limited warranty to ensure your satisfaction and peace of mind.
            </p>
          </section>

          {/* Warranty Coverage */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Warranty Coverage</h2>
            <p className="text-lg text-slate-600">
              Our warranty covers defects in materials and workmanship under normal use. This includes:
            </p>
            <ul className="list-disc list-inside text-lg text-slate-600 mt-4 space-y-2">
              <li>Hardware malfunctions or failures</li>
              <li>Manufacturing defects</li>
              <li>Repair or replacement of defective parts</li>
            </ul>
          </section>

          {/* Exclusions */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Exclusions</h2>
            <p className="text-lg text-slate-600">
              Our warranty does not cover:
            </p>
            <ul className="list-disc list-inside text-lg text-slate-600 mt-4 space-y-2">
              <li>Accidental damage</li>
              <li>Physical abuse or misuse</li>
              <li>Damage from unauthorized repairs or modifications</li>
              <li>Consumable parts such as batteries</li>
            </ul>
          </section>

          {/* Claim Process */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Claim Process</h2>
            <p className="text-lg text-slate-600">
              To make a warranty claim, please follow these steps:
            </p>
            <ol className="list-decimal list-inside text-lg text-slate-600 mt-4 space-y-2">
              <li>Contact our customer service team at <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a>.</li>
              <li>Provide your order number and a description of the issue.</li>
              <li>Our team will provide instructions on how to return the product for inspection.</li>
              <li>Upon inspection, we will either repair or replace the product as per our warranty policy.</li>
            </ol>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
            <p className="text-lg text-slate-600">
              If you have any questions about our warranty policy, please reach out to us at <a href="mailto:support@yourcompany.com" className="text-blue-600 hover:underline">support@yourcompany.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WarrantyInformation;
