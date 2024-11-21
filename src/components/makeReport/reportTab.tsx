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
          <div className="text-center min-h-[60vh]">
            Found any item? Make a report
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report, index) => (
              <div key={index}>
                <Item
                  name={report.name}
                  imageStyle="rounded-tl-lg rounded-tr-lg"
                  image={report.image}
                  style="flex flex-col gap-0"
                  children={
                    <div className="flex flex-col gap-1 p-3 border rounded-bl-lg rounded-br-lg">
                      <p>{report.name}</p>
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
                    </div>}
                />
              </div>
            ))}
          </div>
        )
      }

    </div >
  )
}

export default ReportTab;