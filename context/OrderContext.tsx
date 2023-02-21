import React from "react"

export interface Item {
    item_name: string;
    item_id: string;
    item_photo: string;
    item_price: number;
}



export interface ItemWithQRUUID extends Item {
    qr_uuid: string;
}

export type OrderContextType = {
    orders: Array<ItemWithQRUUID>
    pushOrder: (item: ItemWithQRUUID) => void
    removeByItem: (item: ItemWithQRUUID) => void
    getOrderByQRUUID: (id: string) => ItemWithQRUUID | null
}

export const OrderContext = React.createContext<OrderContextType>({
    orders: [],
    pushOrder: () => {},
    removeByItem: () => {},
    getOrderByQRUUID: () => null,
});

export const useOrders = () => React.useContext(OrderContext);

interface ProviderProps {
    children: React.ReactNode
}

export const ProductProvider: React.FC<ProviderProps> = ({ children }) => {
    const [orders, setOrders] = React.useState<Array<ItemWithQRUUID>>([]);

    const pushOrder = (item: ItemWithQRUUID) => {
        setOrders([...orders, item]);
    }

    const removeByItem = (item: ItemWithQRUUID) => {
        const indexOf = orders.indexOf(item);
        setOrders(
            [...orders.slice(0, indexOf),
            ...orders.slice(indexOf + 1, orders.length - 1)
            ]);
    }

    const getOrderByQRUUID = (id: string): ItemWithQRUUID | null => {
        const order = orders.find(given_order => given_order.qr_uuid === id);
        return order || null;
    };

    return <OrderContext.Provider value={{
        orders,
        pushOrder,
        removeByItem,
        getOrderByQRUUID
    }}>
        {children}
    </OrderContext.Provider>
}