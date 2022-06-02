import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Products = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [isExpensive, setIsExpensive] = useState(false)
    const [users, setUsers] = useState([])

    const localUser = localStorage.getItem("kandy_user")
    const localUserObject = JSON.parse(localUser)
    const navigate = useNavigate()
    useEffect(
        () => {
          fetch(`http://localhost:8088/products?_sort=name&_expand=productType`)
          .then((response) => response.json())  
          .then((productsArray) => {
              setProducts(productsArray)
          })

          fetch(`http://localhost:8088/users`)
          .then((response) => response.json())
          .then((usersArray) => {
              setUsers(usersArray)
          })
        },
        []
    )
    
    useEffect(
        () => {
            setFiltered(products)
        },
        [products]
    )

    useEffect(
        () => {
            if (isExpensive) {
                const expensiveProducts = products.filter(product => product.price > 2)
                setFiltered(expensiveProducts)
            }
        },
        [isExpensive]
    )

    return <>

        {
            localUserObject.staff
            ? <>
        <h2>Products</h2>
        <button
        onClick={
            () => {
                navigate("/products/new")
            }
        }
        >Add New Product</button>
        <button
        onClick={
            () => {
                setIsExpensive(true)
            }
        }
        >Top Priced</button>
        <ul>
            {
                filteredProducts.map(
                    (product) => {
                        return <li key={product.id}>
                            {product.name} - {product.productType.type} - {product.price.toLocaleString("en-us", {style:"currency", currency: "USD"})}
                        </li>
                    }
                )
            }
        </ul> 
        </>
        : ""
        }
    </>
}