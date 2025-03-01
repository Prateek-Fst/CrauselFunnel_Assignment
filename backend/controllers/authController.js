const Shopify = require('shopify-api-node');
const Shop = require('../models/Shop');
const axios = require('axios');

exports.install = (req, res) => {
  const shop = req.query.shop;
  console.log('Install request for shop:', shop);
  if (!shop) return res.status(400).send('Missing shop parameter');
  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=write_script_tags&redirect_uri=${process.env.APP_URL}/auth/callback`;
  console.log('Redirecting to OAuth URL:', authUrl);
  res.redirect(authUrl);
};

exports.callback = async (req, res) => {
  const { shop, code } = req.query;
  console.log('Callback received:', { shop, code });

  try {
    console.log('Requesting access token with code:', code);
    // Manual POST request to exchange code for access token
    const response = await axios.post(
      `https://${shop}/admin/oauth/access_token`,
      {
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }
    );
    const accessToken = response.data.access_token;
    console.log('Access token received:', accessToken);

    console.log('Updating shop in database:', shop);
    await Shop.findOneAndUpdate(
      { shop },
      { shop, accessToken },
      { upsert: true }
    );
    console.log('Shop updated successfully');

    // Initialize Shopify with access token for ScriptTag creation
    const shopify = new Shopify({
      shopName: shop,
      accessToken, // Use the retrieved access token directly
    });

    console.log('Creating ScriptTag');
    await shopify.scriptTag.create({
      event: 'onload',
      src: `${process.env.APP_URL}/public/survey.js`,
    });
    console.log('ScriptTag created successfully');

    const redirectUrl = `https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`;
    console.log('Redirecting to:', redirectUrl);
    res.redirect(redirectUrl);
  } catch (err) {
    console.error('Error during authentication:', err.message, err.response?.data || err.stack);
    res.status(500).send('Error during authentication');
  }
};