import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingListComponent } from './meeting-list.component';

describe('MeetingListComponent', () => {
  let component: MeetingListComponent;
  let fixture: ComponentFixture<MeetingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should be created', () => {
    expect(component).toBeTruthy();
  });
});
