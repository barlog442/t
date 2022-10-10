import { useMainContext } from './contexts/ElevatorContext';
import Elevator from './components/Elevator/Elevator';
import Key from './components/Key/Key';
import './App.css';

const App = () => {
  const { building, firstElevator, secondElevator, thirdElevator } = useMainContext();

  const queues = [firstElevator, secondElevator, thirdElevator];
  return (
    <div className='app'>
      <div className='buttons'>
        {[...Array(building?.floors)].map((_, index) => (
          <Key key={index} number={index} />
        ))}
      </div>
      {[...Array(building?.elevators)].map((_, index) => (
        <Elevator key={index} number={index} queue={queues[index]} />
      ))}
    </div>
  );
};

export default App;
