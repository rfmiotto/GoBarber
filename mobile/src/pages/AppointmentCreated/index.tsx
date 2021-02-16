import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import enUS from 'date-fns/locale/en-US';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface IRouteParams {
  provider_id: string;
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();

  const { params } = useRoute();
  const routeParams = params as IRouteParams;

  const handlePressOK = useCallback(() => {
    reset({
      routes: [
        { name: 'Dashboard' },
        {
          name: 'CreateAppointment',
          params: { provider_id: routeParams.provider_id },
        },
      ],
      index: 1,
    });
  }, [reset, routeParams.provider_id]);

  const formattedDate = useMemo(() => {
    return format(routeParams.date, "HH:mm'h' EEEE',' MMMM',' dd", {
      locale: enUS,
    });
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04d361" />

      <Title>Schedule Confirmation</Title>
      <Description>
        {`You have just confirmed a new schedule for ${formattedDate}`}
      </Description>

      <OkButton onPress={handlePressOK}>
        <OkButtonText>OK</OkButtonText>
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
