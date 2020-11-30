import React, {
  useCallback, useEffect, useState
} from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';

import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../constans/routes';
import API from '../../services';
import Table from '../../components/Table/Table';

const { Title } = Typography;

const Products = () => {
  const [products, setProducts] = useState([]);

  const { loading } = useSelector((state) => state.loader);

  const fetchProducts = useCallback(async () => {
    const res = await API.products.getProducts();
    setProducts(res.data);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const getColumns = () => [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (text, record) => (
        <div
          style={{
            width: '100px',
            height: '100px',
            background: '#eee',
            position: 'relative'
          }}
        >
          <img
            style={{
              position: 'absolute',
              maxHeight: '100%',
              maxWidth: '100%',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              margin: 'auto'
            }}
            alt={record.key}
            src={record.imageUrl}
          />
        </div>
      )
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (<Link to={`${PRODUCTS}/${record.id}/view`}>{text}</Link>)
    },
    {
      title: 'Manufacturer',
      dataIndex: 'manufacturer',
      key: 'manufacturer'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
    },
  ];

  return (
    <div>
      <Title>Products</Title>

      <Table columns={getColumns()} data={products} rowKey="id" loading={loading} />
    </div>
  );
};

export default Products;
