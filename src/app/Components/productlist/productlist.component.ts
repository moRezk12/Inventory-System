import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/Core/Interface/product';
import { ProductsService } from 'src/app/Core/Services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule , ReactiveFormsModule],
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProduct = '';

  editForm: FormGroup;
  selectedProductId!: number;
  isPopupOpen : boolean= false;

  constructor(private _productService: ProductsService , private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required , Validators.minLength(3)]],
      description: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this._productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // Delete a product
  deleteProduct(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productService.deleteProduct(id).subscribe(() => {
          this.getAllProducts();
          Swal.fire(
            'Success!',
            'Deleted!',
            'success'
          );
        });
      }
    });

  }

  // Search a product
  searchProducts() {
    const searchProduct = this.searchProduct.toLowerCase();
    this.filteredProducts = this.products.filter(p => p.name.toLowerCase().includes(searchProduct));
  }

  // Edit a product
  openEditModal(product: Product) {
    this.isPopupOpen = true;
    this.selectedProductId = product.id;
    this.editForm.patchValue({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price
    });
  }

  // Update a product
  onUpdateProduct() {
    if (this.editForm.valid) {
      const updatedProduct: Product = {
        id: this.selectedProductId,
        ...this.editForm.value
      };
      this._productService.updateProduct(this.selectedProductId, updatedProduct).subscribe(() => {
        this.getAllProducts();
        this.closePopup();
        Swal.fire({
          title: 'Success!',
          text: 'Product updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      });
    }
  }

  // Close Modal
  closePopup() {
    this.isPopupOpen = false;
    this.show = false;

  }

  // Show a product
  show : boolean = false;
  openShowModal(product: Product) {
    this.show = true;
    this.isPopupOpen = true;
    this.editForm.patchValue({
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price
    });
  }


}
