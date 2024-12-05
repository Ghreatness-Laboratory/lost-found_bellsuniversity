export interface ReportProps {
  id: number,
  name: string,
  date: {
    day: number,
    month: number,
    year: number
  },
  image: string,
  location: string,
}