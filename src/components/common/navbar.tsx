import { useEffect, useState } from 'react';
import bellsLogo from '../../assets/images/bells-university-of-technology-logo-transparent 1.svg';
import defaultLogo from '../../assets/images/WhatsApp Image 2024-11-19 at 09.25.06_0f465b57.jpg';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface NavbarMenuProps {
  menu: string,
  href: string
}

const navbarMenu: NavbarMenuProps[] = [
  {
    menu: 'Home',
    href: '/'
  },
  {
    menu: 'Reports',
    href: '/reports'
  },
  {
    menu: 'Make a Report',
    href: '/make-a-report'
  },
  {
    menu: 'About Us',
    href: '/about-us'
  },
]

const universities = [
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

const Navbar = () => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null);
  const [currentLogo, setCurrentLogo] = useState<string>(defaultLogo);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [currentPhone, setCurrentPhone] = useState<string>('');
  const [currentSocialMedia, setCurrentSocialMedia] = useState<any>({});
  const [mobileMenu, setMobileMenu] = useState(false);
  const pathName = window.location.pathname;
  const isMenuActive = 'text-blue-600 transition ease duration-100ms'

  const handleOpenForMobileMenu = () => setMobileMenu(true);
  const handleCloseForMobileMenu = () => setMobileMenu(false);

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
    <nav className="py-3 sm:py-5 px-4 sm:px-10">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-1'>
          <span className="sr-only">University Logo</span>
          <img
            src={currentLogo}
            alt="University Logo"
            width={100}
            height={90}
            className='w-10 h-10 lg:w-16 lg:h-16 rounded-full'
          />
          <p className="hidden sm:block font-bold text-xl lg:text-2xl text-center lg:pl-[19px] lg:pr-[29px]">MisplaceMe</p>
        </div>

        <div className="flex items-center py-1 md:py-[22px] gap-5">
          <ul className="hidden xl:flex gap-6 items-center ">
            <span className="sr-only">Destop and Tablet Menu</span>
            {navbarMenu.map((menu, index) => {
              const isActive = pathName === menu.href
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

          {mobileMenu &&
            <nav className='fixed h-full top-0 left-0 bg-white z-10 w-full flex flex-col justify-between py-8'>
              <div>
                <div
                  onClick={handleCloseForMobileMenu}
                  className='block lg:hidden cursor-pointer'
                >
                  <svg className="absolute right-4 md:right-8 top-5 md:top-12" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none">
                    <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#1E1E1E" />
                  </svg>
                </div>
                <ul className="flex flex-col gap-6 pl-4 md:py-20">
                  <span className="sr-only">Mobile Menu</span>
                  {navbarMenu.map((menu, index) => {
                    const isActive = pathName === menu.href
                    return (
                      <Link
                        key={index}
                        to={menu.href}
                        onClick={() => { setSelectedMenu(index) }}
                        className={`py-1 md:py-2 pl-4 font-normal text-base cursor-pointer border-l-2 border-l-white md:border-b-2 md:border-b-white active:border-l-blue-600 md:hover:border-b-blue-600 active:text-blue-600 md:hover:text-blue-600 transition ease duration-200ms ${isActive ? isMenuActive : ""}`}
                      >
                        {menu.menu}
                      </Link>
                    )
                  })}
                  <p className={`py-1 md:py-2 pl-4 font-normal text-base cursor-pointer border-l-2 border-l-white md:border-b-2 md:border-b-white active:border-l-blue-600 md:hover:border-b-blue-600 active:text-blue-600 md:hover:text-blue-600 transition ease duration-200ms ${pathName === '/login' ? isMenuActive : ""}`}>Register</p>
                  <p className={`py-1 md:py-2 pl-4 font-normal text-base cursor-pointer border-l-2 border-l-white md:border-b-2 md:border-b-white active:border-l-blue-600 md:hover:border-b-blue-600 active:text-blue-600 md:hover:text-blue-600 transition ease duration-200ms ${pathName === '/register' ? isMenuActive : ""}`}>Login</p>
                </ul>
              </div>

              <div className='flex flex-col gap-10 pl-10'>
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
            <button className="flex items-center gap-1.5 justify-center cursor-pointer rounded-lg p-2 bg-[rgba(129,129,129,0.06)] backdrop-blur-[2px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5002 3.33337C11.6161 3.33337 10.7683 3.68456 10.1431 4.30968C9.51802 4.93481 9.16683 5.78265 9.16683 6.66671C9.16683 7.55076 9.51802 8.39861 10.1431 9.02373C10.7683 9.64885 11.6161 10 12.5002 10C13.3842 10 14.2321 9.64885 14.8572 9.02373C15.4823 8.39861 15.8335 7.55076 15.8335 6.66671C15.8335 5.78265 15.4823 4.93481 14.8572 4.30968C14.2321 3.68456 13.3842 3.33337 12.5002 3.33337ZM12.5002 4.91671C12.73 4.91671 12.9575 4.96197 13.1699 5.04992C13.3822 5.13786 13.5751 5.26677 13.7376 5.42927C13.9001 5.59177 14.029 5.78469 14.117 5.99701C14.2049 6.20933 14.2502 6.43689 14.2502 6.66671C14.2502 6.89652 14.2049 7.12408 14.117 7.3364C14.029 7.54872 13.9001 7.74164 13.7376 7.90414C13.5751 8.06665 13.3822 8.19555 13.1699 8.2835C12.9575 8.37144 12.73 8.41671 12.5002 8.41671C12.2703 8.41671 12.0428 8.37144 11.8305 8.2835C11.6181 8.19555 11.4252 8.06665 11.2627 7.90414C11.1002 7.74164 10.9713 7.54872 10.8834 7.3364C10.7954 7.12408 10.7502 6.89652 10.7502 6.66671C10.7502 6.20258 10.9345 5.75746 11.2627 5.42927C11.5909 5.10108 12.036 4.91671 12.5002 4.91671ZM3.3335 5.83337V8.33337H0.833496V10H3.3335V12.5H5.00016V10H7.50016V8.33337H5.00016V5.83337H3.3335ZM12.5002 10.8334C10.2752 10.8334 5.8335 11.9417 5.8335 14.1667V16.6667H19.1668V14.1667C19.1668 11.9417 14.7252 10.8334 12.5002 10.8334ZM12.5002 12.4167C14.9752 12.4167 17.5835 13.6334 17.5835 14.1667V15.0834H7.41683V14.1667C7.41683 13.6334 10.0002 12.4167 12.5002 12.4167Z" fill="#1E1E1E" />
              </svg>
              <p className='hidden sm:block'>Register</p>
            </button>
            <button className="flex items-center gap-1.5 justify-center cursor-pointer rounded-lg p-2 bg-[rgba(129,129,129,0.06)] backdrop-blur-[2px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1.0835 9.00004C1.0835 5.26837 1.0835 3.40171 2.24266 2.24254C3.40183 1.08337 5.26766 1.08337 9.00016 1.08337C12.7318 1.08337 14.5985 1.08337 15.7577 2.24254C16.9168 3.40171 16.9168 5.26754 16.9168 9.00004C16.9168 12.7317 16.9168 14.5984 15.7577 15.7575C14.5985 16.9167 12.7327 16.9167 9.00016 16.9167C5.2685 16.9167 3.40183 16.9167 2.24266 15.7575C1.0835 14.5984 1.0835 12.7325 1.0835 9.00004Z" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M13.1976 9.02343H7.38509M7.38509 9.02343C7.38509 9.49843 9.18092 11.0959 9.18092 11.0959M7.38509 9.02343C7.38509 8.5351 9.18092 6.96926 9.18092 6.96926M4.86426 5.6626V12.3293" stroke="#1E1E1E" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <p className='hidden sm:block'>Login</p>
            </button>
            <div
              onClick={handleOpenForMobileMenu}
              className='block lg:hidden cursor-pointer'
            >
              ☰
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar;