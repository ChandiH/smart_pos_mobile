import { render } from "@testing-library/react-native";
import AppButton from "../../components/AppButton";

describe("AppButton", () => {
  test("renders button correctly", () => {
    const tree = render(<AppButton label="test" />);
    const button = tree.getByTestId("button");
    expect(button).toBeTruthy();
  });

  test("renders button title correctly", () => {
    const props = {
      title: "testTitle",
    };
    const { getByText } = render(<AppButton {...props} />);
    expect(getByText(props.title)).toBeTruthy();
  });
});
