import React from 'react'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);
     
     

     
    const addProduct = async() => {
       console.log(name,price,category,company)

       if(!name || !price || !company || !category)
       {
           setError(true);
           return false
       }


       const userId = JSON.parse(localStorage.getItem('user'))._id;
       let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        alert("Product Added succesfully...!")
        console.warn(result)
        clearFields()
    }
     
    const clearFields = () =>{
      setName("")
      setPrice("")
      setCategory("")
      setCompnay("")
    }
    
     
         

  return (
    <div className='product'>
        <h3>Add Product</h3>
        <input className='inputBox' type='text' placeholder='Enter Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
        {error && !name && <span className='invalid-input'>Enter valid name</span>}

        <input className='inputBox' type='text' placeholder='Enter Product Price'  value={price} onChange={(e) => { setPrice(e.target.value) }}/>
        {error && !price && <span className='invalid-input'>Enter valid price</span>}

        <input className='inputBox' type='text' placeholder='Enter Product Category'  value={category} onChange={(e) => { setCategory(e.target.value) }} />
        {error && !category && <span className='invalid-input'>Enter valid category</span>} 

        <input className='inputBox' type='text' placeholder='Enter Product Company'  value={company} onChange={(e) => { setCompnay(e.target.value) }}/>
        {error && !company && <span className='invalid-input'>Enter valid company</span>}

        

        <button className='appButton'onClick={addProduct}>Add Product</button>
    </div>
  )
}

export default AddProduct