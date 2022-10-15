import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '.';

describe('Component: Header', () => {
  it('should call the openModal prop callback when the new plate button is pressed', () => {
    const handleOpenModal = jest.fn();

    render(<Header openModal={handleOpenModal} />);

    const button = screen.getByRole('button', { name: 'Novo Prato' });

    userEvent.click(button);

    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
