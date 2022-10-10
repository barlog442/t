export interface ElevatorType {
  id: 'elv0' | 'elv1' | 'elv2';
  floor: number;
  state: 'up' | 'down' | 'stopped';
}

export interface BuildingType {
  floors: number;
  elevators: number;
}
