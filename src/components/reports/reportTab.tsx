import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";
import LostItemImage from '../../assets/images/male-hand-holding-glasses-isolated 1.png';
import Item from "../common/item";

interface ReportsProps {
  name: string,
  date: {
    day: number,
    month: number,
    year: number
  },
  image: string,
  status: string,
  location: string,
}

export const reports: ReportsProps[] = [
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 13, month: 11, year: 24 },
    image: LostItemImage,
    status: 'pending',
    location: 'Classroom',
  },
  {
    name: 'Found Iphone At Football Field',
    date: { day: 23, month: 8, year: 24 },
    image: LostItemImage,
    status: 'seen',
    location: 'Football Field',
  },
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 12, month: 9, year: 24 },
    image: LostItemImage,
    status: 'returned',
    location: 'Classroom',
  },
]

const ReportTab = () => {
  return (
    <div>
      {reports.length == 0 ?
        (
          <div className="flex flex-col gap-5 items-center justify-center text-xl font-semibold flex-wrap min-h-[53vh]">
            <svg className="w-16 h-16 text-blue-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 250 250" fill="none">
              <path d="M215.691 34.3047C180.363 -1.01953 123.082 -1.01953 87.7539 34.3047C54.9414 67.125 52.6562 118.855 80.8047 154.363L73.4101 161.758L67.2695 155.617L17.0937 205.789C14.1484 203.918 11.8789 203.117 10.9531 204.051L8.20699 206.789C3.74215 211.254 38.7461 246.266 43.2109 241.797L45.957 239.055C46.8867 238.129 46.0781 235.855 44.2148 232.902L94.3867 182.734L88.2422 176.594L95.6406 169.203C131.152 197.355 182.871 195.066 215.695 162.25C251.016 126.918 251.023 69.6406 215.691 34.3047ZM205.031 151.586C175.586 181.023 127.855 181.031 98.4179 151.586C68.9765 122.152 68.9765 74.4062 98.4179 44.9727C127.848 15.5312 175.594 15.5312 205.031 44.9727C234.469 74.4141 234.461 122.145 205.031 151.586Z" fill="#0D99FF" />
              <path d="M216.082 93.3672C212.836 101.986 207.79 109.815 201.281 116.332C175.84 141.777 134.578 141.777 109.125 116.32C98.3649 105.597 91.711 91.4363 90.3244 76.3086C81.5119 99.5469 86.4181 126.801 105.129 145.512C130.578 170.961 171.84 170.961 197.289 145.512C211.563 131.25 217.817 112.008 216.082 93.3672Z" fill="#0D99FF" />
            </svg>
            <p> Found any item? Make a report</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <div key={index}>
                <Item
                  name={report.name}
                  imageStyle="rounded-tl-lg rounded-tr-lg border rounded-tl-lg rounded-tr-lg border-b-0"
                  image={report.image}
                  style="flex flex-col gap-0"
                >
                  <div className="flex flex-col gap-1 p-2 md:p-3 border rounded-bl-lg rounded-br-lg">
                    <p className="font-semibold">{report.name}</p>
                    <p>
                      Status: {''}
                      <span
                        className={`font-semibold ${report.status == 'pending' ? 'text-red-500' : ''} ${report.status == 'returned' ? 'text-green-500' : ''} ${report.status == 'seen' ? 'text-green-500' : ''}`}
                      >
                        {report.status}
                      </span>
                    </p>
                    <div className="flex gap-4 justify-between text-sm mt-1">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <FaEdit className="w-4 h-4 text-gray-900" />
                        <p >Edit</p>
                      </div>
                      <div className="flex items-center gap-1 cursor-pointer">
                        <FaTrash className="text-gray-800" />
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </Item>
              </div>
            ))}
          </div>
        )
      }

    </div >
  )
}

export default ReportTab;