import {Card} from "@/components/ui/card.tsx";
import {Link} from "react-router";
import {Button} from "@/components/ui/button.tsx";
import {useDeleteProductMutation} from "@/state/products-api.ts";

interface IProps {
    imagePath: string;
    id: number
    name: string
}

const ProductsCard = ({imagePath, id, name}: IProps) => {

    const [deleteProduct] = useDeleteProductMutation();

    const handleDelete = (e:any) => {
        e.preventDefault();
        deleteProduct(id)
    }

    return (
        <Link to={`/products/${id}`}>
            <Card className={'p-7 shadow-2xl bg-gray-40000 rounded-3xl'}>
                <img src={imagePath} className={'w-40 aspect-square'} alt={`image${id}`}/>
                <span>{name}</span>
                <Button onClick={handleDelete}>Delete</Button>
            </Card>
        </Link>
    );
};

export {ProductsCard};
