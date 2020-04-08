import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {

  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.productService.getProducts().subscribe({
      next: data => {
        const productArray = data.filter(product => product.productId === id)
        if (productArray.length === 0) {
          return alert('Esse ID não existe no DB!')
        }
        this.product = productArray[0];
      },
      error: _ => alert('Ocorreu um erro!')
    })
  }

  onBack(): void {
    this.router.navigate(['/products'])
  }

}
