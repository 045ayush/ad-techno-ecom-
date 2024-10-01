import React from 'react';

const ShippingAndDelivery = () => {
  return (
    <div className="bg-gray-100 text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">Shipping and Delivery</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed text-center">
          We aim to deliver your orders quickly and efficiently. Here’s everything you need to know about our shipping and delivery services.
        </p>

        {/* Shipping Information */}
        <div className="space-y-8">
          {/* Shipping Policy */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Shipping Policy</h2>
            <p className="text-lg text-slate-600">
              We offer a range of shipping options to suit your needs. Shipping costs are calculated at checkout based on the delivery location and the weight of the items.
            </p>
            <p className="text-lg text-slate-600">
              Orders are typically processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has been shipped.
            </p>
          </section>

          {/* Delivery Times */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Delivery Times</h2>
            <p className="text-lg text-slate-600">
              Standard delivery usually takes 3-5 business days. Expedited options are available for faster delivery at an additional cost.
            </p>
            <p className="text-lg text-slate-600">
              Delivery times may vary depending on your location and the shipping method selected.
            </p>
          </section>

          {/* Shipping Restrictions */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Shipping Restrictions</h2>
            <p className="text-lg text-slate-600">
              We currently ship to most locations within the country. Some remote or international locations may be subject to additional shipping fees or restrictions.
            </p>
          </section>

          {/* Order Tracking */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Order Tracking</h2>
            <p className="text-lg text-slate-600">
              Once your order has been shipped, you can track its progress using the tracking number provided in your shipping confirmation email.
            </p>
            <p className="text-lg text-slate-600">
              For any issues with tracking or delivery, please contact our customer service team for assistance.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
            <p className="text-lg text-slate-600">
              If you have any questions about our shipping and delivery policy, please reach out to us at <a href="mailto:admin@adtechnosolutions.com" className="text-blue-600 hover:underline">admin@adtechnosolutions.com</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
