/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { faker } from "@faker-js/faker";
import api from "../../services/api";
import Food, { FoodProps } from ".";

jest.mock("../../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("Component: Food", () => {
    const defaultProps: FoodProps = {
        food: {
            id: faker.datatype.number(),
            available: true,
            description: faker.lorem.words(),
            image: faker.internet.avatar(),
            name: faker.lorem.words(),
            price: faker.datatype.number().toString(),
        },
        handleDelete: jest.fn(),
        handleEditFood: jest.fn(),
    };
    it("should render the food properties correctly", () => {
        render(<Food {...defaultProps} />);
        const name = screen.getByText(defaultProps.food.name);
        const image = screen.getByRole("img", { name: defaultProps.food.name });
        const description = screen.getByText(defaultProps.food.description);
        const price = screen.getByText(defaultProps.food.price);

        expect(name).toBeInTheDocument();
        expect(image).toBeInTheDocument();
        expect(description).toBeInTheDocument();
        expect(price).toBeInTheDocument();
    });

    it("should render the food with the available state if the food available property is true", () => {
        render(<Food {...defaultProps} />);
        const availableText = screen.getByText("Disponível");
        const checkbox = screen.getByRole("checkbox");

        expect(availableText).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    it("should render the food with the not available state if the food available property is false", () => {
        render(
            <Food
                {...defaultProps}
                food={{
                    ...defaultProps.food,
                    available: false,
                }}
            />
        );

        const unavailableText = screen.getByText("Indisponível");
        const checkbox = screen.getByRole("checkbox");

        expect(unavailableText).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    describe("actions", () => {
        it("should call the handleEditFood prop callback with the food data when the edit button is pressed", () => {
            const handleEditFood = jest.fn();
            render(<Food {...defaultProps} handleEditFood={handleEditFood} />);
            const editButton = screen.getByRole("button", { name: "editar" });
            userEvent.click(editButton);

            expect(handleEditFood).toHaveBeenCalledWith(defaultProps.food);
        });

        it("should call the handleDelete prop callback with the food id when the edit button is pressed", () => {
            const handleDelete = jest.fn();
            render(<Food {...defaultProps} handleDelete={handleDelete} />);
            const deleteButton = screen.getByRole("button", {
                name: "excluir",
            });
            userEvent.click(deleteButton);

            expect(handleDelete).toHaveBeenCalledWith(defaultProps.food.id);
        });

        it("should call the api put with the toggled avaiable when changing the food avaiable", async () => {
            const spy = jest.spyOn(mockedApi, "put");
            render(<Food {...defaultProps} />);

            const checkbox = screen.getByRole("checkbox");

            await act(async () => {
                userEvent.click(checkbox);
            });

            expect(spy).toHaveBeenCalledWith(`/foods/${defaultProps.food.id}`, {
                ...defaultProps.food,
                available: !defaultProps.food.available,
            });
        });
    });
});
