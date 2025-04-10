// import React from 'react';
// import { Table, Button } from 'antd';

// const RegisteredCompetitionsTable = ({
//   registeredCompetitions,
//   registeredCompetitionsColumns,
//   currentPage,
//   itemsPerPage,
//   handlePageChange
// }) => (
//   <Table
//     dataSource={registeredCompetitions}
//     columns={registeredCompetitionsColumns}
//     pagination={{
//       current: currentPage,
//       pageSize: itemsPerPage,
//       total: registeredCompetitions.length,
//       onChange: handlePageChange,
//     }}
//   />
// );

// export default RegisteredCompetitionsTable;


// src/components/user/RegisteredCompetitionsTable.js

// src/components/user/RegisteredCompetitionsTable.js

import React from 'react';
import { Table } from 'antd';
import registeredCompetitionsColumns from './RegisteredCompetitionsColumns';

const RegisteredCompetitionsTable = ({
  registeredCompetitions,
  currentPage,
  itemsPerPage,
  handlePageChange,
  showCompetitionDetailModal, // Ensure this prop is received
}) => {
  const columns = registeredCompetitionsColumns(showCompetitionDetailModal);

  return (
    <Table
      dataSource={registeredCompetitions}
      columns={columns}
      pagination={{
        current: currentPage,
        pageSize: itemsPerPage,
        total: registeredCompetitions.length,
        onChange: handlePageChange,
      }}
      rowKey="id"
    />
  );
};

export default RegisteredCompetitionsTable;
