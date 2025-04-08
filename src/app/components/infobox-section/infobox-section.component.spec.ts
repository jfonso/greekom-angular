import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoboxSectionComponent } from './infobox-section.component';

describe('InfoboxSectionComponent', () => {
  let component: InfoboxSectionComponent;
  let fixture: ComponentFixture<InfoboxSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoboxSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoboxSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
