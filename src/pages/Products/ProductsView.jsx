import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadingWithSpinner } from '../../stores/actions/loader';
import API from '../../services';

import BackButton from '../../components/BackButton/BackButton';
import styles from './Products.module.scss';

import ProductInfo from './ProductInfo/ProductInfo';

const ProductsView = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch(loadingWithSpinner());
      const res = await API.products.getProductById(params.productId);
      const productDetail = res.data;
      setProduct(productDetail);
    };
    fetchProduct();
  }, [dispatch, params.productId]);

  return (
    <div className={styles.productContainer}>
      <BackButton />
      {product && <ProductInfo product={product} />}
    </div>
  );
};

export default ProductsView;
