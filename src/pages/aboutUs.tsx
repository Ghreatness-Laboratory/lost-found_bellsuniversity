import React, { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import MisplaceMeLogo from "../assets/images/misplaceme logo icon main@4x.png";
import { universities } from "../components/common/navbar";

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const AboutUs: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [currentPhone, setCurrentPhone] = useState<string>("");
  const [currentSocialMedia, setCurrentSocialMedia] =
    useState<SocialMediaLinks>({});

  useEffect(() => {
    const userUniversity = "bells";
    const currentUniversity = universities.find(
      (uni) => uni.uni === userUniversity
    );

    if (currentUniversity) {
      setCurrentEmail(currentUniversity.email);
      setCurrentPhone(currentUniversity.phoneNumber);
      setCurrentSocialMedia(currentUniversity.socialMedia);
    }
  }, []);

  return (
    <div data-testid="about-us-page" className="max-md:py-10 pb-10">
      <div className="max-w-6xl mx-auto max-md:py-8 pb-8">
        <div className="flex items-center justify-between px-4">
          <div className="md:max-w-[650px]">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Reconnecting What&apos;s Lost
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              At MisplaceMe, we&apos;re dedicated to reuniting people with their
              valuable belongings through innovative technology and community
              collaboration.
            </p>
          </div>
          <div className="hidden md:block md:max-w-[400px] w-full">
            <img
              src={MisplaceMeLogo}
              className="h-[400px] w-full object-cover shadow-xl rounded-full"
              alt="Lost and Found"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold  mb-8 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Report",
              description:
                "Found an item or lost one? Submit a detailed report on our platform, and we'll start the search process immediately.",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              ),
            },
            {
              title: "Match",
              description:
                "Our smart system matches reports and connects finders with owners securely and efficiently.",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
            },
            {
              title: "Reunite",
              description:
                "Experience the joy of recovering lost items or helping others find their belongings.",
              icon: (
                <svg
                  className="w-12 h-12 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
            },
          ].map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 md:p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-6">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Integrity",
                description:
                  "We ensure honesty and transparency in every interaction and operation.",
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
              },
              {
                title: "Empathy",
                description:
                  "We treat every case with care, understanding the sentimental value of lost items.",
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Innovation",
                description:
                  "We continuously enhance our platform to better serve you.",
                icon: (
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <div key={index} className="border rounded-lg p-4 md:p-8 text-center">
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-10 md:py-12">
        <div className="">
          <div className="flex max-md:flex-col justify-between gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Get in Touch
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="w-12 h-12 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-600">{currentPhone}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>
                  <span className="text-gray-600">{currentEmail}</span>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-3xl font-semibold mb-4 text-gray-800">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  {currentSocialMedia.facebook && (
                    <a
                      href={currentSocialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 rounded-full p-2"
                    >
                      <FaFacebook
                        className="text-blue-600 hover:text-blue-800"
                        size={20}
                      />
                    </a>
                  )}
                  {currentSocialMedia.twitter && (
                    <a
                      href={currentSocialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 rounded-full p-2"
                    >
                      <FaTwitter
                        className="text-blue-400 hover:text-blue-600"
                        size={20}
                      />
                    </a>
                  )}
                  {currentSocialMedia.instagram && (
                    <a
                      href={currentSocialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 rounded-full p-2"
                    >
                      <FaInstagram
                        className="text-pink-500 hover:text-pink-700"
                        size={20}
                      />
                    </a>
                  )}
                  {currentSocialMedia.linkedin && (
                    <a
                      href={currentSocialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-50 rounded-full p-2"
                    >
                      <FaLinkedin
                        className="text-blue-700 hover:text-blue-900"
                        size={20}
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
