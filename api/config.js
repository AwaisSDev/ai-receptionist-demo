export default function handler(req, res) {
  // Allow cross-origin requests in case they fetch from different local test ports
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Clean outer quotes and trim whitespace from strings to prevent configuration errors
  const cleanString = (str) => {
    if (typeof str !== 'string') return '';
    let s = str.trim();
    if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
      s = s.slice(1, -1);
    }
    return s.trim();
  };

  // Robustly parse passcode query parameter across all environment ranches
  let passcode = '';
  if (req.query && req.query.passcode) {
    passcode = req.query.passcode;
  } else if (req.url) {
    try {
      const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
      passcode = url.searchParams.get('passcode') || '';
    } catch (e) {
      console.error('Error parsing URL query:', e);
    }
  }

  const correctPasscode = cleanString(process.env.DEMO_PASSWORD) || '1234';
  const userPasscode = cleanString(passcode);

  if (userPasscode === correctPasscode) {
    res.status(200).json({
      success: true,
      publicKey: process.env.VAPI_PUBLIC_KEY || '',
      assistantId: process.env.VAPI_ASSISTANT_ID || ''
    });
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}
