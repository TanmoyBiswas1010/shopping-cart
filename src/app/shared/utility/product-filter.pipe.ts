import { Pipe, PipeTransform } from '@angular/core';
import { Iproduct } from '../model/product';
import { filter } from 'rxjs/operators';

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {
    transform(products: Iproduct[], ...args: any[]) {
        let colorFilter = "";
        let priceFilter = "";

        if (products && products.length && args && args.length > 0) {
            colorFilter = args[0];
            priceFilter = args[1];

            if (colorFilter && priceFilter) {
                return products.filter(product => product.color === colorFilter && product.price >= priceFilter);
            }
            else if (colorFilter) {
                return products.filter(product => product.color === colorFilter);
            }
            else if (priceFilter) {
                return products.filter(product => product.price >= priceFilter);
            }
            else {
                return products;
            }
        }
    }
}