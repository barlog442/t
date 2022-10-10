import { memo } from 'react';
import Button from '~/components/Button/Button';
import { useMainContext } from '~/contexts/ElevatorContext';

interface KeyProps {
  number: number;
}

const Key = ({ number }: KeyProps) => {
  const { api, setApi } = useMainContext();

  const url = `http://localhost:8080/floor/${number}`;

  const onClickHandler = async () => {
    setApi(null);
    api?.close();
    const abortController = new AbortController();
    try {
      await fetch(url, {
        method: 'PUT',
        signal: abortController.signal,
      });
    } catch (e) {
      console.error(e);
    }
    return () => abortController.abort();
  };

  return <Button onClick={onClickHandler}>{number}</Button>;
};

export default memo(Key);
