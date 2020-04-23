import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldService, SceneService, CameraService } from 'src/app/services/world.service';
import { World, Scene, Camera } from 'src/app/models/world';
import { TreeNode } from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  showScene = false;
  showCamera = false;

  loadingWorld$: Observable<boolean>;
  worlds$: Observable<World[]>;

  worlds: TreeNode[];

  loadingScene$: Observable<boolean>;
  scenes$: Observable<Scene[]>;

  currentScene: Scene;
  scene: TreeNode[];

  currentCamera: Camera;

  constructor(
    private worldService: WorldService,
    private sceneService: SceneService,
    private cameraService: CameraService
  ) {
    // Worlds
    this.worlds$ = this.worldService.entities$;
    this.loadingWorld$ = this.worldService.loading$;
    this.worlds$.subscribe(
      (worlds: World[]) => {
        this.worlds = [];

        this.worlds = _.map(worlds, (world) => {
          return {
            data: {
              id: world.id,
              name: world.name,
              size: world.scenes.length,
              type: 'World',
              entity: world
            },
            children: _.map(world.scenes, (scene) => {
              return {
                data: {
                  id: scene.id,
                  name: scene.name,
                  size: 0,
                  type: 'Scene',
                  entity: scene
                },
                children: []
              };
            })
          };
        });

      });
    // Scene
    this.scenes$ = this.sceneService.entities$;
    this.loadingScene$ = this.sceneService.loading$;
  }

  ngOnInit(): void {
    this.getWorlds();
  }

  getWorlds() {
    this.worldService.getAll();
  }

  addWorld(event: any) {
    this.worldService.add({
      id: undefined,
      name: 'default'
    });
  }

  addScene(event: any, entity: World) {
    this.sceneService.add({
      id: undefined,
      name: 'default'
    }).subscribe(
      (scene) => {
        this.worldService.update({
          id: entity.id,
          name: entity.name,
          scenes: entity.scenes.concat(scene)
        });
      }
    );
  }

  viewScene(event: any, entity: Scene) {
    this.sceneService.getByKey(entity.id).subscribe(
      (scene) => {
        this.showScene = true;
        this.currentScene = scene;

        this.scene = [{
          data: {
            id: this.currentScene.id,
            name: this.currentScene.name,
            size: 0,
            type: 'Scene',
            entity: this.currentScene
          },
          children: _.map(this.currentScene.cameras, (camera) => {
            return {
              data: {
                id: camera.id,
                name: camera.name,
                size: 0,
                type: 'Camera',
                entity: camera
              },
              children: []
            };
          })
        }];
      }
    );
  }

  addCamera(event: any, entity: Scene) {
    this.cameraService.add({
      id: undefined,
      name: 'camera'
    }).subscribe(
      (camera) => {
        this.sceneService.update({
          id: entity.id,
          name: entity.name,
          cameras: entity.cameras.concat(camera)
        });
      }
    );
  }

  editCamera(event: any, entity: Camera) {
    this.cameraService.getByKey(entity.id).subscribe(
      (camera) => {
        this.showCamera = true;
        this.currentCamera = camera;
      }
    );
  }

}
