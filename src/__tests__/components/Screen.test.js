import { render } from "@testing-library/react-native";
import { Text } from "react-native";
import Screen from "../../components/Screen";

describe("Screen Wrapper", () => {
  test("render correctly", () => {
    const tree = render(<Screen />);
    expect(tree.getByTestId("screen")).toBeTruthy();
  });
  test("render children correctly", () => {
    const tree = render(
      <Screen>
        <Text>Test</Text>
      </Screen>
    );
    expect(tree.getByText("Test")).not.toBeNull();
  });
});
