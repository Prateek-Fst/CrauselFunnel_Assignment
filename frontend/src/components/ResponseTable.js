import React from 'react';
import { DataTable } from '@shopify/polaris';

const ResponseTable = ({ responses }) => {
  // Default to empty array if responses is undefined or not an array
  const safeResponses = Array.isArray(responses) ? responses : [];
  const rows = safeResponses.map((r, i) => [
    i + 1,
    r.responses?.['1'] || 'N/A', // Safely access nested properties
    r.responses?.['2'] || 'N/A',
    r.shop || 'N/A',
  ]);

  return (
    <DataTable
      columnContentTypes={['text', 'text', 'text', 'text']}
      headings={['ID', 'Satisfaction', 'Recommend', 'Shop']}
      rows={rows}
    />
  );
};

export default ResponseTable;