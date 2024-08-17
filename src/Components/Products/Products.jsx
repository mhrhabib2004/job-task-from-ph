import { useEffect, useState } from "react";
import Productcard from "./productcard";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

const Products = () => {
    const [product, setProduct] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(0); 
    const [sortBy, setSortBy] = useState('date'); 
    const [sortOrder, setSortOrder] = useState('desc'); 
    const [searchTerm, setSearchTerm] = useState(''); 

    // Function to fetch products with pagination, sorting, and search
    const fetchProducts = (page = 1, sortBy = 'date', sortOrder = 'desc', searchTerm = '') => {
        fetch(`${import.meta.env.VITE_LINK}/products?page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${searchTerm}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.products);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            });
    };

    // sort, or search term changes
    useEffect(() => {
        fetchProducts(currentPage, sortBy, sortOrder, searchTerm);
    }, [currentPage, sortBy, sortOrder, searchTerm]);

    // Handle next page button click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    // Handle previous page button click
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    // Handle sort change from dropdown
    const handleSortChange = (e) => {
        const [sortField, order] = e.target.value.split('-');
        setSortBy(sortField);
        setSortOrder(order);
        fetchProducts(1, sortField, order, searchTerm); 
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        fetchProducts(1, sortBy, sortOrder, searchTerm); 
    };

    // Handle reset button click
    const handleReset = () => {
        setSearchTerm(''); 
        fetchProducts(1, sortBy, sortOrder, ''); 
    };

    return (
        <div>
            {/* Search Input */}
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    onChange={handleSearchChange}
                    value={searchTerm}
                    placeholder="Search by product name"
                    className="p-2 border input-bordered input-secondary rounded w-full max-w-xs mr-2"
                />
                <button 
                    onClick={handleSearch} 
                    className="mr-1 btn btn-secondary"
                >
                    Search
                </button>
                <button 
                    onClick={handleReset} 
                    className="p-2 bg-gray-300 text-gray-800 rounded"
                >
                    Reset
                </button>
            </div>

            {/* Sort Controls */}
            <div className="flex justify-end mr-5 md:mr-10 mb-4">
                <select onChange={handleSortChange} className="select select-primary  max-w-xs">
                <option disabled selected>Sort By</option>
                    <option value="date-desc">Newest First</option>
                    <option value="price-asc">Low to High</option>
                    <option value="price-desc">High to Low</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                {product.map(product => (
                    <Productcard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex  justify-around mt-4">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                    className="btn btn-success text-white"
                >
                    <FaArrowLeftLong />
                    Previous
                </button>
                <span className="px-4 py-2 bg-gray-100 text-gray-800 rounded">{currentPage} / {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="btn btn-success text-white"
                >
                    <FaLongArrowAltRight />
                    Next
                </button>
            </div>
        </div>
    );
};

export default Products;
