import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McplayerComponent } from './mcplayer.component';

describe('McplayerComponent', () => {
  let component: McplayerComponent;
  let fixture: ComponentFixture<McplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McplayerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
