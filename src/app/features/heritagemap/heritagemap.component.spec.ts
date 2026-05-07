import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeritagemapComponent } from './heritagemap.component';

describe('HeritagemapComponent', () => {
  let component: HeritagemapComponent;
  let fixture: ComponentFixture<HeritagemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeritagemapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeritagemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
