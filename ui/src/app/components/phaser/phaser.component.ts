import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Phaser from 'phaser';
import { MainScene } from './scene';

@Component({
  selector: 'app-phaser',
  templateUrl: './phaser.component.html',
  styleUrls: ['./phaser.component.css']
})
export class PhaserComponent implements OnInit, AfterViewInit {

  private p: Phaser.Game;
  @ViewChild('myDiv') myDivElementRef: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 }
        }
      },
      backgroundColor: '#2d2d2d',
      scene: [ new MainScene(this.myDivElementRef.nativeElement) ]
    };
    this.p = new Phaser.Game(config);
  }

}
