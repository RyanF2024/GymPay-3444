import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Root route for backend
app.get('/', (req, res) => {
  res.json({ 
    message: 'GymPay Backend API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      test: '/api/test',
      gyms: '/api/gyms',
      instructors: '/api/instructors',
      payroll: '/api/payroll',
      analytics: '/api/analytics/overview'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Gym management routes
app.get('/api/gyms', (req, res) => {
  // Mock gym data - replace with database queries
  const gyms = [
    { id: 1, name: 'Downtown Fitness', location: 'New York', status: 'active' },
    { id: 2, name: 'Westside Gym', location: 'Los Angeles', status: 'active' },
    { id: 3, name: 'Elite Training Center', location: 'Chicago', status: 'active' }
  ];
  res.json(gyms);
});

// Instructor management routes
app.get('/api/instructors', (req, res) => {
  // Mock instructor data
  const instructors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      specialties: ['Yoga', 'Pilates'],
      hourlyRate: 45,
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael@example.com',
      specialties: ['HIIT', 'Strength'],
      hourlyRate: 50,
      status: 'active'
    }
  ];
  res.json(instructors);
});

app.post('/api/instructors', (req, res) => {
  // Mock instructor creation
  const newInstructor = {
    id: Date.now(),
    ...req.body,
    status: 'active',
    createdAt: new Date().toISOString()
  };
  res.status(201).json(newInstructor);
});

// Payroll routes
app.get('/api/payroll', (req, res) => {
  // Mock payroll data
  const payrollData = [
    {
      id: 1,
      period: 'March 1-15, 2024',
      status: 'completed',
      totalAmount: 12450,
      instructorCount: 18,
      processedDate: '2024-03-15'
    }
  ];
  res.json(payrollData);
});

// Analytics routes
app.get('/api/analytics/overview', (req, res) => {
  // Mock analytics data
  const analytics = {
    totalRevenue: 98432,
    activeInstructors: 23,
    totalHours: 1203,
    growthRate: 8.1
  };
  res.json(analytics);
});

// Stripe webhook placeholder (will be implemented later)
app.post('/api/stripe/webhook', (req, res) => {
  console.log('Stripe webhook received');
  res.json({ received: true });
});

// Stripe API routes (placeholders for now)
app.post('/api/stripe/create-checkout-session', (req, res) => {
  res.status(501).json({ 
    error: 'Stripe integration not yet implemented',
    message: 'This endpoint will be implemented in the next phase'
  });
});

app.post('/api/stripe/create-portal-session', (req, res) => {
  res.status(501).json({ 
    error: 'Stripe integration not yet implemented',
    message: 'This endpoint will be implemented in the next phase'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler - only for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API endpoint not found',
    message: `API route ${req.originalUrl} not found`
  });
});

// Catch-all for non-API routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: `This is the GymPay backend API. Frontend should be accessed at ${process.env.FRONTEND_URL || 'http://localhost:5173'}`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🏋️ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🎯 Frontend should be running on: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

export default app;