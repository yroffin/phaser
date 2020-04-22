import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { World, Scene } from '../models/world';

@Injectable({
  providedIn: 'root'
})
export class WorldService extends EntityCollectionServiceBase<World> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('World', serviceElementsFactory);
  }
}

@Injectable({
  providedIn: 'root'
})
export class SceneService extends EntityCollectionServiceBase<Scene> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Scene', serviceElementsFactory);
  }
}
