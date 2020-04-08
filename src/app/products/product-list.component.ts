import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: [ './product-list.component.css' ]
})

export class ProductListComponent implements OnInit {
  pageTitle: string = 'Product List';
  errorMessage: string = '';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = true;
  products: IProduct[];
  filteredProducts: IProduct[];
  hasProducts: boolean = false;
  private _listFilter: string;

  constructor(private productService: ProductService) { }

  public get listFilter(): string {
    return this._listFilter;
  }
  public set listFilter(value: string) {
    this._listFilter = value
    this.filteredProducts = this.listFilter ?
      this.performFilter(this.listFilter)
      : this.products;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products
        this.filteredProducts = this.products
        this.hasProducts = this.products && this.products.length > 0;
      },
      error: err => {
        this.errorMessage = err
      }
    });
  }

  performFilter(filterBy: string): IProduct[] {
    return this.products.filter((
      product: IProduct
    ) => {
      return product.productName
        .toLocaleLowerCase()
        .indexOf(filterBy.toLocaleLowerCase()) !== -1
    })
  }

  onRatingClicked(message: string): void {
    this.pageTitle = `Product List ${message}`;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
}
