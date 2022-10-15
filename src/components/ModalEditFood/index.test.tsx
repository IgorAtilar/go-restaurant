import { faker } from '@faker-js/faker';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalEditFood, { ModalEditFoodProps } from '.';

describe('Component: ModalEditFood', () => {
  const defaultProps: ModalEditFoodProps = {
    handleUpdateFood: jest.fn(),
    editingFood: {
      id: Number(faker.random.numeric()),
      available: faker.datatype.boolean(),
      description: faker.random.words(),
      image: faker.internet.url(),
      name: faker.random.words(),
      price: faker.random.numeric(),
    },
    isOpen: true,
    setIsOpen: () => {},
  };

  it('should show the add food form when the isOpen prop is true', () => {
    render(<ModalEditFood {...defaultProps} />);

    const title = screen.getAllByText('Editar Prato')[0];
    expect(title).toBeInTheDocument();
  });

  it('should call the setIsOpen prop callback when the close button is pressed', () => {
    const handleSetIsOpen = jest.fn();
    render(<ModalEditFood {...defaultProps} setIsOpen={handleSetIsOpen} />);
    const closeButton = screen.getByRole('button', { name: 'fechar' });

    userEvent.click(closeButton);

    expect(handleSetIsOpen).toHaveBeenCalledTimes(1);
  });

  it('should load the editingFood data on the form fields', () => {
    render(<ModalEditFood {...defaultProps} />);

    const imageInput = screen.getByRole('textbox', {
      name: 'Imagem do prato *',
    });
    const nameInput = screen.getByRole('textbox', { name: 'Nome do prato *' });
    const priceInput = screen.getByRole('spinbutton', {
      name: 'Preço do prato *',
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Descrição do prato *',
    });

    expect(imageInput).toHaveValue(defaultProps.editingFood.image);
    expect(nameInput).toHaveValue(defaultProps.editingFood.name);
    expect(priceInput).toHaveValue(Number(defaultProps.editingFood.price));
    expect(descriptionInput).toHaveValue(defaultProps.editingFood.description);
  });

  it('should call the handleUpdateFood prop callback with the form values when the form is submitted', async () => {
    const handleUpdateFood = jest.fn();
    render(
      <ModalEditFood {...defaultProps} handleUpdateFood={handleUpdateFood} />
    );

    const imageInput = screen.getByRole('textbox', {
      name: 'Imagem do prato *',
    });
    const nameInput = screen.getByRole('textbox', { name: 'Nome do prato *' });
    const priceInput = screen.getByRole('spinbutton', {
      name: 'Preço do prato *',
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Descrição do prato *',
    });
    const submitButton = screen.getByRole('button', {
      name: 'Editar Prato',
    });

    const image = faker.internet.url();
    const name = faker.random.words();
    const price = Number(faker.random.numeric());
    const description = faker.random.words();

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

    expect(handleUpdateFood).toHaveBeenCalledWith({
      ...defaultProps.editingFood,
      image,
      name,
      price,
      description,
    });
  });
});
