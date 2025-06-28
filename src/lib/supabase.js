import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using mock data.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database service class
class DatabaseService {
  constructor() {
    this.client = supabase;
    this.isConnected = !!supabase;
  }

  // Check if Supabase is connected
  isSupabaseConnected() {
    return this.isConnected;
  }

  // Organizations
  async getOrganizations() {
    if (!this.client) return this.getMockOrganizations();
    
    const { data, error } = await this.client
      .from('organizations')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async createOrganization(organization) {
    if (!this.client) return this.createMockOrganization(organization);
    
    const { data, error } = await this.client
      .from('organizations')
      .insert([organization])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Gyms
  async getGyms(organizationId) {
    if (!this.client) return this.getMockGyms();
    
    const { data, error } = await this.client
      .from('gyms')
      .select('*')
      .eq('organization_id', organizationId);
    
    if (error) throw error;
    return data;
  }

  async createGym(gym) {
    if (!this.client) return this.createMockGym(gym);
    
    const { data, error } = await this.client
      .from('gyms')
      .insert([gym])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Instructors
  async getInstructors(organizationId) {
    if (!this.client) return this.getMockInstructors();
    
    const { data, error } = await this.client
      .from('instructors')
      .select(`
        *,
        gym:gyms(name, location)
      `)
      .eq('organization_id', organizationId);
    
    if (error) throw error;
    return data;
  }

  async createInstructor(instructor) {
    if (!this.client) return this.createMockInstructor(instructor);
    
    const { data, error } = await this.client
      .from('instructors')
      .insert([instructor])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateInstructor(id, updates) {
    if (!this.client) return this.updateMockInstructor(id, updates);
    
    const { data, error } = await this.client
      .from('instructors')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async deleteInstructor(id) {
    if (!this.client) return this.deleteMockInstructor(id);
    
    const { error } = await this.client
      .from('instructors')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }

  // Payroll
  async getPayrollPeriods(organizationId) {
    if (!this.client) return this.getMockPayrollPeriods();
    
    const { data, error } = await this.client
      .from('payroll_periods')
      .select('*')
      .eq('organization_id', organizationId)
      .order('period_start', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createPayrollPeriod(payrollPeriod) {
    if (!this.client) return this.createMockPayrollPeriod(payrollPeriod);
    
    const { data, error } = await this.client
      .from('payroll_periods')
      .insert([payrollPeriod])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async getPayrollEntries(payrollPeriodId) {
    if (!this.client) return this.getMockPayrollEntries();
    
    const { data, error } = await this.client
      .from('payroll_entries')
      .select(`
        *,
        instructor:instructors(first_name, last_name, email)
      `)
      .eq('payroll_period_id', payrollPeriodId);
    
    if (error) throw error;
    return data;
  }

  // Analytics
  async getAnalyticsData(organizationId, dateRange = 30) {
    if (!this.client) return this.getMockAnalyticsData();
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange);
    
    const { data, error } = await this.client
      .from('analytics_data')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createAnalyticsEntry(entry) {
    if (!this.client) return this.createMockAnalyticsEntry(entry);
    
    const { data, error } = await this.client
      .from('analytics_data')
      .insert([entry])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Referrals
  async getReferrals(organizationId) {
    if (!this.client) return this.getMockReferrals();
    
    const { data, error } = await this.client
      .from('referrals')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  async createReferral(referral) {
    if (!this.client) return this.createMockReferral(referral);
    
    const { data, error } = await this.client
      .from('referrals')
      .insert([referral])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  // Mock data methods (fallback when Supabase is not connected)
  getMockOrganizations() {
    return [
      {
        id: '550e8400-e29b-41d4-a716-446655440000',
        name: 'Fitness Group International',
        subscription_plan: 'professional',
        created_at: new Date().toISOString()
      }
    ];
  }

  getMockGyms() {
    return [
      { id: 1, name: 'Downtown Fitness', location: 'New York, NY', status: 'active' },
      { id: 2, name: 'Westside Gym', location: 'Los Angeles, CA', status: 'active' },
      { id: 3, name: 'Elite Training Center', location: 'Chicago, IL', status: 'active' }
    ];
  }

  getMockInstructors() {
    return [
      {
        id: 1,
        first_name: 'Sarah',
        last_name: 'Johnson',
        email: 'sarah.johnson@example.com',
        specialties: ['Yoga', 'Pilates'],
        hourly_rate: 45.00,
        status: 'active',
        gym: { name: 'Downtown Fitness', location: 'New York, NY' }
      },
      {
        id: 2,
        first_name: 'Michael',
        last_name: 'Chen',
        email: 'michael.chen@example.com',
        specialties: ['HIIT', 'Strength Training'],
        hourly_rate: 50.00,
        status: 'active',
        gym: { name: 'Downtown Fitness', location: 'New York, NY' }
      },
      {
        id: 3,
        first_name: 'Emma',
        last_name: 'Davis',
        email: 'emma.davis@example.com',
        specialties: ['Zumba', 'Dance'],
        hourly_rate: 42.00,
        status: 'active',
        gym: { name: 'Westside Gym', location: 'Los Angeles, CA' }
      }
    ];
  }

  getMockPayrollPeriods() {
    return [
      {
        id: 1,
        period_start: '2024-03-01',
        period_end: '2024-03-15',
        status: 'completed',
        total_amount: 12450.00,
        instructor_count: 18,
        processed_date: '2024-03-15T10:00:00Z'
      },
      {
        id: 2,
        period_start: '2024-02-16',
        period_end: '2024-02-29',
        status: 'completed',
        total_amount: 11820.00,
        instructor_count: 17,
        processed_date: '2024-02-29T10:00:00Z'
      }
    ];
  }

  getMockPayrollEntries() {
    return [
      {
        id: 1,
        hours_worked: 40.0,
        hourly_rate: 45.00,
        total_amount: 1800.00,
        net_amount: 1850.00,
        instructor: { first_name: 'Sarah', last_name: 'Johnson', email: 'sarah.johnson@example.com' }
      }
    ];
  }

  getMockAnalyticsData() {
    return [
      {
        id: 1,
        date: new Date().toISOString().split('T')[0],
        metric_type: 'revenue',
        metric_value: 2840.00,
        metadata: { source: 'classes' }
      },
      {
        id: 2,
        date: new Date().toISOString().split('T')[0],
        metric_type: 'attendance',
        metric_value: 89.0,
        metadata: { total_capacity: 100 }
      }
    ];
  }

  getMockReferrals() {
    return [
      {
        id: 1,
        referrer_name: 'Sarah Johnson',
        referred_name: 'Mike Wilson',
        referral_type: 'member',
        status: 'converted',
        reward_amount: 50.00,
        created_at: new Date().toISOString()
      },
      {
        id: 2,
        referrer_name: 'John Smith',
        referred_name: 'Emma Davis',
        referral_type: 'member',
        status: 'pending',
        reward_amount: 0.00,
        created_at: new Date().toISOString()
      }
    ];
  }

  // Mock create methods
  createMockInstructor(instructor) {
    return {
      id: Date.now(),
      ...instructor,
      status: 'active',
      created_at: new Date().toISOString()
    };
  }

  createMockPayrollPeriod(payrollPeriod) {
    return {
      id: Date.now(),
      ...payrollPeriod,
      status: 'draft',
      created_at: new Date().toISOString()
    };
  }

  createMockReferral(referral) {
    return {
      id: Date.now(),
      ...referral,
      status: 'pending',
      created_at: new Date().toISOString()
    };
  }

  updateMockInstructor(id, updates) {
    return { id, ...updates, updated_at: new Date().toISOString() };
  }

  deleteMockInstructor(id) {
    return true;
  }
}

export const db = new DatabaseService();