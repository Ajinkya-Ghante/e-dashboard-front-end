import './App.css';
import bgImage from './images/267-2675194_00106-3d-company-logos-design-free-logo-online.png'
import Nav from './components/Nav'
import Footer from './components/Footer'

import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import SignUp from './components/Sign-up';
import PrivateComponents from './components/PrivateComponents';
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductList from './components/ProductList'
import UpdateComponent from './components/UpdateComponent'

function App() {
  return (
    <BrowserRouter>
       <img
          alt='logo'
          className='bg-img'
          src={bgImage} />  
        

        <div className="App">          
        
          <Nav />          
          <Routes>
            <Route element={<PrivateComponents />}>
              <Route path='/' element={<ProductList />} />
              <Route path='/add' element={<AddProduct />} />
              <Route path='/update/:id' element={<UpdateComponent />} />
              <Route path='/logout' element={<h1>This is Logout Component</h1>} />              
            </Route>

            <Route path='/signup' element={<SignUp />} />
            <Route path="/login" element={<Login />} />

          </Routes>
        </div>
      <Footer />

    
    </BrowserRouter>
  );
}

export default App;
