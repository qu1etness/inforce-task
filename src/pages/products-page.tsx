import {useGetProductsQuery} from "../state/products-api.ts";
import {ProductsCard} from "@/components/products/products-card.tsx";
import {Plus} from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {ProductForm} from "@/components/products/product-form.tsx";


const ProductsPage = () => {

    const {isError, isLoading, data} = useGetProductsQuery()

    return (
        <div className={'w-screen min-h-screen'}>
            <header className={'flex justify-center items-center p-10'}>
                <h1 className={'text-gray-600 text-6xl'}>Products</h1>
            </header>
            <div className={'w-full h-4 bg-black'}/>
            <div className={'h-20'}/>
            <div className={'w-full h-0.5 bg-gray-600'}/>
            <main className={'w-full flex-1 p-10 flex justify-start items-center gap-10  flex-wrap'}>
                {isLoading && <span>Loading...</span>}
                {isError && <span className={'text-red-600'}>Something went wrong</span>}
                {data && data.map(item => (
                    <ProductsCard
                        key={`${item.name}+${item.id}`}
                        imagePath={item.imageUrl}
                        id={item.id}
                        name={item.name}
                    />
                ))}
                <Dialog>
                    <DialogTrigger className={'absolute bottom-10 right-10 cursor-pointer bg-black p-5 rounded-3xl text-white'}><Plus/></DialogTrigger>
                    <DialogContent>
                        <DialogTitle></DialogTitle>
                        <DialogHeader>
                            <h3 className={'text-black text-'}>Add new product</h3>
                            <DialogDescription></DialogDescription>
                            <DialogContent>
                                <ProductForm/>
                            </DialogContent>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
};

export default ProductsPage;
