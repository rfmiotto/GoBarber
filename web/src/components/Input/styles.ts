/* eslint-disable */
import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  color: #ff9000;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.hasError &&
    css`
      color: #f66360;
      border-color: #f66360;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #32cd32;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-transition: 'color 9999s ease-out, background-color 9999s ease-out';
      -webkit-transition-delay: 9999s;
    }

    &::placeholder {
      color: #f66360;
    }
  }

  svg {
    margin-right: 8px;
  }
`;

export const Error = styled(Tooltip)`
  height: 18px;
  margin-left: 16px;
  color: #f66360;

  svg {
    margin: 0;
  }

  span {
    background: #f66360;
    color: #fff;

    &::before {
      border-color: #f66360 transparent;
    }
  }
`;
