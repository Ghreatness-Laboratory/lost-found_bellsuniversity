import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/common/footer";

describe("Footer Component", () => {
  test("renders Terms & Conditions link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const termsLink = screen.getByText(/Terms & Conditions/i);
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveClass("cursor-pointer");
  });

  test("renders Privacy Policy link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const privacyLink = screen.getByText(/Privacy policy/i);
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveClass("cursor-pointer");
  });

  test("renders MisplaceMe", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const brandName = screen.getByRole("heading");
    expect(brandName).toBeInTheDocument();
  });

  test("renders MisplaceMe logo image", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const logoImage = screen.getByAltText(/misplaceme logo/i);
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      expect.stringContaining("misplaceme logo icon main@4x.png")
    );
  });
});
