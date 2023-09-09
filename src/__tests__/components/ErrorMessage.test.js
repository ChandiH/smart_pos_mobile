import { render } from "@testing-library/react-native";
import ErrorMessage from "./../../components/forms/ErrorMessage";

describe("ErrorMessage", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <ErrorMessage visible={true} error="Error message" />
    );
    expect(getByText("Error message")).toBeTruthy();
  });

  test("does not render when visible is false", () => {
    const { queryByTestId } = render(<ErrorMessage />);
    expect(queryByTestId("error-message")).toBeNull();
  });
});
