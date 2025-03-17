import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Core/Services/products.service';
import Swal from 'sweetalert2';
import { min } from 'rxjs';


@Component({
  selector: 'app-addproduct',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {

  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _productService: ProductsService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(3)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  // Add a product
  addProduct() {

    if (this.productForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      return;
    }

    this._productService.createProduct(this.productForm.value).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Success!',
          text: 'Product Added successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.productForm.reset();
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }

  cancelUpdate() {
    if(this.productForm.invalid){
      Swal.fire({
        title: 'Error!',
        text: 'The Form is invalid , please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    Swal.fire({
      title: 'Are you sure you want to cancel ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productForm.reset();
      }
    });

  }

}
