import { useState, useEffect } from 'react';
import { ElevatorType } from '~/types/types';
const host = 'http://localhost:8080';

export const useElevators = () => {
  const [elevators, setElevators] = useState<ElevatorType[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchElevators = async () => {
      try {
        const response = await fetch(`${host}/elevators`, {
          signal: abortController.signal,
        });
        if (response.ok) {
          const parsedData = await response.json();
          setElevators(parsedData);
        }
        return [];
      } catch (e) {
        console.error(e);
        return [];
      }
    };
    fetchElevators();
    return () => abortController.abort();
  }, [setElevators]);

  return { elevators, setElevators };
};
