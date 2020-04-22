import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldService, SceneService } from 'src/app/services/world.service';
import { World, Scene } from 'src/app/models/world';
import { TreeNode } from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  loadingWorld$: Observable<boolean>;
  worlds$: Observable<World[]>;

  worlds: TreeNode[];

  loadingScene$: Observable<boolean>;
  scenes$: Observable<Scene[]>;

  constructor(
    private worldService: WorldService,
    private sceneService: SceneService
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
              name: world.name,
              size: '75kb',
              type: 'World',
              entity: world
            },
            children: _.map(world.items, (item) => {
              return {
                data: {
                  name: item.name,
                  size: '75kb',
                  type: 'Item'
                },
                children: []
              };
            }).concat(_.map(world.scenes, (scene) => {
              return {
                data: {
                  name: scene.name,
                  size: '75kb',
                  type: 'Scene'
                },
                children: []
              };
            }))
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
        console.log(entity);
        this.worldService.update({
          id: entity.id,
          name: entity.name,
          scenes:  entity.scenes.concat(scene)
        });
      }
    );
  }
}
