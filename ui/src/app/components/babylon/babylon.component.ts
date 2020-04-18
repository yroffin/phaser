import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import {
  Engine, Scene, FreeCamera, Vector3, HemisphericLight, Mesh,
  ArcRotateCamera, AnimationPropertiesOverride, Color3, DirectionalLight, ShadowGenerator, SceneLoader
} from 'babylonjs';
import { Button, Control, AdvancedDynamicTexture, StackPanel } from 'babylonjs-gui';

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
    // Create the scene
    const scene = this.altScene(this.myCanvas.nativeElement);
    // render world
    this.createWorld(scene);
  }

  private createWorld(scene: Scene) {
    // run the render loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }

  private createScene(element: any) {
    // Create a basic BJS Scene object
    const scene = new Scene(this.engine);
    // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
    // Target the camera to scene origin
    camera.setTarget(Vector3.Zero());
    // Attach the camera to the canvas
    camera.attachControl(element, false);
    // Create a basic light, aiming 0, 1, 0 - meaning, to the sky
    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    // Create a built-in 'sphere' shape; its constructor takes 6 params: name, segment, diameter, scene, updatable, sideOrientation
    const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene, false, BABYLON.Mesh.FRONTSIDE);
    // Move the sphere upward 1/2 of its height
    sphere.position.y = 1;
    // Create a built-in 'ground' shape; its constructor takes 6 params : name, width, height, subdivision, scene, updatable
    const ground = Mesh.CreateGround('ground1', 6, 6, 2, scene, false);
    // Return the created scene
    return scene;
  }

  private altScene(element: any) {
    // Model by Mixamo
    this.engine.enableOfflineSupport = false;

    // This is really important to tell js to use decomposeLerp and matrix interpolation
    // Animation.AllowMatricesInterpolation = true;

    const scene = new Scene(this.engine);

    const camera = new ArcRotateCamera('camera1', Math.PI / 2, Math.PI / 4, 3, new Vector3(0, 1, 0), scene);
    camera.attachControl(element, true);

    camera.lowerRadiusLimit = 2;
    camera.upperRadiusLimit = 10;
    camera.wheelDeltaPercentage = 0.01;

    const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
    light.intensity = 0.6;
    light.specular = Color3.Black();

    const light2 = new DirectionalLight('dir01', new Vector3(0, -0.5, -1.0), scene);
    light2.position = new Vector3(0, 5, 5);

    // Shadows
    const shadowGenerator = new ShadowGenerator(1024, light2);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurKernel = 64;

    this.engine.displayLoadingUI();

    SceneLoader.ImportMesh('', '/assets/', 'dummy3.babylon', scene, (newMeshes, particleSystems, skeletons) => {
      const skeleton = skeletons[0];

      shadowGenerator.addShadowCaster(scene.meshes[0], true);
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < newMeshes.length; index++) {
        newMeshes[index].receiveShadows = false;
      }

      const helper = scene.createDefaultEnvironment({
        enableGroundShadow: true
      });
      helper.setMainColor(Color3.Gray());
      helper.ground.position.y += 0.01;

      // ROBOT
      skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
      skeleton.animationPropertiesOverride.enableBlending = true;
      skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
      skeleton.animationPropertiesOverride.loopMode = 1;

      const idleRange = skeleton.getAnimationRange('YBot_Idle');
      const walkRange = skeleton.getAnimationRange('YBot_Walk');
      const runRange = skeleton.getAnimationRange('YBot_Run');
      const leftRange = skeleton.getAnimationRange('YBot_LeftStrafeWalk');
      const rightRange = skeleton.getAnimationRange('YBot_RightStrafeWalk');

      // IDLE
      if (idleRange) { scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true); }

      // UI
      const advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI', true);
      const UiPanel = new StackPanel();
      UiPanel.width = '220px';
      UiPanel.fontSize = '14px';
      UiPanel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
      UiPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
      advancedTexture.addControl(UiPanel);
      // ..
      const button = Button.CreateSimpleButton('but1', 'Play Idle');
      button.paddingTop = '10px';
      button.width = '100px';
      button.height = '50px';
      button.color = 'white';
      button.background = 'green';
      button.onPointerDownObservable.add(() => {
        if (idleRange) { scene.beginAnimation(skeleton, idleRange.from, idleRange.to, true); }
      });
      UiPanel.addControl(button);
      // ..
      const button0 = Button.CreateSimpleButton('but2', 'Play Walk');
      button0.paddingTop = '10px';
      button0.width = '100px';
      button0.height = '50px';
      button0.color = 'white';
      button0.background = 'green';
      button0.onPointerDownObservable.add(() => {
        if (walkRange) { scene.beginAnimation(skeleton, walkRange.from, walkRange.to, true); }
      });
      UiPanel.addControl(button0);
      // ..
      const button1 = Button.CreateSimpleButton('but3', 'Play Run');
      button1.paddingTop = '10px';
      button1.width = '100px';
      button1.height = '50px';
      button1.color = 'white';
      button1.background = 'green';
      button1.onPointerDownObservable.add(() => {
        if (runRange) {
          scene.beginAnimation(skeleton, runRange.from, runRange.to, true);
        }
      });
      UiPanel.addControl(button1);
      // ..
      const button2 = Button.CreateSimpleButton('but4', 'Play Left');
      button2.paddingTop = '10px';
      button2.width = '100px';
      button2.height = '50px';
      button2.color = 'white';
      button2.background = 'green';
      button2.onPointerDownObservable.add(() => {
        if (leftRange) {
          scene.beginAnimation(skeleton, leftRange.from, leftRange.to, true);
        }
      });
      UiPanel.addControl(button2);
      // ..
      const button3 = Button.CreateSimpleButton('but5', 'Play Right');
      button3.paddingTop = '10px';
      button3.width = '100px';
      button3.height = '50px';
      button3.color = 'white';
      button3.background = 'green';
      button3.onPointerDownObservable.add(() => {
        if (rightRange) {
          scene.beginAnimation(skeleton, rightRange.from, rightRange.to, true);
        }
      });
      UiPanel.addControl(button3);
      // ..
      const button4 = Button.CreateSimpleButton('but6', 'Play Blend');
      button4.paddingTop = '10px';
      button4.width = '100px';
      button4.height = '50px';
      button4.color = 'white';
      button4.background = 'green';
      button4.onPointerDownObservable.add(() => {
        if (walkRange && leftRange) {
          scene.stopAnimation(skeleton);
          const walkAnim = scene.beginWeightedAnimation(skeleton, walkRange.from, walkRange.to, 0.5, true);
          const leftAnim = scene.beginWeightedAnimation(skeleton, leftRange.from, leftRange.to, 0.5, true);

          // Note: Sync Speed Ratio With Master Walk Animation
          walkAnim.syncWith(null);
          leftAnim.syncWith(walkAnim);
        }
      });
      UiPanel.addControl(button4);

      this.engine.hideLoadingUI();
    });

    return scene;
  }
}
