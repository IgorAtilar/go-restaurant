import { render, screen } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import DashboardLayout, { DashboardProps } from ".";
import { IFood } from "../../shared/interfaces/food.interface";

const fakeFoods: IFood[] = [
    {
        id: faker.datatype.number(),
        available: faker.datatype.boolean(),
        description: faker.lorem.words(),
        image: faker.internet.avatar(),
        name: faker.lorem.words(),
        price: faker.datatype.number().toString(),
    },
    {
        id: faker.datatype.number(),
        available: faker.datatype.boolean(),
        description: faker.lorem.words(),
        image: faker.internet.avatar(),
        name: faker.lorem.words(),
        price: faker.datatype.number().toString(),
    },
    {
        id: faker.datatype.number(),
        available: faker.datatype.boolean(),
        description: faker.lorem.words(),
        image: faker.internet.avatar(),
        name: faker.lorem.words(),
        price: faker.datatype.number().toString(),
    },
];

describe("Layout: Dashboard", () => {
    const defaultProps: DashboardProps = {
        addFoodModalIsOpen: false,
        editFoodModalIsOpen: false,
        editingFood: {} as IFood,
        foods: [],
        onAddFood: jest.fn(),
        onDeleteFood: jest.fn(),
        onEditFood: jest.fn(),
        onUpdateFood: jest.fn(),
        toggleAddFoodModal: () => {},
        toggleEditFoodModal: () => {},
    };
    it("should render the foods array passed by the foods prop", () => {
        render(<DashboardLayout {...defaultProps} foods={fakeFoods} />);

        fakeFoods.forEach((food) => {
            const foodComponent = screen.getByText(food.name);
            expect(foodComponent).toBeInTheDocument();
        });
    });
});
