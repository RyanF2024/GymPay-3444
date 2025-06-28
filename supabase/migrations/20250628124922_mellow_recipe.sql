/*
  # Sample Data Migration

  1. Sample Data
    - Insert sample organizations (without owner_id to avoid foreign key issues)
    - Insert sample gyms for the organizations
    - Insert sample instructors with various specialties
    - Insert sample payroll periods and entries
    - Insert sample analytics data for reporting
    - Insert sample referrals for the referral program

  2. Data Structure
    - Uses consistent UUIDs for referential integrity
    - Includes realistic data for demonstration
    - Covers all major application features
*/

-- Insert sample organization (without owner_id to avoid foreign key constraint)
INSERT INTO organizations (id, name, subscription_plan, stripe_customer_id) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Fitness Group International', 'professional', 'cus_demo123')
ON CONFLICT (id) DO NOTHING;

-- Insert sample gyms
INSERT INTO gyms (id, organization_id, name, location, timezone, status) VALUES
  ('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', 'Downtown Fitness', 'New York, NY', 'America/New_York', 'active'),
  ('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', 'Westside Gym', 'Los Angeles, CA', 'America/Los_Angeles', 'active'),
  ('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', 'Elite Training Center', 'Chicago, IL', 'America/Chicago', 'active')
ON CONFLICT (id) DO NOTHING;

-- Insert sample instructors
INSERT INTO instructors (id, organization_id, gym_id, first_name, last_name, email, phone, specialties, hourly_rate, status, hire_date) VALUES
  ('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', 'Sarah', 'Johnson', 'sarah.johnson@example.com', '+1-555-0101', ARRAY['Yoga', 'Pilates'], 45.00, 'active', '2023-01-15'),
  ('550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440010', 'Michael', 'Chen', 'michael.chen@example.com', '+1-555-0102', ARRAY['HIIT', 'Strength Training'], 50.00, 'active', '2023-02-01'),
  ('550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 'Emma', 'Davis', 'emma.davis@example.com', '+1-555-0103', ARRAY['Zumba', 'Dance'], 42.00, 'active', '2023-03-10'),
  ('550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440011', 'John', 'Smith', 'john.smith@example.com', '+1-555-0104', ARRAY['CrossFit', 'Strength Training'], 48.00, 'active', '2023-04-05'),
  ('550e8400-e29b-41d4-a716-446655440024', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440012', 'Lisa', 'Rodriguez', 'lisa.rodriguez@example.com', '+1-555-0105', ARRAY['Yoga', 'Meditation'], 44.00, 'active', '2023-05-20')
ON CONFLICT (id) DO NOTHING;

-- Insert sample payroll periods
INSERT INTO payroll_periods (id, organization_id, period_start, period_end, status, total_amount, instructor_count, processed_date) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', '2024-03-01', '2024-03-15', 'completed', 12450.00, 18, '2024-03-15 10:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', '2024-02-16', '2024-02-29', 'completed', 11820.00, 17, '2024-02-29 10:00:00+00'),
  ('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000', '2024-02-01', '2024-02-15', 'completed', 12100.00, 18, '2024-02-15 10:00:00+00')
ON CONFLICT (id) DO NOTHING;

-- Insert sample payroll entries
INSERT INTO payroll_entries (payroll_period_id, instructor_id, hours_worked, hourly_rate, total_amount, bonus_amount, deductions, net_amount) VALUES
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440020', 40.0, 45.00, 1800.00, 100.00, 50.00, 1850.00),
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440021', 35.0, 50.00, 1750.00, 150.00, 75.00, 1825.00),
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440022', 30.0, 42.00, 1260.00, 50.00, 40.00, 1270.00),
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440023', 32.0, 48.00, 1536.00, 80.00, 60.00, 1556.00),
  ('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440024', 28.0, 44.00, 1232.00, 60.00, 45.00, 1247.00);

-- Insert sample analytics data
INSERT INTO analytics_data (organization_id, date, metric_type, metric_value, metadata) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '1 day', 'revenue', 2840.00, '{"source": "classes", "gym_id": "550e8400-e29b-41d4-a716-446655440010"}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '1 day', 'attendance', 89.0, '{"total_capacity": 100, "gym_id": "550e8400-e29b-41d4-a716-446655440010"}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '1 day', 'instructor_performance', 96.0, '{"instructor_id": "550e8400-e29b-41d4-a716-446655440020", "rating": 4.8}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '2 days', 'revenue', 3120.00, '{"source": "classes", "gym_id": "550e8400-e29b-41d4-a716-446655440011"}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '2 days', 'attendance', 92.0, '{"total_capacity": 100, "gym_id": "550e8400-e29b-41d4-a716-446655440011"}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '3 days', 'revenue', 2560.00, '{"source": "classes", "gym_id": "550e8400-e29b-41d4-a716-446655440012"}'),
  ('550e8400-e29b-41d4-a716-446655440000', CURRENT_DATE - INTERVAL '3 days', 'attendance', 85.0, '{"total_capacity": 100, "gym_id": "550e8400-e29b-41d4-a716-446655440012"}');

-- Insert sample referrals
INSERT INTO referrals (organization_id, referrer_name, referrer_email, referred_name, referred_email, referral_type, status, reward_amount, conversion_date) VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'Sarah Johnson', 'sarah.johnson@example.com', 'Mike Wilson', 'mike.wilson@example.com', 'member', 'converted', 50.00, '2024-03-15 14:30:00+00'),
  ('550e8400-e29b-41d4-a716-446655440000', 'John Smith', 'john.smith@example.com', 'Emma Davis', 'emma.davis2@example.com', 'member', 'pending', 0.00, NULL),
  ('550e8400-e29b-41d4-a716-446655440000', 'Lisa Rodriguez', 'lisa.rodriguez@example.com', 'Tom Harris', 'tom.harris@example.com', 'member', 'converted', 50.00, '2024-03-12 16:45:00+00'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Michael Chen', 'michael.chen@example.com', 'Alex Thompson', 'alex.thompson@example.com', 'instructor', 'pending', 0.00, NULL);