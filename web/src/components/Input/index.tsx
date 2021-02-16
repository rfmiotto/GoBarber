import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons/lib';
import { FiAlertTriangle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  containerStyle = [],
  ...other
}) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // NEVER USE function INSIDE OF A COMPONENT! USE THE useCallback HOOK INSTEAD!
  // function handleInputBlur() {
  //   setIsFocused(false);
  // }

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);

    // the line above is equivalent to:
    // if (inputRef.current?.value) {
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }
  }, []);

  const handleInputFocous = useCallback(() => {
    setIsFocused(true);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName, // use fieldName because the name from props may be changed
      ref: inputRef.current, // reference object in the DOM (document.getElement)
      path: 'value', // from where unform will get the form input value
    });
  }, [fieldName, registerField]);

  return (
    <Container
      style={containerStyle}
      hasError={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={16} />}
      <input
        onFocus={handleInputFocous}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...other}
      />

      {error && (
        <Error title={error}>
          <FiAlertTriangle size={16} />
        </Error>
      )}
    </Container>
  );
};

export default Input;
