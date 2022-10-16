/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import Dashboard from ".";
import { IFood } from "../../shared/interfaces/food.interface";
import api from "../../services/api";
import userEvent from "@testing-library/user-event";

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

jest.mock("../../services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("Page: Dashboard", () => {
    it("should get the foods from the api on render", async () => {
        const spy = jest.spyOn(mockedApi, "get");
        await act(async () => {
            render(<Dashboard />);
        });
        expect(spy).toHaveBeenCalledWith("/foods");
    });

    it("should render the foods gotten from the api", async () => {
        mockedApi.get.mockResolvedValueOnce({
            data: fakeFoods,
        });

        await act(async () => {
            render(<Dashboard />);
        });

        fakeFoods.forEach((food) => {
            const foodComponent = screen.getByText(food.name);
            expect(foodComponent).toBeInTheDocument();
        });
    });

    it("should call the api post food with the correct params when trying to add a food", async () => {
        const spy = jest.spyOn(mockedApi, "post");
        mockedApi.post.mockResolvedValueOnce({
            data: fakeFoods[0],
        });

        await act(async () => {
            render(<Dashboard />);
        });

        const button = screen.getByRole("button", { name: "Novo Prato" });
        userEvent.click(button);

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

        await act(() => {
            userEvent.type(imageInput, image);
            userEvent.type(nameInput, name);
            userEvent.type(priceInput, String(price));
            userEvent.type(descriptionInput, description);

            userEvent.click(submitButton);
        });

        expect(spy).toHaveBeenCalledWith("/foods", {
            image,
            name,
            price,
            description,
            available: true,
        });
    });

    it("should show the new added food on the list when adding a food", async () => {
        const image = faker.internet.url();
        const name = faker.random.words();
        const price = Number(faker.random.numeric());
        const description = faker.random.words();

        const mockedResponse = {
            id: faker.datatype.number(),
            image,
            name,
            price,
            description,
            available: true,
        };

        mockedApi.post.mockResolvedValueOnce({
            data: mockedResponse,
        });

        await act(async () => {
            render(<Dashboard />);
        });

        const button = screen.getByRole("button", { name: "Novo Prato" });
        userEvent.click(button);

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

        await act(() => {
            userEvent.type(imageInput, image);
            userEvent.type(nameInput, name);
            userEvent.type(priceInput, String(price));
            userEvent.type(descriptionInput, description);

            userEvent.click(submitButton);
        });

        const foodComponent = screen.getByText(mockedResponse.name);
        expect(foodComponent).toBeInTheDocument();
    });

    it("should call the api put food with the correct params when trying to edit a food", async () => {
        const image = faker.internet.url();
        const name = faker.random.words();
        const price = Number(faker.random.numeric());
        const description = faker.random.words();

        const mockedResponse = {
            image,
            name,
            price,
            description,
        };

        mockedApi.put.mockResolvedValueOnce({
            data: { ...fakeFoods[0], ...mockedResponse },
        });

        mockedApi.get.mockResolvedValueOnce({
            data: [fakeFoods[0]],
        });

        const spy = jest.spyOn(mockedApi, "put");

        await act(async () => {
            render(<Dashboard />);
        });

        const editButton = await screen.findByRole("button", {
            name: "editar",
        });

        userEvent.click(editButton);

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
            name: "Editar Prato",
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            userEvent.clear(imageInput);
            userEvent.type(imageInput, image);

            userEvent.clear(nameInput);
            userEvent.type(nameInput, name);

            userEvent.clear(priceInput);
            userEvent.type(priceInput, String(price));

            userEvent.clear(descriptionInput);
            userEvent.type(descriptionInput, description);

            userEvent.click(submitButton);
        });

        expect(spy).toHaveBeenCalledWith(`/foods/${fakeFoods[0].id}`, {
            ...fakeFoods[0],
            ...mockedResponse,
        });
    });

    it("should show the editted food on the list when editting a food", async () => {
        const image = faker.internet.url();
        const name = faker.random.words();
        const price = Number(faker.random.numeric());
        const description = faker.random.words();

        const mockedResponse = {
            image,
            name,
            price,
            description,
        };

        mockedApi.put.mockResolvedValueOnce({
            data: { ...fakeFoods[0], ...mockedResponse },
        });

        mockedApi.get.mockResolvedValueOnce({
            data: [fakeFoods[0]],
        });

        await act(async () => {
            render(<Dashboard />);
        });

        const editButton = await screen.findByRole("button", {
            name: "editar",
        });

        userEvent.click(editButton);

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
            name: "Editar Prato",
        });

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            userEvent.clear(imageInput);
            userEvent.type(imageInput, image);

            userEvent.clear(nameInput);
            userEvent.type(nameInput, name);

            userEvent.clear(priceInput);
            userEvent.type(priceInput, String(price));

            userEvent.clear(descriptionInput);
            userEvent.type(descriptionInput, description);

            userEvent.click(submitButton);
        });

        const foodComponent = screen.getByText(mockedResponse.name);
        expect(foodComponent).toBeInTheDocument();
    });

    it("should call the api delete food with the correct params when trying to delete a food", async () => {
        mockedApi.get.mockResolvedValueOnce({
            data: [fakeFoods[0]],
        });

        const spy = jest.spyOn(mockedApi, "delete");

        await act(async () => {
            render(<Dashboard />);
        });

        const deleteButton = screen.getByRole("button", {
            name: "excluir",
        });

        await act(async () => {
            userEvent.click(deleteButton);
        });

        expect(spy).toHaveBeenCalledWith(`/foods/${fakeFoods[0].id}`);
    });

    it("should remove from the list the deleted food when deleting a food", async () => {
        mockedApi.get.mockResolvedValueOnce({
            data: [fakeFoods[0]],
        });

        await act(async () => {
            render(<Dashboard />);
        });

        const deleteButton = screen.getByRole("button", {
            name: "excluir",
        });

        await act(async () => {
            userEvent.click(deleteButton);
        });

        const foodComponent = screen.queryByText(fakeFoods[0].name);
        expect(foodComponent).not.toBeInTheDocument();
    });

    it("should toggle the add food modal open", async () => {
        await act(async () => {
            render(<Dashboard />);
        });

        const button = screen.getByRole("button", { name: "Novo Prato" });

        userEvent.click(button);

        const modal = screen.getByRole("dialog");

        expect(modal).toBeInTheDocument();

        expect(modal).toHaveTextContent("Novo Prato");

        const closeButton = screen.getByRole("button", { name: "fechar" });

        userEvent.click(closeButton);

        expect(modal).not.toBeInTheDocument();
    });

    it("should toggle the edit food modal open", async () => {
        mockedApi.get.mockResolvedValueOnce({
            data: [fakeFoods[0]],
        });

        await act(async () => {
            render(<Dashboard />);
        });

        const editButton = screen.getByRole("button", { name: "editar" });

        userEvent.click(editButton);

        const modal = screen.getByRole("dialog");

        expect(modal).toBeInTheDocument();

        expect(modal).toHaveTextContent("Editar Prato");

        const closeButton = screen.getByRole("button", { name: "fechar" });

        userEvent.click(closeButton);

        expect(modal).not.toBeInTheDocument();
    });
});
