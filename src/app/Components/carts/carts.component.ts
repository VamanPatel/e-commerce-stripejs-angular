import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { CartService } from 'src/app/Service/cart.service';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
})
export class CartsComponent implements OnInit {
  public products: any[] = [];
  public grandTotal!: number;
  handler: any = null;

  constructor(private cartService: CartService, public api: ApiService) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });

    this.loadStripe();
  }
  removeItem(item: any) {
    this.api.showspinner = true;

    setTimeout(() => {
      this.cartService.removeCartItem(item);

      this.api.showspinner = false;
    }, 1000);
  }
  emptycart() {
    this.api.showspinner = true;

    setTimeout(() => {
      this.cartService.removeAllCart();

      this.api.showspinner = false;
    }, 1000);
  }

  pay() {
    this.emptycart();

    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Kt7FGSIHgq2wblmKYMhlKr3HHbh172HBZN1fiIDinmQdsSGFoL7KXGZYupxvRAzm4e6mYzS0fEOyblZwfK93YlJ00B7raVedh',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
        alert('Token Created!!');
      },
    });

    handler.open({
      name: 'Flipkart',
      description: `Pay Bill for ${this.products.length} Products`,
      amount: this.grandTotal * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Kt7FGSIHgq2wblmKYMhlKr3HHbh172HBZN1fiIDinmQdsSGFoL7KXGZYupxvRAzm4e6mYzS0fEOyblZwfK93YlJ00B7raVedh',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token);
            alert('Payment Success!!');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
