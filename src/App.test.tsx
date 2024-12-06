import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";

test("renders Bells University Lost and Found heading", () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const headingElement = screen.getByRole("heading", {
    name: /Welcome to Bells University Lost and Found/i,
  });
  expect(headingElement).toBeInTheDocument();
});
