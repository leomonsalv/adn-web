import React from 'react';
import { Table as AntdTable } from 'antd';
import PropTypes from 'prop-types';

const Table = ({
  columns, data, rowKey, loading, ...props
}) => (
  <AntdTable columns={columns} dataSource={data} rowKey={rowKey} loading={loading} {...props} />
);

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      dataIndex: PropTypes.string,
      key: PropTypes.string,
      render: PropTypes.func
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      name: PropTypes.string,
      tag: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  rowKey: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

Table.defaultProps = {
  rowKey: ''
};

export default Table;
