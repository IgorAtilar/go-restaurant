import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';
import Input from '.';

describe('Component: Input', () => {
  it('should render the label prop if it is passed', () => {
    const label = faker.lorem.words();
    render(<Input label={label} />);

    const labelComponent = screen.getByText(label);

    expect(labelComponent).toBeInTheDocument();
  });

  it('should render the error state if the error prop is passed', () => {
    const error = faker.lorem.words();
    render(<Input error={error} />);

    const errorComponent = screen.getByText(error);
    const inputContainer = screen.getByTestId('input-container');

    expect(errorComponent).toBeInTheDocument();
    expect(inputContainer).toHaveAttribute('aria-invalid', 'true');
  });
});
