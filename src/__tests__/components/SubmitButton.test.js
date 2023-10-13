import { render } from "@testing-library/react-native";
import { SubmitButton } from "../../components/forms";
import { Formik } from "formik";

describe("SubmitButton", () => {
  test("renders correctly", () => {
    const { getByTestId } = render(
      <Formik onSubmit={jest.fn()}>
        <SubmitButton>children</SubmitButton>
      </Formik>
    );
    expect(getByTestId("submit")).toBeTruthy();
  });
});
