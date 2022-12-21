import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_WISH_REQUEST } from '../../redux/reducers/wishList';
import WishList from '../WishList';
import './Floating.css';


const Floating = () => {
	const dispatch = useDispatch();
  const [status, setStatus] = useState(false)

	const { wishList } = useSelector((state) => state.wish);
	console.log(wishList);

	function handleClick(){
		setStatus(prevStats=>!prevStats);
	}
	
	function checkStatus(){
		return status ? 'appear' : 'hidden';
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
    dispatch({
      type: LOAD_WISH_REQUEST,
      payload: { token: token },
    });
  }, [])

	
	return (
    <div className="container">
      <div className="wrapper">
        <div className={`${checkStatus()} cart`}>
          <div className='floating__title'>MY Cart</div>
          <ul>
            {wishList.map((wish) => (
              <WishList wishVideo={wish.video} wish={wish}/>
            ))}
          </ul>
        </div>
        <button onClick={handleClick} className="btn">
          <FaShoppingCart
            style={{ fontSize: "30px", color: "#e4e4e6", marginTop: "5px" }}
          />
        </button>
      </div>
    </div>
  );
}

export default Floating
