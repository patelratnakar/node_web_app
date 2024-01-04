import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import "./Home.css"


const Product = ({product}) => {
    const options = {
        edit:false,
        color:'gold',
        activeColor:'tomato',
        size:window.innerWidth < 600 ? 20 : 25 ,
        value:product.Ratings,
        isHalf:true
    }
    const to = `/product/${product._id}`
    let src = product.Images[0].url
    src = src.substring(0, 55) + "f_auto/" + src.substring(55, src.length);
  return (
    <>
        <Link className="productCard" to={to}>
        <div className='img'>
        <img src={src} alt={product.Name} />
        </div>
        <p>{product.Name}</p>
        <div>
            <ReactStars {...options} />
            <span>({product.NumofReviews} Reviews)</span>
        </div>
        <span className='price'> ₹{product.Price} </span>
        </Link>
    </>
  )
}

export default Product