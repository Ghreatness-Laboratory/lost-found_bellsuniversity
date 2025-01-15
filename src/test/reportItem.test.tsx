import React from "react";
import { render, screen } from "@testing-library/react";
import ReportItem from "../components/common/reportItem";

describe("ReportItem Component", () => {
  // Mock data for testing
  const mockProps = {
    title: "Lost Wallet",
    date_reported: "15-8-2024",
    image: "test-image.jpg",
  };

  test("should render ReportItem component", () => {
    render(<ReportItem />);
    const reportItem = screen.getByTestId("report-item");
    expect(reportItem).toBeInTheDocument();
  });

  test("should render image with correct src and alt text", () => {
    render(<ReportItem image={mockProps.image} />);
    const reportItemImage = screen.getByAltText("Lost and Found Item");
    expect(reportItemImage).toBeInTheDocument();
    expect(reportItemImage).toHaveAttribute("src", mockProps.image);
  });

  test("should render name and date passed as props", () => {
    render(
      <ReportItem
        title={mockProps.title}
        date_reported={mockProps.date_reported}
      />
    );
    const reportItemName = screen.getByText(mockProps.title);
    expect(reportItemName).toBeInTheDocument();

    const reportItemDate = screen.getByText(mockProps.date_reported);
    expect(reportItemDate).toBeInTheDocument();
  });
});
