
const Productcard = ({ product }) => {
    // console.log(product)
    const {productName,productImage,description,price,category,ratings,productCreationDateTime,brandName}=product;
    return (
        <div className="card bg-base-100 w-auto  shadow-xl">
            <figure>
                <img className="h-60"
                    src={productImage}
                    alt="productimg" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Name : {productName}</h2>
                <p>Description : {description}</p>
                <p>category : {category}</p>
                <p>Brand Name: {brandName}</p>
                <p>Description : {price}</p>
                <p>Ratings : {ratings}</p>
            </div>
        </div>
    );
};

export default Productcard;