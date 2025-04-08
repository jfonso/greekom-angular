import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoLabelComponent } from './info-label.component';

describe('InfoLabelComponent', () => {
  let component: InfoLabelComponent;
  let fixture: ComponentFixture<InfoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
