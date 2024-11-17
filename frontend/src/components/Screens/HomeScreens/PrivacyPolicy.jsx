import React from 'react';

const PrivacyPolicy = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Privacy Policy
        </h2>

        <div className="prose max-w-full text-gray-300">
          <p>
            Vintage Book Market is committed to protecting your privacy. This privacy policy outlines how we collect, use, and protect your information when you visit our website.
          </p>

          <h3 className="text-2xl font-semibold mt-6">1. Information Collection</h3>
          <p>
            We collect information such as your name, email address, payment details, and browsing activity when you visit or interact with our website. This helps us provide a better user experience.
          </p>

          <h3 className="text-2xl font-semibold mt-6">2. Use of Information</h3>
          <p>
            Your personal information is used for account management, processing orders, and communicating with you regarding updates and promotions.
          </p>

          <h3 className="text-2xl font-semibold mt-6">3. Data Security</h3>
          <p>
            We take the security of your information seriously and implement appropriate technical measures to prevent unauthorized access, alteration, or disclosure of your personal data.
          </p>

          <h3 className="text-2xl font-semibold mt-6">4. Sharing of Information</h3>
          <p>
            We do not share your personal information with third parties without your consent, except for trusted partners who help us operate the website or provide services to you.
          </p>

          <h3 className="text-2xl font-semibold mt-6">5. Cookies</h3>
          <p>
            Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser, but disabling cookies may affect your experience on our site.
          </p>

          <h3 className="text-2xl font-semibold mt-6">6. User Rights</h3>
          <p>
            You have the right to access, modify, or delete your personal information at any time. If you wish to exercise these rights, please contact us at the provided email address.
          </p>

          <h3 className="text-2xl font-semibold mt-6">7. Changes to Privacy Policy</h3>
          <p>
            We reserve the right to update this privacy policy at any time. Any changes will be posted on this page with the updated date. We encourage you to check this page periodically.
          </p>

          <h3 className="text-2xl font-semibold mt-6">8. Contact Us</h3>
          <p>
            If you have any questions or concerns about our privacy practices, please contact us at <strong>support@vintagebookmarket.com</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
