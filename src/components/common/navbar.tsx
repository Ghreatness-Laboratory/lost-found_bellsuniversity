import { useState } from 'react';
import bellsLogo from '../../assets/images/bells-university-of-technology-logo-transparent 1.svg';

interface NavbarProps {
  uni?: string,
  logo?: string,
}

interface NavbarMenuProps {
  menu: string,
  href: string
}

const uni: NavbarProps[] = [
  {
    uni: 'bells',
    logo: bellsLogo,
  },
]

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
  {
    menu: 'Contact us',
    href: '/contact-us'
  }
]

const Navbar = ({ }: NavbarProps) => {
  const [selectedMenu, setSelectedMenu] = useState<number | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const pathName = window.location.pathname
  const isMenuActive = "text-blue-600 transition ease duration-100ms"

  const handleOpenForMobileMenu = () => {
    setMobileMenu(true)
  }

  const handleCloseForMobileMenu = () => {
    setMobileMenu(false)
  }
  return (
    <nav className="py-3 sm:py-5 px-4 sm:px-10">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-1.5'>
          <span className="sr-only">Bells Logo</span>
          <img
            src={bellsLogo}
            alt="Bells Logo"
            width={100}
            height={90}
            className='w-10 h-10 lg:w-16 lg:h-16'
          />
          <p className="hidden sm:block font-bold text-xl lg:text-2xl text-center lg:pl-[19px] lg:pr-[29px]">BELLS LOST and FOUND</p>
        </div>

        <div className="flex items-center py-1 md:py-[22px] gap-5">
          <ul className="hidden xl:flex gap-6 items-center ">
            <span className="sr-only">Destop and Tablet Menu</span>
            {navbarMenu.map((menu, index) => {
              const isActive = pathName === menu.href
              return (
                <li
                  key={index}
                  onClick={() => { setSelectedMenu(index) }}
                  className={`py-2 font-normal text-base cursor-pointer border-b-2 border-b-white hover:border-b-2 hover:border-b-blue-600 hover:text-blue-600 transition ease duration-200ms ${isActive ? isMenuActive : ""}`}
                >
                  {menu.menu}
                </li>
              )
            })}
          </ul>

          {mobileMenu &&
            <nav className='fixed top-0 left-0 bg-white z-10 w-full'>
              <div
                onClick={handleCloseForMobileMenu}
                className='block lg:hidden cursor-pointer'
              >
                <svg className="absolute right-3 md:right-8  top-5 md:top-12" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z" fill="#1E1E1E" />
                </svg>
              </div>
              <ul className="flex flex-col gap-6 pl-4 py-8 md:py-20">
                <span className="sr-only">Mobile Menu</span>
                {navbarMenu.map((menu, index) => {
                  const isActive = pathName === menu.href
                  return (
                    <li
                      key={index}
                      onClick={() => { setSelectedMenu(index) }}
                      className={`py-1 md:py-2 pl-4 font-normal text-base cursor-pointer border-l-2 border-l-white md:border-b-2 md:border-b-white active:border-l-blue-600 md:hover:border-b-blue-600 active:text-blue-600 md:hover:text-blue-600 transition ease duration-200ms ${isActive ? isMenuActive : ""}`}
                    >
                      {menu.menu}
                    </li>
                  )
                })}
              </ul>
              <div>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M11 3H14V6H11V3ZM11 10.5H14V13.5H11V10.5ZM11 18H14V21H11V18Z" fill="#1E1E1E" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar;