import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlustratedLinkComponent } from './ilustrated-link.component';

describe('IlustratedLinkComponent', () => {
  let component: IlustratedLinkComponent;
  let fixture: ComponentFixture<IlustratedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IlustratedLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IlustratedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
