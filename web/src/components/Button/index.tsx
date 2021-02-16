import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...other }) => (
  <Container type="button" {...other}>
    {loading ? 'Loading...' : children}
  </Container>
);

export default Button;
