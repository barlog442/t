import { useState, useEffect } from 'react';
import { BuildingType } from '~/types/types';
const host = 'http://localhost:8080';

export const useBuilding = () => {
  const [building, setBuilding] = useState<BuildingType>();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchBuildings = async () => {
      try {
        const response = await fetch(`${host}/building`, {
          signal: abortController.signal,
        });
        if (response.ok) {
          const parsedData = await response.json();
          setBuilding(parsedData);
        }
        return [];
      } catch (e) {
        console.error(e);
        return [];
      }
    };
    fetchBuildings();
    return () => abortController.abort();
  }, []);

  return { building };
};
