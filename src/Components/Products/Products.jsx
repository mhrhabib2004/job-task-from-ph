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
    const [brandFilter, setBrandFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState([0, Infinity]);

    // Function to fetch products with pagination, sorting, and search
    const fetchProducts = (page = 1, sortBy = 'date', sortOrder = 'desc', searchTerm = '', brand = '', category = '', priceRange = [0, Infinity]) => {
        fetch(`${import.meta.env.VITE_LINK}/products?page=${page}&limit=10&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${searchTerm}&brand=${brand}&category=${category}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data.products);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            });
    };

    useEffect(() => {
        fetchProducts(currentPage, sortBy, sortOrder, searchTerm, brandFilter, categoryFilter, priceRangeFilter);
    }, [currentPage, sortBy, sortOrder, searchTerm, brandFilter, categoryFilter, priceRangeFilter]);

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
        fetchProducts(1, sortField, order, searchTerm, brandFilter, categoryFilter, priceRangeFilter);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        fetchProducts(1, sortBy, sortOrder, searchTerm, brandFilter, categoryFilter, priceRangeFilter);
    };

    const handleReset = () => {
        setSearchTerm('');
        setBrandFilter('');
        setCategoryFilter('');
        setPriceRangeFilter([0, Infinity]);
        fetchProducts(1, sortBy, sortOrder, '', '', '', [0, Infinity]);
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
                <select onChange={handleSortChange} className="select select-primary max-w-xs">
                    <option disabled selected>Sort By</option>
                    <option value="date-desc">Newest First</option>
                    <option value="price-asc">Low to High</option>
                    <option value="price-desc">High to Low</option>
                </select>
            </div>

            {/* Categorization and Sorting Section */}
            <section className="justify-center items-center p-4">
                <div className="lg:flex gap-2 justify-center p-4">
                    {/* Brand Section */}
                    <div className="mb-2">
                        <select onChange={e => setBrandFilter(e.target.value)} value={brandFilter} className="select select-bordered w-full lg:w-56">
                            <option value="">All Brands</option>
                            <option value="SoundMagic">SoundMagic</option>
                            <option value="VisionElectro">VisionElectro</option>
                            <option value="GamePro">GamePro</option>
                            <option value="FileWell">FileWell</option>
                            <option value="ActionPro">ActionPro</option>
                            <option value="TimeTech">TimeTech</option>
                            <option value="ChergerUp">ChergerUp</option>
                            <option value="BrightSmile">BrightSmile</option>
                            <option value="SoundPro">SoundPro</option>
                        </select>
                    </div>

                    {/* Category Section */}
                    <div className="mb-2">
                        <select onChange={e => setCategoryFilter(e.target.value)} value={categoryFilter} className="select select-bordered w-full lg:w-56">
                            <option value="">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home Appliances">Home Appliances</option>
                            <option value="Computers">Computers</option>
                            <option value="Wearables">Wearables</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Cameras">Cameras</option>
                            <option value="Personal Care">Personal Care</option>
                        </select>
                    </div>

                    {/* Price Range Section */}
                    <div className="mb-2">
                        <select onChange={e => setPriceRangeFilter(e.target.value.split('-').map(Number))} value={priceRangeFilter.join('-')} className="select select-bordered w-full lg:w-56">
                            <option value="0-Infinity">All Prices</option>
                            <option value="0-50">Under $50</option>
                            <option value="50-100">$50 to $100</option>
                            <option value="100-500">$100 to $500</option>
                            <option value="500-Infinity">Over $500</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4">
                {product.map(product => (
                    <Productcard key={product._id} product={product} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-around mt-4">
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
