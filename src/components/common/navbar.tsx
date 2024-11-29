import React, { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import bellsLogo from '../../assets/images/bells-university-of-technology-logo-transparent 1.svg';
import defaultLogo from '../../assets/images/misplaceme logo icon main@4x.png';

interface NavbarProps {
  isNavbarOpen: boolean,
  handleNavClick: () => void,
}

interface NavbarMenuProps {
  menu: string,
  href: string,
}

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export const universities = [
  {
    uni: 'bells',
    logo: bellsLogo,
    email: 'info@blf.com',
    phoneNumber: '+234 903 876 5498',
    socialMedia: {
      facebook: 'https://facebook.com/bellsuniversity',
      twitter: 'https://twitter.com/bellsuniversity',
      instagram: 'https://instagram.com/bellsuniversity',
      linkedin: 'https://linkedin.com/company/bellsuniversity',
    },
  },
  {
    uni: 'babcock',
    logo: defaultLogo,
    email: 'info@blf.com',
    phoneNumber: '+234 707 266 8014',
    socialMedia: {
      facebook: 'https://facebook.com/babcockuniversity',
      twitter: 'https://twitter.com/babcockuniversity',
      instagram: 'https://instagram.com/babcockuniversity',
      linkedin: 'https://linkedin.com/company/babcockuniversity',
    },
  },
];

const Navbar: React.FC<NavbarProps> = ({ isNavbarOpen, handleNavClick }) => {
  const [, setSelectedMenu] = useState<number | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string>(defaultLogo);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentPhone, setCurrentPhone] = useState<string>('');
  const [currentSocialMedia, setCurrentSocialMedia] = useState<SocialMediaLinks>({});
  const isMenuActive = 'text-blue-600 transition ease duration-100ms'
  const [isLoggedIn,] = useState(false);
  const location = useLocation();

  const navbarMenu: NavbarMenuProps[] = [
    ...(isLoggedIn || location.pathname === '/home' || location.pathname === '/reports' || location.pathname === '/make-a-report' ? [
      {
        menu: "Home",
        href: "/home"
      }] : [{
        menu: "Home",
        href: "/"
      }]),
    ...(isLoggedIn || location.pathname === '/home' || location.pathname === '/reports' || location.pathname === '/make-a-report' ? [
      {
        menu: "Reports",
        href: "/reports"
      }] : []),
    ...(isLoggedIn || location.pathname === '/home' || location.pathname === '/reports' || location.pathname === '/make-a-report' ? [
      {
        menu: "Make a Report",
        href: "/make-a-report"
      }] : []),
    ...(isLoggedIn || location.pathname === '/home' || location.pathname === '/reports' || location.pathname === '/make-a-report' ? [] : [
      {
        menu: "About Us",
        href: "/about-us"
      }])
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const userUniversity = 'bells';
      const currentUniversity = universities.find((uni) => uni.uni === userUniversity);

      if (currentUniversity) {
        setCurrentLogo(currentUniversity.logo);
        setCurrentEmail(currentUniversity.email);
        setCurrentPhone(currentUniversity.phoneNumber);
        setCurrentSocialMedia(currentUniversity.socialMedia);
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="py-3 sm:py-5 px-4 md:px-10 bg-white">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-1'>
          <span className="sr-only">University Logo</span>
          <img
            src={currentLogo}
            alt="University Logo"
            width={100}
            height={90}
            className='w-10 h-10 lg:w-16 lg:h-16 rounded-full'
            aria-required
          />
          <p className="hidden sm:block font-bold text-xl lg:text-2xl text-center lg:pl-[19px] lg:pr-[29px]">MisplaceMe</p>
        </div>

        <div className="flex items-center gap-5">
          <ul className="hidden md:flex gap-6 items-center ">
            <span className="sr-only">Destop and Tablet Menu</span>
            {navbarMenu.map((menu, index) => {
              const isActive = location.pathname === menu.href
              return (
                <Link
                  key={index}
                  to={menu.href}
                  onClick={() => { setSelectedMenu(index) }}
                  className={`py-2 font-normal text-base cursor-pointer border-b-2 border-b-white hover:border-b-2 hover:border-b-blue-600 hover:text-blue-600 transition ease duration-200ms ${isActive ? isMenuActive : ""}`}
                >
                  {menu.menu}
                </Link>
              )
            })}
          </ul>

          {isNavbarOpen &&
            <nav className='fixed bottom-0 top-0 right-0 bg-white z-20 w-[305px] flex flex-col justify-between py-8 pt-8 md:pt-12'>
              <div>
                <div
                  onClick={handleNavClick}
                  className='block lg:hidden cursor-pointer'
                >
                  <svg className="absolute right-4 md:right-8 top-5 md:top-12" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#1E1E1E" />
                  </svg>
                </div>
                <ul className="flex flex-col gap-4 md:gap-6 pt-5 sm:pt-10">
                  <span className="sr-only">Mobile Menu</span>
                  {navbarMenu.map((menu, index) => {
                    const isActive = location.pathname === menu.href
                    return (
                      <Link
                        key={index}
                        to={menu.href}
                        onClick={handleNavClick}
                        className={`py-1 md:py-2 pl-8 font-normal text-base cursor-pointer border-l-2 border-l-white md:border-b-2 md:border-b-white active:border-l-blue-600 md:hover:border-b-blue-600 active:text-blue-600 md:hover:text-blue-600 transition ease duration-200ms ${isActive ? isMenuActive : ""}`}
                      >
                        {menu.menu}
                      </Link>
                    )
                  })}
                </ul>
              </div>

              <div className='flex flex-col gap-10 pl-8'>
                <div className='flex flex-col gap-2'>
                  <p className='font-semibold text-[18px]'>Contact us</p>
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

                <div className='flex flex-col gap-2'>
                  <p className='font-semibold text-[18px]'>Follow us on</p>
                  <div className='flex items-center gap-4'>
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
              </div>
            </nav>
          }

          <div className="flex items-center gap-5">
            {isLoggedIn || location.pathname === '/home' || location.pathname === '/reports' || location.pathname === '/make-a-report' ? (
              <Link to={'/'}>
                <button className="flex items-center gap-1.5 justify-center cursor-pointer rounded-lg p-2 bg-[rgba(129,129,129,0.06)] backdrop-blur-[2px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.0835 9.00004C1.0835 5.26837 1.0835 3.40171 2.24266 2.24254C3.40183 1.08337 5.26766 1.08337 9.00016 1.08337C12.7318 1.08337 14.5985 1.08337 15.7577 2.24254C16.9168 3.40171 16.9168 5.26754 16.9168 9.00004C16.9168 12.7317 16.9168 14.5984 15.7577 15.7575C14.5985 16.9167 12.7327 16.9167 9.00016 16.9167C5.2685 16.9167 3.40183 16.9167 2.24266 15.7575C1.0835 14.5984 1.0835 12.7325 1.0835 9.00004Z" stroke="#1E1E1E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.1976 9.02343H7.38509M7.38509 9.02343C7.38509 9.49843 9.18092 11.0959 9.18092 11.0959M7.38509 9.02343C7.38509 8.5351 9.18092 6.96926 9.18092 6.96926M4.86426 5.6626V12.3293" stroke="#1E1E1E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="hidden sm:block">Logout</p>
                </button>
              </Link>
            ) : (
              <Link to={'/login'}>
                <button className="flex items-center gap-1.5 justify-center cursor-pointer rounded-lg p-2 bg-[rgba(129,129,129,0.06)] backdrop-blur-[2px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M1.0835 9.00004C1.0835 5.26837 1.0835 3.40171 2.24266 2.24254C3.40183 1.08337 5.26766 1.08337 9.00016 1.08337C12.7318 1.08337 14.5985 1.08337 15.7577 2.24254C16.9168 3.40171 16.9168 5.26754 16.9168 9.00004C16.9168 12.7317 16.9168 14.5984 15.7577 15.7575C14.5985 16.9167 12.7327 16.9167 9.00016 16.9167C5.2685 16.9167 3.40183 16.9167 2.24266 15.7575C1.0835 14.5984 1.0835 12.7325 1.0835 9.00004Z" stroke="#1E1E1E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.1976 9.02343H7.38509M7.38509 9.02343C7.38509 9.49843 9.18092 11.0959 9.18092 11.0959M7.38509 9.02343C7.38509 8.5351 9.18092 6.96926 9.18092 6.96926M4.86426 5.6626V12.3293" stroke="#1E1E1E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="hidden sm:block">Login</p>
                </button>
              </Link>
            )}

            <div className="block md:hidden cursor-pointer">
              <div onClick={handleNavClick} className="cursor-pointer">
                {isNavbarOpen ? (
                  <svg width="18" height="15" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L17 17M17 1L1 17" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0683594 1.50454C0.0683594 1.14162 0.362565 0.847412 0.725486 0.847412H16.4965C16.8594 0.847412 17.1536 1.14162 17.1536 1.50454C17.1536 1.86746 16.8594 2.16166 16.4965 2.16166H0.725486C0.362565 2.16166 0.0683594 1.86746 0.0683594 1.50454ZM0.0683594 7.63772C0.0683594 7.2748 0.362565 6.98059 0.725486 6.98059H16.4965C16.8594 6.98059 17.1536 7.2748 17.1536 7.63772C17.1536 8.00064 16.8594 8.29484 16.4965 8.29484H0.725486C0.362565 8.29484 0.0683594 8.00064 0.0683594 7.63772ZM0.725486 13.1138C0.362565 13.1138 0.0683594 13.408 0.0683594 13.7709C0.0683594 14.1338 0.362565 14.428 0.725486 14.428H16.4965C16.8594 14.428 17.1536 14.1338 17.1536 13.7709C17.1536 13.408 16.8594 13.1138 16.4965 13.1138H0.725486Z" fill="black" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;