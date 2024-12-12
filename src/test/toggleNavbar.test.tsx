import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToggleNavbar from "../components/common/toggleNavbar";

// Wrapper component to provide Router context
const RouterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>;

describe("ToggleNavbar Component", () => {
  test("renders the component and initial state", () => {
    render(<ToggleNavbar />, { wrapper: RouterWrapper });

    const toggleNavbarContainer = screen.getByTestId("toggle-navbar");
    expect(toggleNavbarContainer).toBeInTheDocument();

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toBeInTheDocument();

    const overlay = screen.queryByTestId("overlay");
    expect(overlay).not.toBeInTheDocument();
    expect(navbar).toHaveAttribute("data-navbar-open", "false");
  });

  test("toggles navbar and overlay when clicked", () => {
    render(<ToggleNavbar />, { wrapper: RouterWrapper });

    const hamburgerMenu = screen.getByTestId("hamburger-menu");

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveAttribute("data-navbar-open", "false");

    fireEvent.click(hamburgerMenu);

    expect(navbar).toHaveAttribute("data-navbar-open", "true");

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toBeInTheDocument();

    fireEvent.click(hamburgerMenu);

    expect(navbar).toHaveAttribute("data-navbar-open", "false");
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  test("closes navbar when overlay is clicked", () => {
    render(<ToggleNavbar />, { wrapper: RouterWrapper });

    const hamburgerMenu = screen.getByTestId("hamburger-menu");
    fireEvent.click(hamburgerMenu);

    const navbar = screen.getByTestId("navbar");
    expect(navbar).toHaveAttribute("data-navbar-open", "true");

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(navbar).toHaveAttribute("data-navbar-open", "false");
    expect(screen.queryByTestId("overlay")).not.toBeInTheDocument();
  });

  test("overlay has correct styling and accessibility attributes", () => {
    render(<ToggleNavbar />, { wrapper: RouterWrapper });

    const hamburgerMenu = screen.getByTestId("hamburger-menu");
    fireEvent.click(hamburgerMenu);

    const overlay = screen.getByTestId("overlay");
    expect(overlay).toHaveClass("fixed");
    expect(overlay).toHaveClass("h-[100vh]");
    expect(overlay).toHaveClass("inset-0");
    expect(overlay).toHaveClass("bg-black");
    expect(overlay).toHaveClass("opacity-50");
    expect(overlay).toHaveClass("z-10");
    expect(overlay).toHaveClass("transition-opacity");
    expect(overlay).toHaveClass("duration-300");
    expect(overlay).toHaveClass("ease-in-out");
    expect(overlay).toHaveClass("lg:hidden");

    expect(overlay).toHaveAttribute("aria-label", "Close navigation menu");
  });
});
