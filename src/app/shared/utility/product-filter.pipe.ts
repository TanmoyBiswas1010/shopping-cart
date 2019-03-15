import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductsInterface } from '../model/products.interface';
import { UtilityService } from '../../service/utility.service';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    constructor(private utilityService: UtilityService) { }
    transform(products: ProductsInterface[], ...args: any[]) {
        let colorFilter = "";
        let priceFilter = "";

        if (products && products.length && args && args.length > 0) {
            colorFilter = args[0];
            priceFilter = args[1];

            if (colorFilter && priceFilter) {
                return products.filter(product => product.color === colorFilter
                    && this.utilityService.removeCurrencyFromPrice(product.price) >= +priceFilter);
            }

            else if (colorFilter) {
                return products.filter(product => product.color === colorFilter);
            }

            else if (priceFilter) {
                return products.filter(product => this.utilityService.removeCurrencyFromPrice(product.price) >= +priceFilter);
            }

            else {
                return products;
            }
        }
    }
}