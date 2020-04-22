import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  World: {},
  Scene: {}
};

const pluralNames = {
  World: 'World',
  Scene: 'Scene'
};

export const entityConfig = {
  entityMetadata,
  pluralNames
};
