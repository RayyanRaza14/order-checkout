import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", async ()=> {
        const response = await fetch("https://fakestoreapi.com/products")
        return response.json()
    }
)


const productSLice = createSlice({
    name: "products",
    initialState: {
        products: [],
        status: "idle",
        error: null
    },
    reducers: {},

    extraReducers: (builder)=>{
        builder
        .addCase(fetchProducts.pending,(state, action)=>{
            state.status = "loading",
            state.products = action.payload
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.status = "succeeded",
            state.products = action.payload
        })
        .addCase(fetchProducts.rejected, (state, action)=>{
            state.status = "failed",
            state.error = action.error.message
        })
    }
})


export default productSLice.reducer