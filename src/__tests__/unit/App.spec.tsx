import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/pages/App";

test("renders the Home Page", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );

  // Home Page 컴포넌트가 렌더링되었는지 확인
  const headingElements = screen.getAllByText(/home page/i);
  expect(headingElements[0]).toBeInTheDocument();

  const paragraphElements = screen.getAllByText(/welcome to the home page/i);
  expect(paragraphElements[0]).toBeInTheDocument();
});
