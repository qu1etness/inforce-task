import { useState } from "react";
import { useParams } from "react-router";
import {
    useGetProductByIdQuery,
    useGetCommentsQuery,
    useAddCommentMutation,
    useDeleteCommentMutation,
} from "@/state/products-api";

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) return <p>Product ID is missing</p>;

    const productId = +id;

    const { data: product, isLoading: productLoading, isError: productError } =
        useGetProductByIdQuery(productId);

    const {
        data: comments,
        isLoading: commentsLoading,
        isError: commentsError,
    } = useGetCommentsQuery(productId);

    const [addComment] = useAddCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const [newComment, setNewComment] = useState("");

    if (productLoading) return <p>Loading product...</p>;
    if (productError || !product) return <p>Product not found</p>;

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            await addComment({ productId, text: newComment }).unwrap();
            setNewComment("");
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await deleteComment({ productId, commentId }).unwrap();
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>

            <img
                src={product.imageUrl}
                alt={product.name}
                className="w-80 h-80 object-cover rounded-lg"
            />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p>
                        <span className="font-semibold">Count:</span> {product.count}
                    </p>
                    <p>
                        <span className="font-semibold">Weight:</span> {product.weight}g
                    </p>
                </div>
                <div>
                    <p>
                        <span className="font-semibold">Size:</span>
                    </p>
                    <p>Width: {product.size.width}</p>
                    <p>Height: {product.size.height}</p>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                {commentsLoading ? (
                    <p>Loading comments...</p>
                ) : commentsError ? (
                    <p>Error loading comments</p>
                ) : (
                    <ul className="space-y-2">
                        {comments?.map((comment: any) => (
                            <li
                                key={comment.id}
                                className="flex justify-between items-center border p-2 rounded"
                            >
                                <span>{comment.description}</span>
                                <button
                                    onClick={() => handleDeleteComment(comment.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="mt-4 flex gap-2">
                    <input
                        type="text"
                        placeholder="New comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={handleAddComment}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
