import React, { useState, useEffect } from 'react';
import { Page, Layout } from '@shopify/polaris';
import SummaryCard from './SummaryCard';
import ResponseTable from './ResponseTable';
import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import axios from 'axios';

const Dashboard = () => {
  const app = useAppBridge();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('API URL:', `${process.env.REACT_APP_API_URL}/api/survey/data`); // Fixed log
        console.log('Fetching data with app:', app);
        const token = await getSessionToken(app);
        console.log('Session token:', token);
        const res = await axios.get(`https://4zowcs-ip-223-181-34-199.tunnelmole.net/api/survey/data`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('API response:', res.data);
        setResponses(res.data || []);
      } catch (error) {
        console.error('Error fetching survey data:', error.response || error);
      }
    };
    fetchData();
  }, [app]);

  return (
    <Page title="Survey Dashboard">
      <Layout>
        <Layout.Section>
          <SummaryCard responses={responses} />
        </Layout.Section>
        <Layout.Section>
          <ResponseTable responses={responses} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;