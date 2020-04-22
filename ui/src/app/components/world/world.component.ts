import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WorldService } from 'src/app/services/world.service';
import { World } from 'src/app/models/world';
import { TreeNode } from 'primeng/api';
import * as _ from 'lodash';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  loading$: Observable<boolean>;
  worlds$: Observable<World[]>;

  tree: TreeNode[];

  constructor(private worldService: WorldService) {
    this.worlds$ = this.worldService.entities$;
    this.loading$ = this.worldService.loading$;
    this.worlds$.subscribe(
      (worlds: World[]) => {
        this.tree = [];

        this.tree = _.map(worlds, (world) => {
          return {
            data: {
              name: world.name,
              size: '75kb',
              type: 'World'
            },
            children: []
          };
        });

        console.log('world', this.tree);

      });
  }

  ngOnInit(): void {
    this.getWorlds();
  }

  getWorlds() {
    this.worldService.getAll();
  }
}
