import { useEffect, useState } from "react";
import Productcard from "./productcard";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = (page = 1) => {
        fetch(`${import.meta.env.VITE_LINK}/products?page=${page}&limit=10`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.products);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            });
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                {product.map(product => (
                    <Productcard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
                >
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded">{currentPage} / {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded ml-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
