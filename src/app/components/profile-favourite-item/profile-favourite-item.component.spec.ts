import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFavouriteItemComponent } from './profile-favourite-item.component';

describe('ProfileFavouriteItemComponent', () => {
  let component: ProfileFavouriteItemComponent;
  let fixture: ComponentFixture<ProfileFavouriteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileFavouriteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileFavouriteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
