import './App.css';
import moment from 'moment';
import Calendar from './Component/Calendar';

const style = {
  position: "relative",
  margin: "50px auto"
}

function App() {
  const onDayClick = (e, day) => {
    alert(day);
  }
  return (
    <div className="App">
      <Calendar 
        style={style} 
        width="302px"
        onDayClick={onDayClick} 
        date={moment("11-24-1991")}
      />
    </div>
  );
}

export default App;
