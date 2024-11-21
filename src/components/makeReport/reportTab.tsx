import { FaEdit, FaTrash } from "react-icons/fa";
import LostItemImage from '../../assets/images/close-up-black-smartwatch 1.png';
import Item from "../common/item";

interface ReportsProps {
  name: string,
  date: object,
  image: string,
  status: string,
}

const reports: ReportsProps[] = [
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 13, month: 11, year: 24 },
    image: LostItemImage,
    status: 'pending',
  },
  {
    name: 'Found Iphone At Football Field',
    date: { day: 23, month: 8, year: 24 },
    image: LostItemImage,
    status: 'seen',
  },
  {
    name: 'Found wristwatch At Classroom',
    date: { day: 12, month: 9, year: 24 },
    image: LostItemImage,
    status: 'returned',
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reports.map((report, index) => (
              <div key={index}>
                <Item
                  name={report.name}
                  image={report.image}
                  children={
                    <div className="flex flex-col gap-1">
                      <p>{report.name}</p>
                      <div className="flex items-center justify-between w-full">
                        <p>Status: <span className="font-semibold">{report.status}</span></p>
                        <div className="flex gap-4 text-sm">
                          <div className="flex items-center gap-1 cursor-pointer">
                            <FaEdit className="text-gray-500"/>
                            <p >Edit</p>
                          </div>
                          <div className="flex items-center gap-1 cursor-pointer">
                            <FaTrash className="text-gray-500"/>
                            <p>Delete</p>
                          </div>
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