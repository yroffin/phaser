import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaserComponent } from './phaser.component';

describe('PhaserComponent', () => {
  let component: PhaserComponent;
  let fixture: ComponentFixture<PhaserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhaserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
