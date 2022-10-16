import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal, { ModalProps } from ".";

describe("Component: Modal", () => {
    const defaultProps: Omit<ModalProps, "children"> = {
        isOpen: false,
        onCloseModal: () => {},
    };

    it("should render the children component if the isOpen prop is true", () => {
        const content = faker.lorem.words();
        render(
            <Modal {...defaultProps} isOpen>
                <div>{content}</div>
            </Modal>
        );

        const contentComponent = screen.getByText(content);

        expect(contentComponent).toBeInTheDocument();
    });

    it("should not render the children component if the isOpen prop is false", () => {
        const content = faker.lorem.words();
        render(
            <Modal {...defaultProps} isOpen={false}>
                <div>{content}</div>
            </Modal>
        );

        const contentComponent = screen.queryByText(content);

        expect(contentComponent).not.toBeInTheDocument();
    });

    it("should call the onCloseModal prop callback when thhe overlay is pressed", () => {
        const handleCloseModal = jest.fn();

        render(
            <Modal {...defaultProps} isOpen onCloseModal={handleCloseModal}>
                <div>test-modal</div>
            </Modal>
        );

        const overlay = screen.getByRole("dialog");

        userEvent.click(overlay);

        expect(handleCloseModal).toHaveBeenCalledTimes(1);
    });
});
