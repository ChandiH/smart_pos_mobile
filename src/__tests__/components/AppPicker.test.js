import { render } from "@testing-library/react-native";
import AppPicker from "../../components/AppPicker";

describe("App Picker", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(<AppPicker selectedItem={jest.fn()} />);
    expect(getByTestId("picker")).toBeTruthy();
  });
});
