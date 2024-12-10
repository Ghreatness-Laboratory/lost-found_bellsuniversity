import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AppRouter from "../routes/appRouter";

describe("AppRouter Component", () => {
  it("renders the Index page at the root route '/'", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("index-page")).toBeInTheDocument();
  });

  it("renders the Home page at '/home'", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("renders the Login page at '/login'", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });

  it("renders the Reports page at '/reports'", () => {
    render(
      <MemoryRouter initialEntries={["/reports"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("reports-page")).toBeInTheDocument();
  });

  it("renders the Make A Report page at '/make-a-report'", () => {
    render(
      <MemoryRouter initialEntries={["/make-a-report"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("make-a-report-page")).toBeInTheDocument();
  });

  it("renders the About Us page at '/about-us'", () => {
    render(
      <MemoryRouter initialEntries={["/about-us"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("about-us-page")).toBeInTheDocument();
  });

  it("renders the NotFound page for an undefined route", () => {
    render(
      <MemoryRouter initialEntries={["/undefined-route"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByTestId("not-found-page")).toBeInTheDocument();
  });
});
