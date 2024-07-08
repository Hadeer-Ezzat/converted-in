import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductesListComponent } from './productes-list.component';

describe('ProductesListComponent', () => {
  let component: ProductesListComponent;
  let fixture: ComponentFixture<ProductesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
