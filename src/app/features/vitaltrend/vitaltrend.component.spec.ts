import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VitaltrendComponent } from './vitaltrend.component';

describe('VitaltrendComponent', () => {
  let component: VitaltrendComponent;
  let fixture: ComponentFixture<VitaltrendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VitaltrendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VitaltrendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
