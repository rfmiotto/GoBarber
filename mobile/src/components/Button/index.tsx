/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling - children is missing props validation

import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface IButtonProps extends RectButtonProps {
  children: string;
}

const Button: React.FC<IButtonProps> = ({ children, ...others }) => {
  return (
    <Container {...others}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
