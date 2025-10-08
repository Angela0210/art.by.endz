import axiosInstance from "../axios/axios.js";


const bookRepository = {
    findAll: async () => {
        return await axiosInstance.get("/books");
    },
    findById: async (id) => {
        return await axiosInstance.get(`/books/${id}`);
    },
    create: async (p) => {
        return await axiosInstance.post("/books", p);
    },
    deleteById: async (id) => {
        return await axiosInstance.delete(`/books/${id}`);
    },
    update: async (id, book) => {
        return await axiosInstance.put(`/books/${id}`, book);
    },
};

export default bookRepository;
