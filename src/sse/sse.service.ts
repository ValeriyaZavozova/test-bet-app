import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';

export enum SseEventName {
  ROTATION_RESULT = 'rotation-result',
}

@Injectable()
export class SseService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  emitEvent(eventName: SseEventName, data: unknown) {
    this.eventEmitter.emit(eventName, data);
  }

  createObservable(eventName: SseEventName): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, eventName).pipe(
      map((data) => {
        return new MessageEvent(eventName, { data });
      }),
    );
  }
}
