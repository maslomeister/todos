import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../services/store";
import App from "./App";

test("renders todos text and search box", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText(/todos/)).toBeInTheDocument();

  expect(
    screen.getByPlaceholderText("What needs to be done?")
  ).toBeInTheDocument();
});
