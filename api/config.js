export default function handler(req, res) {
  // Allow cross-origin requests in case they fetch from different local test ports
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json({
    success: true,
    publicKey: process.env.VAPI_PUBLIC_KEY || '',
    assistantId: process.env.VAPI_ASSISTANT_ID || ''
  });
}
