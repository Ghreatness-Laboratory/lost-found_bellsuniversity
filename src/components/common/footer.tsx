
const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row-reverse gap-2 md:gap-10 items-center justify-center border-t-[2px] py-2 md:py-4">
      <div className="flex justify-center gap-4 lg:gap-10 text-base md:text-lg font-normal">
        <p className="cursor-pointer active:text-blue-700 underline">Terms & Conditions</p>
        <p className="cursor-pointer active:text-blue-700 underline">Privacy policy</p>
      </div>

      <div className="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 250 250" fill="none">
          <path d="M215.691 34.3047C180.363 -1.01953 123.082 -1.01953 87.7539 34.3047C54.9414 67.125 52.6562 118.855 80.8047 154.363L73.4101 161.758L67.2695 155.617L17.0937 205.789C14.1484 203.918 11.8789 203.117 10.9531 204.051L8.20699 206.789C3.74215 211.254 38.7461 246.266 43.2109 241.797L45.957 239.055C46.8867 238.129 46.0781 235.855 44.2148 232.902L94.3867 182.734L88.2422 176.594L95.6406 169.203C131.152 197.355 182.871 195.066 215.695 162.25C251.016 126.918 251.023 69.6406 215.691 34.3047ZM205.031 151.586C175.586 181.023 127.855 181.031 98.4179 151.586C68.9765 122.152 68.9765 74.4062 98.4179 44.9727C127.848 15.5312 175.594 15.5312 205.031 44.9727C234.469 74.4141 234.461 122.145 205.031 151.586Z" fill="#0D99FF" />
          <path d="M216.082 93.3672C212.836 101.986 207.79 109.815 201.281 116.332C175.84 141.777 134.578 141.777 109.125 116.32C98.3649 105.597 91.711 91.4363 90.3244 76.3086C81.5119 99.5469 86.4181 126.801 105.129 145.512C130.578 170.961 171.84 170.961 197.289 145.512C211.563 131.25 217.817 112.008 216.082 93.3672Z" fill="#0D99FF" />
        </svg>
        <p className="font-medium text-base md:text-lg">MisplaceMe</p>
      </div>
    </footer>
  )
}

export default Footer;