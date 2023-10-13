import { render } from "@testing-library/react-native";
import { Form } from "../../components/forms";

describe("Form", () => {
  test("renders with children correctly", () => {
    const tree = render(<Form>children</Form>);
    expect(tree).not.toBeNull();
  });
});
