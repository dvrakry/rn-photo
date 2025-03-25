import { EventEmitter } from 'eventemitter3';

const event = new EventEmitter();

export const EventType = {
  REFRESH: 'REFRESH',
};

export default event;
