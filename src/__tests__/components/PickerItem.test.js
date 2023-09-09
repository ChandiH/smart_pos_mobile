import { render } from "@testing-library/react-native";
import PickerItem from "../../components/PickerItem";

describe("PickerItem", () => {
  test("renders correctly", () => {
    const tree = render(<PickerItem label="test" />);
    const touchable = tree.getByTestId("touchable");
    expect(touchable).toBeTruthy();
  });

  test("renders label correctly", () => {
    const props = {
      label: "testLabel",
    };
    const { getByText } = render(<PickerItem {...props} />);
    expect(getByText(props.label)).toBeTruthy();
  });
});
