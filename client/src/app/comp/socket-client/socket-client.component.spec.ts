import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketClientComponent } from './socket-client.component';

describe('SocketClientComponent', () => {
  let component: SocketClientComponent;
  let fixture: ComponentFixture<SocketClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
