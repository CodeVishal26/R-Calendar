import React, { useState } from 'react';
import moment from 'moment';
import './styles.css';

const Calendar = (props) => {
  const style = props.style || {};

  const weekdays = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = moment.months();
  const [dateContext, setDateContext] = useState(moment(props.date));
  const [showMonthPopup, setShowMonthPopup] = useState(false);
  const [showYearPopup, setShowYearPopup] = useState(false);
  const [selectedDay, setSelectedDay] = useState(moment(props.date).format('D'));

  const year = () => dateContext.format('Y');
  const month = () => dateContext.format('MMMM');
  const daysInMonth = () => dateContext.daysInMonth();
  const currentDay = () => dateContext.format('D');
  const firstDayOfMonth = () => {
    let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
    return firstDay;
  };

  const setMonth = (month) => {
    const monthNo = months.indexOf(month);
    const newDateContext = moment(dateContext).set('month', monthNo);
    setDateContext(newDateContext);
  };

  const nextMonth = () => {
    const newDateContext = moment(dateContext).add(1, 'month');
    setDateContext(newDateContext);
    props.onNextMonth && props.onNextMonth();
  };

  const prevMonth = () => {
    const newDateContext = moment(dateContext).subtract(1, 'month');
    setDateContext(newDateContext);
    props.onPrevMonth && props.onPrevMonth();
  };

  const onSelectChange = (e, data) => {
    setMonth(data);
    props.onMonthChange && props.onMonthChange();
  };

  const SelectList = (props) => {
    const popup = props.data.map((data) => (
      <div key={data}>
        <span onClick={(e) => onSelectChange(e, data)}>
          {data}
        </span>
      </div>
    ));

    return <div className="month-popup">{popup}</div>;
  };

  const onChangeMonth = () => {
    setShowMonthPopup(!showMonthPopup);
  };

  const MonthNav = () => (
    <span className="label-month" onClick={onChangeMonth}>
      {month()}
      {showMonthPopup && <SelectList data={months} />}
    </span>
  );

  const showYearEditor = () => {
    setShowYearPopup(true);
  };

  const setYear = (year) => {
    const newDateContext = moment(dateContext).set('year', year);
    setDateContext(newDateContext);
  };

  const onYearChange = (e) => {
    setYear(e.target.value);
    props.onYearChange && props.onYearChange(e, e.target.value);
  };

  const onKeyUpYear = (e) => {
    if (e.which === 13 || e.which === 27) {
      setYear(e.target.value);
      setShowYearPopup(false);
    }
  };

  const YearNav = () => (
    showYearPopup ? (
      <input
        defaultValue={year()}
        className="editor-year"
        ref={(yearInput) => {
          yearInput && yearInput.focus();
        }}
        onKeyUp={onKeyUpYear}
        onChange={onYearChange}
        type="number"
        placeholder="year"
      />
    ) : (
      <span className="label-year" onDoubleClick={showYearEditor}>
        {year()}
      </span>
    )
  );

  const onDayClick = (e, day) => {
    setSelectedDay(day);
    props.onDayClick && props.onDayClick(e, day);
  };

  // Map the weekdays i.e Sun, Mon, Tue, etc. as <td>
  const weekdaysElements = weekdays.map((day) => (
    <td key={day} className="week-day">
      {day}
    </td>
  ));

  const blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(
      <td key={i * 80} className="emptySlot">
        {''}
      </td>
    );
  }

  const daysInMonthElements = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let className = d.toString() === currentDay().toString() ? 'day current-day' : 'day';
    let selectedClass = d.toString() === selectedDay.toString() ? ' selected-day' : '';
    
    daysInMonthElements.push(
      <td key={d} className={className + selectedClass}>
        <span onClick={(e) => onDayClick(e, d)}>{d}</span>
      </td>
    );
  }

  const totalSlots = [...blanks, ...daysInMonthElements];
  const rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      const insertRow = cells.slice();
      rows.push(insertRow);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      const insertRow = cells.slice();
      rows.push(insertRow);
    }
  });

  const trElems = rows.map((d, i) => (
    <tr key={i * 100}>{d}</tr>
  ));

  return (
    <div className="calendar-container" style={style}>
      <table className="calendar">
        <thead>
          <tr className="calendar-header">
            <td colSpan="5">
              <MonthNav />
              {' '}
              <YearNav />
            </td>
            <td colSpan="2" className="nav-month">
              <i className="prev fa fa-fw fa-chevron-left" onClick={prevMonth} />
              <i className="prev fa fa-fw fa-chevron-right" onClick={nextMonth} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>{weekdaysElements}</tr>
          {trElems}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
