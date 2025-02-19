import { format } from 'date-fns';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  template: string;
  tests: TestCase[];
  hints: string[];
  xp: number;
  dailyChallenge?: boolean;
}

interface TestCase {
  input: any;
  expected: any;
  description: string;
}

const challengeTemplates = [
  {
    id: 'auth-login',
    title: 'Implement User Authentication',
    description: `Create a login function that validates user credentials. The function should:
    1. Check if the email is valid
    2. Ensure password meets security requirements
    3. Return appropriate success/error messages`,
    difficulty: 'Medium',
    category: 'Authentication',
    template: `function login(email: string, password: string): LoginResult {
  // Your code here
  // Validate email format
  // Check password requirements (min 8 chars, 1 uppercase, 1 number)
  // Return { success: boolean, message: string }
}`,
    tests: [
      {
        input: { email: 'test@example.com', password: 'Password123' },
        expected: { success: true, message: 'Login successful' },
        description: 'Valid credentials should return success'
      },
      {
        input: { email: 'invalid-email', password: 'pass' },
        expected: { success: false, message: 'Invalid email format' },
        description: 'Invalid email should be rejected'
      }
    ],
    hints: [
      'Use a regular expression to validate email format',
      'Check password length and character requirements separately',
      'Consider using string methods like match() for validation'
    ],
    xp: 200
  },
  {
    id: 'api-fetch',
    title: 'Implement API Data Fetching',
    description: `Create a function that fetches and transforms data from an API. The function should:
    1. Handle API requests with proper error handling
    2. Transform the response data into the required format
    3. Implement caching for improved performance`,
    difficulty: 'Medium',
    category: 'API Integration',
    template: `async function fetchAndTransformData(endpoint: string): Promise<TransformedData> {
  // Your code here
  // Fetch data from the endpoint
  // Transform the response
  // Implement basic caching
  // Handle errors appropriately
}`,
    tests: [
      {
        input: 'https://api.example.com/data',
        expected: { status: 'success', data: [] },
        description: 'Should fetch and transform data successfully'
      }
    ],
    hints: [
      'Use try/catch blocks for error handling',
      'Consider implementing a simple cache using Map',
      'Remember to handle network timeouts'
    ],
    xp: 250
  }
];

export function getDailyChallenge(): Challenge {
  const today = format(new Date(), 'yyyy-MM-dd');
  const index = parseInt(today.split('-').join(''), 10) % challengeTemplates.length;
  const challenge = { ...challengeTemplates[index], dailyChallenge: true };
  return challenge;
}

export function getAllChallenges(): Challenge[] {
  return challengeTemplates;
}

export function getChallengeById(id: string): Challenge | undefined {
  return challengeTemplates.find(challenge => challenge.id === id);
}

export function evaluateSubmission(challenge: Challenge, code: string): {
  success: boolean;
  results: { passed: boolean; message: string }[];
  suggestions: string[];
  score: number;  // New score property
} {
  const results = challenge.tests.map(test => ({
    passed: Math.random() > 0.3,
    message: Math.random() > 0.3 ? 'Test passed' : 'Test failed'
  }));

  const passedTests = results.filter(r => r.passed).length;
  const totalTests = challenge.tests.length;
  const score = Math.round((passedTests / totalTests) * 100); // Score calculation

  return {
    success: results.every(r => r.passed),
    results,
    suggestions: ['Optimize loops', 'Improve error handling'],
    score // Include score in return
  };
}
