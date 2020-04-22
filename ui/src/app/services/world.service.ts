import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { World } from '../models/world';

@Injectable({
  providedIn: 'root'
})
export class WorldService extends EntityCollectionServiceBase<World> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('World', serviceElementsFactory);
  }
}
