import React, {
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { Container, ErrorMessage, InputContainer } from './styles';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error = undefined, label, ...rest },
  ref
) => {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <InputContainer data-testid='input-container' aria-invalid={!!error}>
        <input ref={ref} id={name} name={name} {...rest} />
      </InputContainer>
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

const Input = forwardRef(InputBase);

export default Input;
