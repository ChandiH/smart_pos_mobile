import { render } from "@testing-library/react-native";
import { Formik } from "formik";
import { FormPicker } from "../../components/forms";

describe("FormPicker", () => {
  test("renders select option correctly", () => {
    const tree = render(
      <Formik initialValues={{ test: "testing" }}>
        <FormPicker name="test" />
      </Formik>
    );
    expect(tree).not.toBeNull();
  });
});
