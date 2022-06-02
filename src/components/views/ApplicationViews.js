import { Route, Routes } from "react-router-dom"
import { Locations } from "../Locations"
import { Products } from "../products/Products"
import { ProductForm } from "../products/ProductForm"

export const ApplicationViews = () => {
	return <>
		<Routes>
			<Route>
				<Route path="locations" element={ <Locations />} />
				<Route path="products" element={ <Products />} />
				<Route path="products/new" element={ <ProductForm />} />
			</Route>
		</Routes>
	</>
}

