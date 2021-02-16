import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiPower } from 'react-icons/fi';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';

import logoImg from '../../assets/logo.svg';
import avatar from '../../assets/avatar.svg';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  formattedHour: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day);
      }
    },
    [],
  );

  const handleMonthChange = useCallback(
    (month: Date) => {
      setCurrentMonth(month);
    },
    [],
  );

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      },
    }).then(response => {
      setMonthAvailability(response.data);
    });
  }, [currentMonth, user.id]);

  useEffect(() => {
    api.get<Appointment[]>('/appointments/me', {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      },
    }).then(response => {
      const formattedAppointments = response.data.map(appointment => ({
        ...appointment,
        formattedHour: format(parseISO(appointment.date), 'HH:mm'),
      }));
      setAppointments(formattedAppointments);
    });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // const selectedDateAsText = useMemo(() => format(selectedDate, "'Dia' dd 'de' MMMM", {
  //   locale: ptBR,
  // }),
  // [selectedDate]);

  const selectedDateAsText = useMemo(() => format(selectedDate, 'MMMM dd'),
    [selectedDate]);

  // const selectedWeedDay = useMemo(() => format(selectedDate, 'cccc', {
  //   locale: ptBR,
  // }), [selectedDate]);

  const selectedWeedDay = useMemo(() => format(selectedDate, 'cccc'), [selectedDate]);

  const morningAppointments = useMemo(() => appointments.filter(
    appointment => parseISO(appointment.date).getHours() < 12,
  ), [appointments]);

  const afternoonAppointments = useMemo(() => appointments.filter(
    appointment => parseISO(appointment.date).getHours() >= 12,
  ), [appointments]);

  const nextAppointment = useMemo(() => appointments.find(
    appointment => isAfter(parseISO(appointment.date), new Date()),
  ), [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={(user.avatar_url != null) ? user.avatar_url : avatar} alt={user.name} />

            <div>
              <span>Welcome</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Your appointments</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span> }
            <span>{selectedDateAsText}</span>
            <span>{selectedWeedDay}</span>
          </p>

          { nextAppointment && (
            <NextAppointment>
              <strong>Next appointment</strong>

              <div>
                <img
                  src={(nextAppointment.user.avatar_url != null)
                    ? nextAppointment.user.avatar_url
                    : avatar}
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.formattedHour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>

            {morningAppointments.length === 0 && (
              <p>There is no appointment for this period of the day</p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>

                <div>
                  <img
                    src={(appointment.user.avatar_url != null)
                      ? appointment.user.avatar_url
                      : avatar}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}

          </Section>

          <Section>
            <strong>Afternoon</strong>

            {afternoonAppointments.length === 0 && (
              <p>There is no appointment for this period of the day</p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.formattedHour}
                </span>

                <div>
                  <img
                    src={(appointment.user.avatar_url != null)
                      ? appointment.user.avatar_url
                      : avatar}
                    alt={appointment.user.name}
                  />

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

        </Schedule>

        <Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[
              { daysOfWeek: [0, 6] },
              ...disabledDays,
            ]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
          />
        </Calendar>

      </Content>
    </Container>
  );
};
export default Dashboard;
