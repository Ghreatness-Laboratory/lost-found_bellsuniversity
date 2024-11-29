import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import MisplaceMeLogo from '../assets/images/misplaceme logo icon main@4x.png';
import { universities } from '../components/common/navbar';

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

const AboutUs: React.FC = () => {
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentPhone, setCurrentPhone] = useState<string>('');
  const [currentSocialMedia, setCurrentSocialMedia] = useState<SocialMediaLinks>({});

  useEffect(() => {
    const userUniversity = 'bells';
    const currentUniversity = universities.find((uni) => uni.uni === userUniversity);

    if (currentUniversity) {
      setCurrentEmail(currentUniversity.email);
      setCurrentPhone(currentUniversity.phoneNumber);
      setCurrentSocialMedia(currentUniversity.socialMedia);
    }
  }, []);

  return (
    <div className="mx-4 md:mx-10 pb-10 pt-8 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center mb-10">
          <div className='max-w-20 md:max-w-28 w-full h-20 md:h-28'>
            <img
              src={MisplaceMeLogo}
              alt='MisplaceMe'
              width={100}
              height={100}
              className='object-cover w-full h-full'
            />
          </div>
          <p className="text-lg sm:text-xl text-gray-600">
            At <span className='font-bold text-black text-xl'>MisplaceMe</span>, where we reconnect lost items with their rightful owners. Our mission is to make finding and reporting lost items easier and more effective.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-2 md:mb-4">How It Works</h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left p-4 md:p-0 list-disc md:list-none">
            <li>
              <p className="text-gray-600">
                Found an item or lost one? Submit a report on our platform, and we&apos;ll start the search.
              </p>
            </li>
            <li>
              <p className="text-gray-600">
                We match reports using our smart system and connect the finder with the owner securely.
              </p>
            </li>
            <li>
              <p className="text-gray-600">
                Celebrate the joy of finding what&apos;s lost. It&apos;s that simple with <span className="font-bold">MisplaceMe</span>.
              </p>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-3 md:p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Integrity</h3>
              <p className="text-gray-600">
                We ensure honesty and transparency in every interaction and operation.
              </p>
            </div>
            <div className="bg-white p-3 md:p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Empathy</h3>
              <p className="text-gray-600">
                We treat every case with care, understanding the sentimental value of lost items.
              </p>
            </div>
            <div className="bg-white p-3 md:p-4 border rounded-lg">
              <h3 className="font-semibold text-blue-600 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously enhance our platform to better serve you.
              </p>
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-10 justify-between max-w-sm w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <div className="space-y-3">
              <span className='flex items-center gap-2 active:text-blue-600'>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="17" viewBox="0 0 13 17" fill="none">
                  <path d="M9.1445 10.9569L8.73493 11.2862C8.73493 11.2862 7.76042 12.0682 6.06446 9.10916C4.3685 6.15013 5.34302 5.36817 5.34302 5.36817L5.60067 5.16006C6.23677 4.64996 6.47108 3.68132 6.15149 2.88094L5.49888 1.2462C5.10309 0.255397 4.03824 -0.0671961 3.25079 0.565153L1.83804 1.69888C1.44812 2.01308 1.14293 2.45645 1.06707 2.99886C0.873207 4.38732 0.842765 7.44643 3.1406 11.4568C5.57817 15.7091 8.48731 16.4101 9.7127 16.5053C10.1008 16.5356 10.4739 16.3709 10.799 16.1091L12.0769 15.0827C12.9406 14.3903 13.0097 12.9351 12.2141 12.1857L10.9769 11.0187C10.4546 10.5275 9.71141 10.5019 9.1445 10.9569Z" fill="#0D99FF" />
                </svg>
                <p className='cursor-pointer'>{currentPhone}</p>
              </span>
              <span className='flex items-center gap-3 active:text-blue-600'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15 12" fill="none">
                  <path d="M15 1.5C15 0.675 14.325 0 13.5 0H1.5C0.675 0 0 0.675 0 1.5V10.5C0 11.325 0.675 12 1.5 12H13.5C14.325 12 15 11.325 15 10.5V1.5ZM13.5 1.5L7.5 5.25L1.5 1.5H13.5ZM13.5 10.5H1.5V3L7.5 6.75L13.5 3V10.5Z" fill="#0D99FF" />
                </svg>
                <p className='cursor-pointer'>{currentEmail}</p>
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              {currentSocialMedia.facebook && (
                <a href={currentSocialMedia.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-blue-600 hover:text-blue-800" size={20} />
                </a>
              )}
              {currentSocialMedia.twitter && (
                <a href={currentSocialMedia.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-blue-400 hover:text-blue-600" size={20} />
                </a>
              )}
              {currentSocialMedia.instagram && (
                <a href={currentSocialMedia.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="text-pink-500 hover:text-pink-700" size={20} />
                </a>
              )}
              {currentSocialMedia.linkedin && (
                <a href={currentSocialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-blue-700 hover:text-blue-900" size={20} />
                </a>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutUs;
