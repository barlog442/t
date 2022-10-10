import { useCallback, useEffect, useMemo } from 'react';
import { createContext, useContext, useState } from 'react';
import { useBuilding } from '~/hooks/useBuilding';
import { ElevatorType } from '~/types/types';

type MainContextData = ReturnType<typeof ProviderSettings>;

const MainContext = createContext<MainContextData | null>(null);
const streamUrl = 'http://localhost:8080/stream';

const ProviderSettings = () => {
  const [api, setApi] = useState<EventSource | null>();
  const { building } = useBuilding();

  const [firstElevator, setFirstElevator] = useState<ElevatorType[]>([]);
  const [secondElevator, setSecondElevator] = useState<ElevatorType[]>([]);
  const [thirdElevator, setThirdElevator] = useState<ElevatorType[]>([]);

  const onMessageHandler = useCallback(
    (e: MessageEvent) => {
      const data: ElevatorType = JSON.parse(e.data);

      data.id == 'elv0' && setFirstElevator([...firstElevator, data]);
      data.id == 'elv1' && setSecondElevator([...secondElevator, data]);
      data.id == 'elv2' && setThirdElevator([...thirdElevator, data]);
    },
    [firstElevator, secondElevator, thirdElevator],
  );

  useEffect(() => {
    if (!api) {
      const stream = new EventSource(streamUrl);
      setApi(stream);
      stream.onerror = () => console.log('streaming error');
      stream.onmessage = onMessageHandler;
    }
  }, [api, onMessageHandler]);

  return {
    api,
    setApi,
    building,
    firstElevator,
    secondElevator,
    thirdElevator,
    setFirstElevator,
    setSecondElevator,
    setThirdElevator,
  };
};

type MainProviderProps = {
  children: React.ReactNode;
};

const MainProvider = ({ children }: MainProviderProps) => {
  const data = ProviderSettings();

  const value = useMemo(() => ({ ...data }), [data]);

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error('useMainContext must be used within a MainProvider');
  }

  return context;
};

export { MainProvider, useMainContext };
