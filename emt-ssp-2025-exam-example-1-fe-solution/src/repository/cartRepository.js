import axiosInstance from "../axios/axios.js";

const cartRepository = {
    addToCart: async (item) => {
        return await axiosInstance.post("/cart/1/add-item", item);
    },
    getCart: async () => {
        return await axiosInstance.get("/cart/1");
    },
    removeItem: async (itemId) => {
        return await axiosInstance.delete(`/cart/1/items/${itemId}`);
    },
    clearCart: async () => {
        return await axiosInstance.delete("/cart/1/clear");
    },
    buyItems: async () => {
        return await axiosInstance.post("/cart/1/buy_items");
    },
};

export default cartRepository;
