import { Product } from "@prisma/client"

export type CartItem = {
    item: Product;
    quantity: number;
}

export type Cart = {
    items: CartItem[];
    itemCount: number;
    total: number;
}