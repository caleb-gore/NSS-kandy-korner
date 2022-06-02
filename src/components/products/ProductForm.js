import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const ProductForm = () => {

    const navigate = useNavigate()
    const [productTypes, setProductTypes] = useState([])
    const [product, update] = useState({
        name: "",
        productTypeId: "",
        price: ""
    })

    useEffect(
        () => {
            console.log(productTypes);
        },
        [productTypes]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/productTypes`)
            .then((response) => response.json())
            .then((productTypesArray) => {
                setProductTypes(productTypesArray)
            })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productToSendtoApi = {
            name: product.name,
            productTypeId: product.productTypeId,
            price: product.price
        }

        return fetch(`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productToSendtoApi)
        })
        .then((response) => response.json())
        .then(() => {
            navigate("/products")
        })
    }

    return <>
        <form className="productForm">
            <h2 className="productForm__title">Enter New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="enter product name"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        }
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="productType">Product Type</label>
                    <select 
                    onChange={
                        (evt) => {
                            const copy = {...product}
                            copy.productTypeId = evt.target.value
                            update(copy)
                        }
                    }
                    >
                        <option key={0}>choose a product type</option>
                        {productTypes.map((type) => {
                            return <option key={type.id} value={type.id}>{type.type}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        }
                        />
                </div>
            </fieldset>
            <button
            onClick={
                (event) => handleSaveButtonClick(event)
            }
            className="btn btn-primary"
            >Add Product</button>
        </form>
    </>

}
