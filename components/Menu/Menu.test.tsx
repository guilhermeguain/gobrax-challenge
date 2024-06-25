import { render, screen } from "@testing-library/react-native";

import { Menu } from "./";

describe("Component: Menu", () => {
  const links = [
    { href: "/", text: "Motoristas" },
    { href: "/vehicles", text: "Veículos" },
  ];

  it("renders correctly", () => {
    const { toJSON } = render(<Menu />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("contains all links with correct text", () => {
    render(<Menu />);

    links.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeTruthy();
    });
  });
});
