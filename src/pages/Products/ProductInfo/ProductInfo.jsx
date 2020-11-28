import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductInfo.module.scss';

const ProductInfo = ({ product }) => {
  const {
    name, imageUrl, id, ...Alldata
  } = product;

  const renderComponents = () => (
    <span className={styles.value} id="components">
      {Array.prototype.map.call(
        Alldata.components, (component) => component.name
      ).toString()}
    </span>
  );

  const renderData = () => Object.keys(Alldata).map((item) => (
    <div key={item} className={styles.product_item}>
      <span className={styles.label}>{`${item}`}</span>
      { item === 'components' ? renderComponents()
        : <span className={styles.value} id={item}>{Alldata[item]}</span>}
    </div>
  ));

  return (
    <section
      className={` ${styles.product_info} `}
    >
      <div className={styles.product_img_content}>
        <div className={styles.circular_landscape}>
          <img
            src={product.imageUrl}
            className={styles.image}
            alt="miprofile"
          />
        </div>
      </div>
      <div className={styles.product_data}>
        <div className={[styles.content, styles.first].join(' ')}>
          <div className={[styles.product_item, styles.first].join(' ')}>
            <span className={styles.name} id="name" name="name">{product.name}</span>
          </div>
        </div>
        <div className={styles.content}>{renderData()}</div>
        {/* <div className={styles.content}>{String(components)}</div> */}
      </div>
    </section>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    manufacturer: PropTypes.string,
    category: PropTypes.string,
    components: PropTypes.arrayOf(PropTypes.object)
  })
};

ProductInfo.defaultProps = {
  product: undefined
};

export default ProductInfo;
