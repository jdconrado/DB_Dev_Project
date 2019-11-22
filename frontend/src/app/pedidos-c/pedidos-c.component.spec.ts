import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCComponent } from './pedidos-c.component';

describe('PedidosCComponent', () => {
  let component: PedidosCComponent;
  let fixture: ComponentFixture<PedidosCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
