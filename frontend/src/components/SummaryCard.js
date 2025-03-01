import React from 'react';
import { Card, Text } from '@shopify/polaris';

const SummaryCard = ({ responses }) => {
  // Default to empty array if responses is undefined or not an array
  const safeResponses = Array.isArray(responses) ? responses : [];
  const totalResponses = safeResponses.length;

  return (
    <Card title="Survey Summary" sectioned>
      <Text>Total Responses: {totalResponses}</Text>
    </Card>
  );
};

export default SummaryCard;