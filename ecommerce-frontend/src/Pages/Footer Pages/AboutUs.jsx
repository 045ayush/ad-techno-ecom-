import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold mb-6 text-center text-slate-800">About Us</h1>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          Welcome to Ad-Techno Solutions! We are dedicated to providing top-notch refurbished laptops, desktops, and other tech products at unbeatable prices. Our mission is to make high-quality technology accessible to everyone, while promoting sustainability through refurbished products.
        </p>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">Our Story</h2>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          Founded in [Year], Ad-Techno Solutions began with a vision to offer high-quality refurbished tech products at affordable prices. We are a team of tech enthusiasts committed to delivering exceptional value and excellent customer service.
        </p>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">Our Values</h2>
        <ul className="list-disc list-inside text-lg text-slate-600 mb-6 leading-relaxed space-y-2">
          <li>Integrity: We stand by our commitment to provide honest and transparent services.</li>
          <li>Quality: We meticulously inspect and refurbish each product to ensure it meets high standards.</li>
          <li>Customer Satisfaction: Our customers are our top priority, and we strive to exceed their expectations.</li>
          <li>Sustainability: By promoting refurbished products, we contribute to reducing electronic waste and environmental impact.</li>
        </ul>
        <h2 className="text-4xl font-semibold mb-4 text-slate-700">Contact Us</h2>
        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          If you have any questions or need more information about our products, please feel free to reach out to us. We are here to help!
        </p>
        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          Email: <a href="mailto:info@adtechnosolutions.com" className="text-blue-600 hover:underline">info@adtechnosolutions.com</a>
        </p>
        <p className="text-lg text-slate-600">
          Phone: <a href="tel:+1234567890" className="text-blue-600 hover:underline">+1 (234) 567-890</a>
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
