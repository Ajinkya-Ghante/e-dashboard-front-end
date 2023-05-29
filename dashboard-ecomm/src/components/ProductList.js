import React, { useEffect, useState , useReducer } from 'react';
import { Link } from 'react-router-dom';


const initialState = 1

const reducer = (state,action) =>{
    switch(action){
        case 'nextPage': return state + 1
        case 'prevPage': return state - 1//{
           // if(state<=1) return state = 1
           // else return state - 1
     //   }
        
    }
}


const ProductList = () => {
    const [products, setProducts] = useState([]);
    let [totalPages, setTotalPages] = useState([])
    let [page, dispatch] = useReducer(reducer, initialState);
    
     

    useEffect(() => {
        getProducts(page);
    }, [page]);


    const getProducts = async (page) => {
       // console.log(page)
     

        let result = await fetch(`http://localhost:5000/products?page=${page}`);        
        result = await result.json();
       // console.log(result)
       
        setTotalPages(result.nbPages)
        setProducts(result.products);
    }

    const deleteProduct = async (id) => {
        console.warn(id)
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        console.log(result)
        if (result) {
             
            //let res = getProducts();
            //console.log(res.json())
            getProducts(page);
            
        } 
    }


    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts(page);
        }
        
    }

    const linkStyle = {
        textDecoration: "none",
        color: 'black'
      };
    
  return (
    <div className="product-list">
            <h3>Product List</h3>
            <input type="" className='search-product-box' placeholder='Search Product'
            onChange={searchHandle}
             />
            
            <ul className="list-heading">
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li> 
                <li>Company</li>  
                <li>Operation</li>           

            </ul>
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id} className="list-items">
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li>
                            <button style={linkStyle} onClick={() => {
                                deleteProduct(item._id);
                                if (index + 1 === 1 && totalPages === totalPages) {
                                    page--;
                                    dispatch('prevPage')
                                }
                            }
                            }>Delete</button>
                            <button id="update"><Link style={linkStyle} to={"/update/"+item._id} >Update </Link></button>                            
                            </li>
                         
                    </ul>
                    
                )
                
                :<h1>No Result Found</h1>
            }
          <div className="pagination-btn">
              <button  onClick={() => {(page<=1) ? page = 1 : dispatch('prevPage')}} >PREV</button>
              <p>
                  Page {page} of {totalPages}
              </p>
              <button  onClick={() => {(page>=totalPages) ? page = totalPages : dispatch('nextPage')}}>NEXT</button>
          </div>
        </div>
  )
}

export default ProductList