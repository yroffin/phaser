import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Engine, Scene, FreeCamera, Vector3, HemisphericLight, Mesh } from 'babylonjs';

@Component({
  selector: 'app-babylon',
  templateUrl: './babylon.component.html',
  styleUrls: ['./babylon.component.css']
})
export class BabylonComponent implements OnInit, AfterViewInit {

  @ViewChild('myCanvas') myCanvas: ElementRef;

  private engine: Engine;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // Load the 3D engine
    this.engine = new Engine(this.myCanvas.nativeElement, true, { preserveDrawingBuffer: true, stencil: true });
    const scene = this.createScene();
    // run the render loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  private createScene() {
    // Create a basic BJS Scene object
    const scene = new Scene(this.engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(this.myCanvas.nativeElement, false);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    // Create a built-in "sphere" shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    // Create a built-in "ground" shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
    // Return the created scene
    return scene;
  }
}
