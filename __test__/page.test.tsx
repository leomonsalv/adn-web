// __test__/page.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import { CounterStoreProvider } from "@/providers/counter-store-provider"; // Adjust the import path as needed

describe("Page", () => {
  it("renders a heading", () => {
    render(
      <CounterStoreProvider>
        <Page />
      </CounterStoreProvider>,
    );

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
