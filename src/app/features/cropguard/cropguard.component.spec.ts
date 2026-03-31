import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropguardComponent } from './cropguard.component';

describe('CropguardComponent', () => {
  let component: CropguardComponent;
  let fixture: ComponentFixture<CropguardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropguardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropguardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
