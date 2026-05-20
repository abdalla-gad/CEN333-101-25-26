import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchematicscanComponent } from './schematicscan.component';

describe('SchematicscanComponent', () => {
  let component: SchematicscanComponent;
  let fixture: ComponentFixture<SchematicscanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchematicscanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchematicscanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
