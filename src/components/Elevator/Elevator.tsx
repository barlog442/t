import { useState, memo, useEffect, useCallback } from 'react';
import { useElevators } from '~/hooks/useElevators';
import { ElevatorType } from '~/types/types';
import { useMainContext } from '~/contexts/ElevatorContext';
import './styles.scss';

interface ElevatorProps {
  number: number;
  queue: any;
}

const Elevator = ({ number, queue }: ElevatorProps) => {
  const { elevators } = useElevators();
  const {
    setFirstElevator,
    setSecondElevator,
    setThirdElevator,
    firstElevator,
    secondElevator,
    thirdElevator,
  } = useMainContext();
  const [elevator, setElevator] = useState<ElevatorType>();

  useEffect(() => {
    elevators && setElevator(elevators[number]);
  }, [elevators, number, setElevator]);

  const elevatorFloorChangeHandler = useCallback(() => {
    const firstQueueElement = queue[0];
    if (queue.length > 0) {
      if (number === 0) {
        setElevator(firstQueueElement);
        setFirstElevator(firstElevator.filter((element, index: number) => index !== 0));
      }
      if (number === 1) {
        setElevator(firstQueueElement);
        setSecondElevator(secondElevator.filter((element, index: number) => index !== 0));
      }
      if (number === 2) {
        setElevator(firstQueueElement);
        setThirdElevator(thirdElevator.filter((element, index: number) => index !== 0));
      }
    }
  }, [
    number,
    queue,
    firstElevator,
    secondElevator,
    thirdElevator,
    setFirstElevator,
    setSecondElevator,
    setThirdElevator,
  ]);

  useEffect(() => {
    // pick latest elevator's floor change
    elevatorFloorChangeHandler();
  });

  return (
    <div className='elevator'>
      <h2>Elevator {number + 1} </h2>
      <p className='elevator__floor'>{elevator?.floor}</p>
      <p>state: {elevator?.state} </p>
    </div>
  );
};

export default memo(Elevator);
