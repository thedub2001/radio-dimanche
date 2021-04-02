import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaradioComponent } from './taradio.component';

describe('TaradioComponent', () => {
  let component: TaradioComponent;
  let fixture: ComponentFixture<TaradioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaradioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaradioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
