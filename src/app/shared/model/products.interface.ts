export interface ProductsInterface {
    color: string;
    description: string;
    image: string;
    price: any;
    title: string;
    stock: StockInterface[];
    _id: string;
    quantity: number | undefined;
}

export interface StockInterface {
    remaining: number;
}
