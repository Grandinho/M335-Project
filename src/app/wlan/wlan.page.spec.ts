import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WLANPage } from './wlan.page';

describe('WLANPage', () => {
  let component: WLANPage;
  let fixture: ComponentFixture<WLANPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WLANPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
