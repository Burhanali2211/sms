// Simple test function
export default async (req, res) => {
  res.status(200).json({
    message: 'Hello from Netlify Functions!',
    timestamp: new Date().toISOString()
  });
};