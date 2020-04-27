export class World {
    id!: string;
    name?: string;
    scenes?: Scene[];
}

export class Scene {
    id!: string;
    name?: string;
    cameras?: Camera[];
}

export enum CameraType {
    FreeCamera = 'FreeCamera',
    ArcRotateCamera = 'ArcRotateCamera'
}

export class Camera {
    id!: string;
    name!: string;
    type!: CameraType;
}
