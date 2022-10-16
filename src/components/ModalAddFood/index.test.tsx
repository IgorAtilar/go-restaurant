import { faker } from "@faker-js/faker";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ModalAddFood, { ModalAddFoodProps } from ".";

describe("Component: ModalAddFood", () => {
    const defaultProps: ModalAddFoodProps = {
        handleAddFood: jest.fn(),
        isOpen: true,
        setIsOpen: () => {},
    };

    it("should show the add food form when the isOpen prop is true", () => {
        render(<ModalAddFood {...defaultProps} />);

        const title = screen.getByText("Novo Prato");
        expect(title).toBeInTheDocument();
    });

    it("should call the setIsOpen prop callback when the close button is pressed", () => {
        const handleSetIsOpen = jest.fn();
        render(<ModalAddFood {...defaultProps} setIsOpen={handleSetIsOpen} />);
        const closeButton = screen.getByRole("button", { name: "fechar" });

        userEvent.click(closeButton);

        expect(handleSetIsOpen).toHaveBeenCalledTimes(1);
    });

    it("should call the handleAddFood prop callback with the form values when the form is submitted", async () => {
        const handleAddFood = jest.fn();
        render(
            <ModalAddFood {...defaultProps} handleAddFood={handleAddFood} />
        );

        const imageInput = screen.getByRole("textbox", {
            name: "Imagem do prato *",
        });
        const nameInput = screen.getByRole("textbox", {
            name: "Nome do prato *",
        });
        const priceInput = screen.getByRole("spinbutton", {
            name: "Preço do prato *",
        });
        const descriptionInput = screen.getByRole("textbox", {
            name: "Descrição do prato *",
        });
        const submitButton = screen.getByRole("button", {
            name: "Adicionar Prato",
        });

        const image = faker.internet.url();
        const name = faker.random.words();
        const price = Number(faker.random.numeric());
        const description = faker.random.words();

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            userEvent.type(imageInput, image);
            userEvent.type(nameInput, name);
            userEvent.type(priceInput, String(price));
            userEvent.type(descriptionInput, description);

            userEvent.click(submitButton);
        });

        expect(handleAddFood).toHaveBeenCalledWith({
            image,
            name,
            price,
            description,
        });
    });
});
