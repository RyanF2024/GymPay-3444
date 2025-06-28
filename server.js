import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
if (supabaseUrl && supabaseServiceKey) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
  console.log('✅ Supabase client initialized');
} else {
  console.log('⚠️ Supabase not configured, using mock data');
}

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

// Helper function to get organization ID (mock for now)
const getOrganizationId = (req) => {
  // In a real app, this would come from authenticated user context
  return '550e8400-e29b-41d4-a716-446655440000';
};

// Root route for backend
app.get('/', (req, res) => {
  res.json({ 
    message: 'GymPay Backend API',
    version: '1.0.0',
    status: 'running',
    supabase: supabase ? 'connected' : 'not configured',
    endpoints: {
      health: '/health',
      test: '/api/test',
      gyms: '/api/gyms',
      instructors: '/api/instructors',
      payroll: '/api/payroll',
      analytics: '/api/analytics/overview',
      referrals: '/api/referrals'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    supabase: supabase ? 'connected' : 'not configured'
  });
});

// API routes
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Backend server is running successfully!',
    timestamp: new Date().toISOString(),
    supabase: supabase ? 'connected' : 'not configured'
  });
});

// Gym management routes
app.get('/api/gyms', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    
    if (supabase) {
      const { data, error } = await supabase
        .from('gyms')
        .select('*')
        .eq('organization_id', organizationId);
      
      if (error) throw error;
      res.json(data);
    } else {
      // Mock data fallback
      const gyms = [
        { id: 1, name: 'Downtown Fitness', location: 'New York', status: 'active' },
        { id: 2, name: 'Westside Gym', location: 'Los Angeles', status: 'active' },
        { id: 3, name: 'Elite Training Center', location: 'Chicago', status: 'active' }
      ];
      res.json(gyms);
    }
  } catch (error) {
    console.error('Error fetching gyms:', error);
    res.status(500).json({ error: 'Failed to fetch gyms' });
  }
});

app.post('/api/gyms', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const gymData = {
      ...req.body,
      organization_id: organizationId
    };
    
    if (supabase) {
      const { data, error } = await supabase
        .from('gyms')
        .insert([gymData])
        .select()
        .single();
      
      if (error) throw error;
      res.status(201).json(data);
    } else {
      // Mock response
      const newGym = {
        id: Date.now(),
        ...gymData,
        status: 'active',
        created_at: new Date().toISOString()
      };
      res.status(201).json(newGym);
    }
  } catch (error) {
    console.error('Error creating gym:', error);
    res.status(500).json({ error: 'Failed to create gym' });
  }
});

// Instructor management routes
app.get('/api/instructors', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    
    if (supabase) {
      const { data, error } = await supabase
        .from('instructors')
        .select(`
          *,
          gym:gyms(name, location)
        `)
        .eq('organization_id', organizationId);
      
      if (error) throw error;
      res.json(data);
    } else {
      // Mock data fallback
      const instructors = [
        {
          id: 1,
          first_name: 'Sarah',
          last_name: 'Johnson',
          email: 'sarah@example.com',
          specialties: ['Yoga', 'Pilates'],
          hourly_rate: 45,
          status: 'active',
          gym: { name: 'Downtown Fitness', location: 'New York' }
        },
        {
          id: 2,
          first_name: 'Michael',
          last_name: 'Chen',
          email: 'michael@example.com',
          specialties: ['HIIT', 'Strength'],
          hourly_rate: 50,
          status: 'active',
          gym: { name: 'Elite Training Center', location: 'Chicago' }
        }
      ];
      res.json(instructors);
    }
  } catch (error) {
    console.error('Error fetching instructors:', error);
    res.status(500).json({ error: 'Failed to fetch instructors' });
  }
});

app.post('/api/instructors', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const instructorData = {
      ...req.body,
      organization_id: organizationId
    };
    
    if (supabase) {
      const { data, error } = await supabase
        .from('instructors')
        .insert([instructorData])
        .select()
        .single();
      
      if (error) throw error;
      res.status(201).json(data);
    } else {
      // Mock response
      const newInstructor = {
        id: Date.now(),
        ...instructorData,
        status: 'active',
        created_at: new Date().toISOString()
      };
      res.status(201).json(newInstructor);
    }
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ error: 'Failed to create instructor' });
  }
});

app.put('/api/instructors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    if (supabase) {
      const { data, error } = await supabase
        .from('instructors')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      res.json(data);
    } else {
      // Mock response
      res.json({ id, ...updates, updated_at: new Date().toISOString() });
    }
  } catch (error) {
    console.error('Error updating instructor:', error);
    res.status(500).json({ error: 'Failed to update instructor' });
  }
});

app.delete('/api/instructors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (supabase) {
      const { error } = await supabase
        .from('instructors')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      res.json({ success: true });
    } else {
      // Mock response
      res.json({ success: true });
    }
  } catch (error) {
    console.error('Error deleting instructor:', error);
    res.status(500).json({ error: 'Failed to delete instructor' });
  }
});

// Payroll routes
app.get('/api/payroll', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    
    if (supabase) {
      const { data, error } = await supabase
        .from('payroll_periods')
        .select('*')
        .eq('organization_id', organizationId)
        .order('period_start', { ascending: false });
      
      if (error) throw error;
      res.json(data);
    } else {
      // Mock data fallback
      const payrollData = [
        {
          id: 1,
          period_start: '2024-03-01',
          period_end: '2024-03-15',
          status: 'completed',
          total_amount: 12450,
          instructor_count: 18,
          processed_date: '2024-03-15'
        }
      ];
      res.json(payrollData);
    }
  } catch (error) {
    console.error('Error fetching payroll:', error);
    res.status(500).json({ error: 'Failed to fetch payroll data' });
  }
});

app.post('/api/payroll', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const payrollData = {
      ...req.body,
      organization_id: organizationId
    };
    
    if (supabase) {
      const { data, error } = await supabase
        .from('payroll_periods')
        .insert([payrollData])
        .select()
        .single();
      
      if (error) throw error;
      res.status(201).json(data);
    } else {
      // Mock response
      const newPayroll = {
        id: Date.now(),
        ...payrollData,
        status: 'draft',
        created_at: new Date().toISOString()
      };
      res.status(201).json(newPayroll);
    }
  } catch (error) {
    console.error('Error creating payroll:', error);
    res.status(500).json({ error: 'Failed to create payroll' });
  }
});

// Analytics routes
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    
    if (supabase) {
      // Get recent analytics data
      const { data, error } = await supabase
        .from('analytics_data')
        .select('*')
        .eq('organization_id', organizationId)
        .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
      
      if (error) throw error;
      
      // Process data into overview format
      const overview = {
        totalRevenue: data.filter(d => d.metric_type === 'revenue').reduce((sum, d) => sum + parseFloat(d.metric_value), 0),
        activeInstructors: 23, // This would come from instructors table
        totalHours: 1203, // This would be calculated from payroll data
        growthRate: 8.1 // This would be calculated from historical data
      };
      
      res.json(overview);
    } else {
      // Mock analytics data
      const analytics = {
        totalRevenue: 98432,
        activeInstructors: 23,
        totalHours: 1203,
        growthRate: 8.1
      };
      res.json(analytics);
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics data' });
  }
});

// Referrals routes
app.get('/api/referrals', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    
    if (supabase) {
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .eq('organization_id', organizationId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      res.json(data);
    } else {
      // Mock data fallback
      const referrals = [
        {
          id: 1,
          referrer_name: 'Sarah Johnson',
          referred_name: 'Mike Wilson',
          referral_type: 'member',
          status: 'converted',
          reward_amount: 50,
          created_at: new Date().toISOString()
        }
      ];
      res.json(referrals);
    }
  } catch (error) {
    console.error('Error fetching referrals:', error);
    res.status(500).json({ error: 'Failed to fetch referrals' });
  }
});

app.post('/api/referrals', async (req, res) => {
  try {
    const organizationId = getOrganizationId(req);
    const referralData = {
      ...req.body,
      organization_id: organizationId
    };
    
    if (supabase) {
      const { data, error } = await supabase
        .from('referrals')
        .insert([referralData])
        .select()
        .single();
      
      if (error) throw error;
      res.status(201).json(data);
    } else {
      // Mock response
      const newReferral = {
        id: Date.now(),
        ...referralData,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      res.status(201).json(newReferral);
    }
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Failed to create referral' });
  }
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
  console.log(`🗄️ Database: ${supabase ? 'Supabase connected' : 'Using mock data'}`);
});

export default app;