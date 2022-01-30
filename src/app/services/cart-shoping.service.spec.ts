import { TestBed } from '@angular/core/testing';

import { CartShopingService } from './cart-shoping.service';

describe('CartShopingService', () => {
  let service: CartShopingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartShopingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
