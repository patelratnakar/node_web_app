import { useEffect } from 'react';
import './Home.css'
import { getallproducts } from '../../Actions/productaction'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './ProductCard'
import Metadata from '../Layout/Metadata'
import Loading from '../Loading/Loading'
import { useAlert } from 'react-alert'

const Home = () => {

  const alert = useAlert()
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector((state) => state.allproducts)

  useEffect(() => {
    if (error) {
      // console.log(error)
      return alert.error(error)
    }
    dispatch(getallproducts())
  }, [dispatch, error,alert])

  return (
    <>
      <Metadata title='ECOMMERCE | Home' />

            <div className="banner">
              <p>Welcome To Ecommerce</p>
              <h1>FIND AMAZING PRODUCTS HERE</h1>

              <a href="#container">
                <button>
                  Scroll
                </button>
              </a>
            </div>

            <h2 className="homeheading">Featured Content</h2>

      {loading ? (<Loading />) :
        (
          <>

            <div className='container' id="container">
              {products && products.map((product) => {
                return <ProductCard product={product} />
              }
              )}
            </div>
          </>
        )
      }
    </>
  )
}

export default Home