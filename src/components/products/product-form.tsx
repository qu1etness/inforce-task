import {useForm} from "react-hook-form";
import {z} from "zod";
import {useAddProductMutation} from "@/state/products-api.ts";
import {productSchema} from "@/schemas/productSchema.ts";

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {

    const [addProduct] = useAddProductMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormData>({
    });

    const onSubmit = (data: ProductFormData) => {
        addProduct(data)
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4 text-black"
        >
            <div>
                <label htmlFor="name" className="block font-semibold mb-1">
                    Name
                </label>
                <input
                    id="name"
                    type={'text'}
                    {...register("name")}
                    placeholder={'Name'}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.name && (
                    <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>
                )}
            </div>

            <div>
                <label htmlFor="imageUrl" className="block font-semibold mb-1">
                    Image URL
                </label>
                <input
                    id="imageUrl"
                    {...register("imageUrl")}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.imageUrl && (
                    <span className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</span>
                )}
            </div>

            <div>
                <label htmlFor="count" className="block font-semibold mb-1">
                    Count
                </label>
                <input
                    type="number"
                    id="count"
                    {...register("count", { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.count && (
                    <span className="text-red-500 text-sm mt-1">{errors.count.message}</span>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div>
                    <label htmlFor="size.width" className="block font-semibold mb-1">
                        Width
                    </label>
                    <input
                        type="number"

                        id="size.width"
                        {...register("size.width", { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.size?.width && (
                        <p className="text-red-500 text-sm mt-1">{errors.size.width.message}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="size.height" className="block font-semibold mb-1">
                        Height
                    </label>
                    <input
                        type="number"
                        id="size.height"
                        {...register("size.height", { valueAsNumber: true })}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {errors.size?.height && (
                        <p className="text-red-500 text-sm mt-1">{errors.size.height.message}</p>
                    )}
                </div>
            </div>

            {/* Weight */}
            <div>
                <label htmlFor="weight" className="block font-semibold mb-1">
                    Weight
                </label>
                <input
                    type="number"
                    id="weight"
                    {...register("weight", { valueAsNumber: true })}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.weight && (
                    <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
            >
                Create Product
            </button>
        </form>
    );
};

export {ProductForm};
