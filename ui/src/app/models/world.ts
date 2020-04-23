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

export class Camera {
    id!: string;
    name?: string;
}
