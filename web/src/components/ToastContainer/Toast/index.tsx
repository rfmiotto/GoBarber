import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { Container } from './styles';
import { ToastMessage, useToast } from '../../../hooks/toast';

interface ToastProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={16} />,
  error: <FiAlertCircle size={16} />,
  success: <FiCheckCircle size={16} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  // automatically remove toast after some time
  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 2500);

    // if one closes the toast before its timeout, it may give us an error.
    // To avoid this, we use the fact that every function returned from useEffect
    // is executed when the component ceases to exist
    return () => {
      clearTimeout(timer);
    };
  }, [message.id, removeToast]);

  return (
    <Container
      type={message.type}
      hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={16} />
      </button>
    </Container>
  );
};

export default Toast;
