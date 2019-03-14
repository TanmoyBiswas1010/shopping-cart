export interface Iproduct {
    color: string;
    description: string;
    image: string;
    price: any;
    title: string;
    stock: Istock[];
    _id: string;
    quantity: number | undefined;
}

export interface Istock {
    remaining: number;
}
