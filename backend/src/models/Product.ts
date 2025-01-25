import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
    name: string;
    description: string;
    price: string;
    category: string;
    stock: string;
}

const ProductSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: String, required: true},
    category: {type: String, required:true}, //Se debe ajustar al tipo Categoría
    stock: {type: String, required: true}
});

export default mongoose.model<IProduct>('Product', ProductSchema);