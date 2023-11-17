import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogueComponent } from './catalogue.component';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';




describe('CatalogueComponent', () => {
  let component: CatalogueComponent;
  let fixture: ComponentFixture<CatalogueComponent>;
  let productsService: ProductsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule , MatCheckboxModule],
      declarations: [CatalogueComponent],
      providers: [{ provide: ProductsService }],
    }).compileComponents();
    productsService = TestBed.inject(ProductsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('function should return the new price with reduction',() =>{
    let result = component.ApplyPromo(4,50);
    expect(result).toBe(2);
  })
});




