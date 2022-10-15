import styled from 'styled-components';

interface ContainerProps {
  isFilled?: boolean;
  isFocused?: boolean;
}

export const Container = styled.div`
  label {
    display: flex;
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 14px;
    color: #3d3d4d;
  }

  margin-bottom: 12px;

  :last-of-type {
    margin-bottom: 0;
  }
`;

export const InputContainer = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  font-size: 16px;
  line-height: 16px;
  border: 1px solid transparent;

  &[aria-invalid='true'] {
    border-color: #c72828;
    caret-color: #c72828;
  }

  :focus-within {
    border-color: #ff9000;
    caret-color: #ff9000;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #3d3d4d;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const ErrorMessage = styled.div`
  color: #c72828;
  font-size: 14px;
  line-height: 14px;
  margin-top: 4px;
`;
