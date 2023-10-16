import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Calendar from '../Calendar';

describe('Calendar Component', () => {
  it('renders without crashing', () => {
    render(<Calendar />);
  });

  it('displays the current month and year', () => {
    const { getByText } = render(<Calendar date={new Date(2023, 0, 1)} />); // January 2023
    expect(getByText('January')).toBeInTheDocument();
    expect(getByText('2023')).toBeInTheDocument();
  });

  it('displays the days of the week', () => {
    const { getByText } = render(<Calendar />);
    expect(getByText('Sun')).toBeInTheDocument();
    expect(getByText('Mon')).toBeInTheDocument();
    expect(getByText('Tue')).toBeInTheDocument();
    expect(getByText('Wed')).toBeInTheDocument();
    expect(getByText('Thu')).toBeInTheDocument();
    expect(getByText('Fri')).toBeInTheDocument();
    expect(getByText('Sat')).toBeInTheDocument();
  });

  it('allows selecting a day', () => {
    const onSelectDay = jest.fn();
    const { getByText } = render(<Calendar date={new Date()} onDayClick={onSelectDay} />);
    const dayToSelect = (new Date().getDate() + 1).toString();
    fireEvent.click(getByText(dayToSelect));
    expect(onSelectDay).toHaveBeenCalledWith(expect.any(Object), parseInt(dayToSelect));
  });
});
