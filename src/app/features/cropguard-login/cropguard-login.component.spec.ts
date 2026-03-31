import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropguardLoginComponent } from './cropguard-login.component';

describe('CropguardLoginComponent', () => {
  let component: CropguardLoginComponent;
  let fixture: ComponentFixture<CropguardLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropguardLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CropguardLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
