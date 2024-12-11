import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../components/common/navbar";

// Mock the required dependencies
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "/",
  }),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Navbar Component", () => {
  const mockHandleNavClick = jest.fn();

  const renderComponent = (props = {}) => {
    const defaultProps = {
      isNavbarOpen: false,
      handleNavClick: mockHandleNavClick,
    };

    return render(
      <Router>
        <Navbar {...defaultProps} {...props} />
      </Router>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders university logo", () => {
    renderComponent();
    const logo = screen.getByAltText("University Logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders MisplaceMe", () => {
    renderComponent();
    expect(screen.getByText("MisplaceMe")).toBeInTheDocument();
  });

  test("renders desktop menu", () => {
    renderComponent();
    const menuItems = ["Home", "About Us"];
    menuItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("renders login button when not logged in", () => {
    renderComponent();
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  test("mobile menu toggle works", () => {
    renderComponent({ isNavbarOpen: true });

    // Find and click close button
    const closeButton = screen.getByTestId("close-menu");
    fireEvent.click(closeButton);

    expect(mockHandleNavClick).toHaveBeenCalledTimes(1);
  });

  test("should render social media links correctly", () => {
    renderComponent({ isNavbarOpen: true });

    const socialMediaLinks = screen.getAllByTestId("social-media-link");
    expect(socialMediaLinks.length).toBeGreaterThan(0);

    socialMediaLinks.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });

  test("navigation links have correct href attributes", () => {
    renderComponent();

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveAttribute("href", "/");

    const aboutUsLink = screen.getByText("About Us");
    expect(aboutUsLink).toHaveAttribute("href", "/about-us");
  });

  test("hamburger menu toggle works on mobile", () => {
    renderComponent();

    const hamburgerMenu = screen.getByTestId("hamburger-menu");
    fireEvent.click(hamburgerMenu);

    expect(mockHandleNavClick).toHaveBeenCalledTimes(1);
  });
});
