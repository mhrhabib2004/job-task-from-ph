import { useEffect, useState } from "react";
import Productcard from "./productcard";

const Products = () => {
    const [product, setProduct] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortBy, setSortBy] = useState('date');
    const [sortOrder, setSortOrder] = useState('desc'); // Default to newest first

    const fetchProducts = (page = 1, sortBy = 'date', sortOrder = 'desc') => {
        fetch(`${import.meta.env.VITE_LINK}/products?page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.products);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            });
    };

    useEffect(() => {
        fetchProducts(currentPage, sortBy, sortOrder);
    }, [currentPage, sortBy, sortOrder]);

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

    const handleSortChange = (e) => {
        const [sortField, order] = e.target.value.split('-');
        setSortBy(sortField);
        setSortOrder(order);
        fetchProducts(1, sortField, order); // Reset to page 1 after sorting
    };

    return (
        <div>
            {/* Sort Controls */}
            <div className="flex justify-end mb-4">
                <select onChange={handleSortChange} className="p-2 border rounded">
                    <option value="date-desc">Newest First</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

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
