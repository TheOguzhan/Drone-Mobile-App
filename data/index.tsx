export interface Item {
  item_name: string;
  item_id: string;
  item_photo: string;
  item_price: number;
}

export const DATA: Item[] = [
  { item_name: 'Featured 1', item_photo: "https://via.placeholder.com/100", item_id: "1", item_price: 19.99 },
  { item_name: 'Featured 2', item_photo: "https://via.placeholder.com/100", item_id: "2", item_price: 34.99 },
  { item_name: 'Featured 3', item_photo: "https://via.placeholder.com/100", item_id: "3", item_price: 9.99 },
  { item_name: 'Featured 4', item_photo: "https://via.placeholder.com/100", item_id: "4", item_price: 3.99 },
]

