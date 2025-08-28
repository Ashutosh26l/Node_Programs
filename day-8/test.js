// Test script to demonstrate rate limiter functionality
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000';

async function testRateLimiter() {
  console.log('🚀 Testing Rate Limiter (499 requests per minute)\n');

  // Test 1: Check initial status
  console.log('1. Checking initial rate limit status...');
  try {
    const statusResponse = await fetch(`${BASE_URL}/rate-limit-status`);
    const statusData = await statusResponse.json();
    console.log('✅ Status:', statusData);
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 2: Make multiple requests to test the counter
  console.log('\n2. Making 10 test requests...');
  for (let i = 1; i <= 10; i++) {
    try {
      const response = await fetch(`${BASE_URL}/test`);
      const data = await response.json();
      console.log(`✅ Request ${i}: Status ${response.status}, Remaining: ${response.headers.get('x-ratelimit-remaining')}`);
    } catch (error) {
      console.log(`❌ Request ${i} failed:`, error.message);
    }
  }

  // Test 3: Check status after requests
  console.log('\n3. Checking rate limit status after requests...');
  try {
    const statusResponse = await fetch(`${BASE_URL}/rate-limit-status`);
    const statusData = await statusResponse.json();
    console.log('✅ Final Status:', statusData);
  } catch (error) {
    console.log('❌ Error:', error.message);
  }

  // Test 4: Test POST endpoint
  console.log('\n4. Testing POST endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ test: 'data', message: 'Hello from test script!' })
    });
    const data = await response.json();
    console.log('✅ POST Response:', data);
    console.log(`   Rate limit remaining: ${response.headers.get('x-ratelimit-remaining')}`);
  } catch (error) {
    console.log('❌ POST Error:', error.message);
  }

  console.log('\n🎉 Rate limiter test completed!');
  console.log('💡 Try making more than 499 requests to see the rate limit in action.');
  console.log('💡 The limit resets every minute.');
}

// Run the test
testRateLimiter().catch(console.error);
