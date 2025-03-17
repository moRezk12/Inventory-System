# Inventory-System

Features
  View all products with details.
  Add new products to inventory.
  Edit existing products with validation.
  Delete products with confirmation.
  Responsive UI with mobile support.
  Popup modals for product editing and show product .


Technologies Used
  Angular 16 with standalone
  Bootstrap 5
  SweetAlert2 (for alerts and confirmations)
  RxJS (for handling observables)
  TypeScript


Installation
  1. Download ZIP
      
  2. Install Dependencies
      npm install
  3. Install SweetAlert2
      npm install sweetalert2
  4. Install Bootstrap
      npm install Bootsrap  
  5. Install Json-Server
      npm install -g json-server


Running the Application
  1. Run Json-Server
      json-server --watch db.json  
  2. Run Project 
      ng serve
  3. Open your browser and navigate to: 
      http://localhost:4200


Folder Structure 
  src/
  ├── app/
  │   ├── components/
  │   │   ├── product-list/
  │   │   ├── add-product/
  │   ├── core/
  |   |   |── Services/
  |   |   |──── product.service.ts
  │   │   └── Interface/
  |   |   |──── product.ts
  │   ├── Layouts/
  │   │   └── layout.component.ts
  │   └── app.module.ts
