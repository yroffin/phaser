import { EntityMetadataMap } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  World: {}
};

// because the plural of "hero" is not "heros"
const pluralNames = { World: 'World' };

export const entityConfig = {
  entityMetadata,
  pluralNames
};
