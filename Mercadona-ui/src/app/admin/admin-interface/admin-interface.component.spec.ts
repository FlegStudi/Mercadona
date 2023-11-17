import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminInterfaceComponent } from './admin-interface.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../products/products.component';
import { ProductsService } from 'src/app/services/products.service';
import { AppModule } from 'src/app/app.module';



describe('AdminInterfaceComponent', () => {
  let component: AdminInterfaceComponent;
  let fixture: ComponentFixture<AdminInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule, AppModule],
      declarations: [ AdminInterfaceComponent ],
      providers: [ProductsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
