import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/pages/App";

test("renders the Home Page", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  const headingElement = await screen.findByTestId("home-page");
  expect(headingElement).toBeInTheDocument();
});
