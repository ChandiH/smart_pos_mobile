import { render, fireEvent } from "@testing-library/react-native";
import PopUpModal from "../../components/PopUpModal";

describe("PopUpModal", () => {
  test("renders modal correctly", () => {
    const tree = render(<PopUpModal />);
    const modal = tree.getByTestId("modal");
    expect(modal).toBeTruthy();
  });

  test("renders container correctly", () => {
    const tree = render(<PopUpModal />);
    const container = tree.getByTestId("container");
    expect(container).toBeTruthy();
  });

  // test("renders children correctly", () => {
  //   const props = {
  //     children: "testChildren",
  //   };
  //   const { getByText } = render(<PopUpModal>{props.children}</PopUpModal>);
  //   expect(getByText(props.children)).not.toBeNull();
  // });

  test("renders modal visible correctly", () => {
    const props = {
      modalVisible: true,
    };
    const { getByTestId } = render(<PopUpModal {...props} />);
    expect(getByTestId("modal").props.visible).toBe(true);
  });
});
