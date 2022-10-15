import styled from 'styled-components';

export const Container = styled.div`
  background: #f0f0f5;
  border-radius: 8px;
  width: 600px;
  color: #000000;
  padding: 16px;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
  }

  svg {
    color: #c72828;
    cursor: pointer;
  }

  margin-bottom: 16px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  button {
    margin-top: 16px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #41c900;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
