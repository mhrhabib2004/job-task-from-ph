import { useLoaderData } from "react-router-dom";
import Products from "../Products/Products";

const Home = () => {
    const products = useLoaderData()
    // console.log(products)

    return (
        <div>
            <Products products={products}></Products>
        </div>
    );
};

export default Home;