import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  World: {},
  Scene: {},
  Camera: {}
};

const pluralNames = {
  World: 'World',
  Scene: 'Scene',
  Camera: 'Camera'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
