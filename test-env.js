require('dotenv').config({ path: '.env.local' });

console.log('Environment Variables Test:');
console.log('==========================');
console.log('ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
console.log('ANTHROPIC_API_KEY length:', process.env.ANTHROPIC_API_KEY?.length);
console.log('ANTHROPIC_API_KEY prefix:', process.env.ANTHROPIC_API_KEY?.substring(0, 15) + '...');
console.log('All env vars with "API":', Object.keys(process.env).filter(key => key.includes('API')));
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL); 