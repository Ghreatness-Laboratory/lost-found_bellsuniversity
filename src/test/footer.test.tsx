import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/common/footer";

describe("Footer Component", () => {
  test("renders Terms & Conditions link", () => {
    render(<Footer />);

    const termsLink = screen.getByText(/Terms & Conditions/i);
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveClass("cursor-pointer");
    expect(termsLink).toHaveClass("underline");
  });

  test("renders Privacy Policy link", () => {
    render(<Footer />);

    const privacyLink = screen.getByText(/Privacy policy/i);
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveClass("cursor-pointer");
    expect(privacyLink).toHaveClass("underline");
  });

  test("renders MisplaceMe", () => {
    render(<Footer />);

    const brandName = screen.getByText(/MisplaceMe/i);
    expect(brandName).toBeInTheDocument();
    expect(brandName).toHaveClass("font-medium");
  });

  test("renders MisplaceMe logo image", () => {
    render(<Footer />);

    const logoImage = screen.getByAltText(/misplaceme logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      expect.stringContaining("misplaceme logo icon main@4x.png")
    );
  });
});
