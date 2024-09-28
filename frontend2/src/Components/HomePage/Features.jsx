import React from "react";

const Features = () => {
  return (
    <section className="bg-blue-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-8">
          Decentralized Voting Features
        </h2>
        <p className="text-lg text-blue-600 mb-12">
          Empowering trust, security, and robustness through blockchain technology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trust Feature */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">Trust</h3>
            <p className="text-blue-600">
              Transparent voting processes are guaranteed by decentralized
              systems, allowing full visibility to voters and stakeholders.
            </p>
          </div>

          {/* Security Feature */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12v7m5 0H7m10-7h2a2 2 0 002-2v-1a2 2 0 00-2-2h-2m0 7a2 2 0 01-2 2H9a2 2 0 01-2-2m12 0V7m0 7h-2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              Security
            </h3>
            <p className="text-blue-600">
              Blockchain ensures votes are immutable and secure from tampering,
              providing verifiable and fraud-proof elections.
            </p>
          </div>

          {/* Robustness Feature */}
          <div className="bg-blue-100 shadow-lg rounded-lg p-6">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7l9 5 9-5-9-5-9 5z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 17l9 5 9-5m-9-5v10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              Robustness
            </h3>
            <p className="text-blue-600">
              Scalable and resilient architecture ensures that voting systems
              can handle high volumes of users while maintaining efficiency and
              accuracy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
