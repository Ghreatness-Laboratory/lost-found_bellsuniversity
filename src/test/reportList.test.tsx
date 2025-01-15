import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ReportList from "../components/common/reportList";
import useFetch from "../hooks/useFetch";
import { ReportProps } from "../types/report.types";

jest.mock("../hooks/useFetch");

const mockUseFetch = useFetch as jest.Mock;

describe("ReportList Component", () => {
  const mockData: ReportProps[] = [
    {
      id: 1,
      title: "Lost Wallet",
      location: "Classroom",
      date_reported: "15-8-2024",
      image: "test-image-1.jpg",
      location_name: "",
      status: "",
      description: "",
      reporter: 1,
      phone_number: "",
    },
    {
      id: 2,
      title: "Found Keys",
      location: "Football Field",
      date_reported: "10-9-2024",
      image: "test-image-2.jpg",
      location_name: "",
      status: "",
      description: "",
      reporter: 2,
      phone_number: "",
    },
  ];

  test("renders the loading state", () => {
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(<ReportList />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("renders the error state", () => {
    const mockError = { status: 404, message: "Data not found" };
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: mockError,
    });

    render(<ReportList />);

    expect(
      screen.getByText(`Error ${mockError.status}: ${mockError.message}`)
    ).toBeInTheDocument();
  });

  test("maps and displays fetched data successfully", () => {
    mockUseFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<ReportList />);

    mockData.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.date_reported)).toBeInTheDocument();
    });
  });

  test("displays no results message when no items match search", () => {
    mockUseFetch.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });

    render(<ReportList />);

    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "Nonexistent Item" } });

    expect(screen.getByText("No Results Found")).toBeInTheDocument();
  });

  test("paginates through data correctly", () => {
    // Mock the fetched data with more than `itemsPerPage`
    const paginatedData = Array.from({ length: 8 }, (_, i) => ({
      id: i + 1,
      name: `Item ${i + 1}`,
      location: `Location ${i + 1}`,
      date: { day: i + 1, month: 9, year: 2024 },
      image: `test-image-${i + 1}.jpg`,
    }));
    mockUseFetch.mockReturnValue({
      data: paginatedData,
      loading: false,
      error: null,
    });

    render(<ReportList />);

    // Assert that the first 6 items are displayed (itemsPerPage = 6)
    paginatedData.slice(0, 6).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    // Simulate clicking the "Next" button
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // Assert that the remaining items are displayed
    paginatedData.slice(6).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });

    // Simulate clicking the "Previous" button
    const prevButton = screen.getByText("Previous");
    fireEvent.click(prevButton);

    // Assert that the first 6 items are displayed again
    paginatedData.slice(0, 6).forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
