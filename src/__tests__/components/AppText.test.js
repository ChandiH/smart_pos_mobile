import { render } from "@testing-library/react-native";
import AppText from "../../components/AppText";

describe("AppText", () => {
  test("render children correctly", () => {
    const tree = render(<AppText>Test</AppText>);
    expect(tree.getByText("Test")).not.toBeNull();
  });
});
