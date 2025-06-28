/*
  # Initial GymPay Database Schema

  1. New Tables
    - `organizations`
      - `id` (uuid, primary key)
      - `name` (text)
      - `owner_id` (uuid, references auth.users)
      - `subscription_plan` (text)
      - `stripe_customer_id` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `gyms`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations)
      - `name` (text)
      - `location` (text)
      - `timezone` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `instructors`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations)
      - `gym_id` (uuid, references gyms)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `specialties` (text[])
      - `hourly_rate` (decimal)
      - `status` (text)
      - `hire_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `payroll_periods`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations)
      - `period_start` (date)
      - `period_end` (date)
      - `status` (text)
      - `total_amount` (decimal)
      - `instructor_count` (integer)
      - `processed_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `payroll_entries`
      - `id` (uuid, primary key)
      - `payroll_period_id` (uuid, references payroll_periods)
      - `instructor_id` (uuid, references instructors)
      - `hours_worked` (decimal)
      - `hourly_rate` (decimal)
      - `total_amount` (decimal)
      - `bonus_amount` (decimal)
      - `deductions` (decimal)
      - `net_amount` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `analytics_data`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations)
      - `date` (date)
      - `metric_type` (text)
      - `metric_value` (decimal)
      - `metadata` (jsonb)
      - `created_at` (timestamp)

    - `referrals`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references organizations)
      - `referrer_name` (text)
      - `referrer_email` (text)
      - `referred_name` (text)
      - `referred_email` (text)
      - `referral_type` (text)
      - `status` (text)
      - `reward_amount` (decimal)
      - `conversion_date` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for organization-based access control
*/

-- Create organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_plan text DEFAULT 'trial',
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gyms table
CREATE TABLE IF NOT EXISTS gyms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  name text NOT NULL,
  location text,
  timezone text DEFAULT 'UTC',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create instructors table
CREATE TABLE IF NOT EXISTS instructors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  gym_id uuid REFERENCES gyms(id) ON DELETE SET NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  specialties text[] DEFAULT '{}',
  hourly_rate decimal(10,2) DEFAULT 0.00,
  status text DEFAULT 'active',
  hire_date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payroll_periods table
CREATE TABLE IF NOT EXISTS payroll_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  period_start date NOT NULL,
  period_end date NOT NULL,
  status text DEFAULT 'draft',
  total_amount decimal(12,2) DEFAULT 0.00,
  instructor_count integer DEFAULT 0,
  processed_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payroll_entries table
CREATE TABLE IF NOT EXISTS payroll_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  payroll_period_id uuid REFERENCES payroll_periods(id) ON DELETE CASCADE,
  instructor_id uuid REFERENCES instructors(id) ON DELETE CASCADE,
  hours_worked decimal(8,2) DEFAULT 0.00,
  hourly_rate decimal(10,2) DEFAULT 0.00,
  total_amount decimal(10,2) DEFAULT 0.00,
  bonus_amount decimal(10,2) DEFAULT 0.00,
  deductions decimal(10,2) DEFAULT 0.00,
  net_amount decimal(10,2) DEFAULT 0.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analytics_data table
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  date date NOT NULL,
  metric_type text NOT NULL,
  metric_value decimal(15,2) NOT NULL,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES organizations(id) ON DELETE CASCADE,
  referrer_name text NOT NULL,
  referrer_email text NOT NULL,
  referred_name text,
  referred_email text,
  referral_type text NOT NULL,
  status text DEFAULT 'pending',
  reward_amount decimal(10,2) DEFAULT 0.00,
  conversion_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE gyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create policies for organizations
CREATE POLICY "Users can read own organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can update own organization"
  ON organizations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can insert own organization"
  ON organizations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Create policies for gyms
CREATE POLICY "Users can read own gyms"
  ON gyms
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own gyms"
  ON gyms
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- Create policies for instructors
CREATE POLICY "Users can read own instructors"
  ON instructors
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own instructors"
  ON instructors
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- Create policies for payroll_periods
CREATE POLICY "Users can read own payroll periods"
  ON payroll_periods
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own payroll periods"
  ON payroll_periods
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- Create policies for payroll_entries
CREATE POLICY "Users can read own payroll entries"
  ON payroll_entries
  FOR SELECT
  TO authenticated
  USING (
    payroll_period_id IN (
      SELECT id FROM payroll_periods 
      WHERE organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can manage own payroll entries"
  ON payroll_entries
  FOR ALL
  TO authenticated
  USING (
    payroll_period_id IN (
      SELECT id FROM payroll_periods 
      WHERE organization_id IN (
        SELECT id FROM organizations WHERE owner_id = auth.uid()
      )
    )
  );

-- Create policies for analytics_data
CREATE POLICY "Users can read own analytics"
  ON analytics_data
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own analytics"
  ON analytics_data
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- Create policies for referrals
CREATE POLICY "Users can read own referrals"
  ON referrals
  FOR SELECT
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage own referrals"
  ON referrals
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT id FROM organizations WHERE owner_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gyms_organization_id ON gyms(organization_id);
CREATE INDEX IF NOT EXISTS idx_instructors_organization_id ON instructors(organization_id);
CREATE INDEX IF NOT EXISTS idx_instructors_gym_id ON instructors(gym_id);
CREATE INDEX IF NOT EXISTS idx_payroll_periods_organization_id ON payroll_periods(organization_id);
CREATE INDEX IF NOT EXISTS idx_payroll_entries_payroll_period_id ON payroll_entries(payroll_period_id);
CREATE INDEX IF NOT EXISTS idx_payroll_entries_instructor_id ON payroll_entries(instructor_id);
CREATE INDEX IF NOT EXISTS idx_analytics_data_organization_id ON analytics_data(organization_id);
CREATE INDEX IF NOT EXISTS idx_analytics_data_date ON analytics_data(date);
CREATE INDEX IF NOT EXISTS idx_referrals_organization_id ON referrals(organization_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gyms_updated_at BEFORE UPDATE ON gyms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_instructors_updated_at BEFORE UPDATE ON instructors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_periods_updated_at BEFORE UPDATE ON payroll_periods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payroll_entries_updated_at BEFORE UPDATE ON payroll_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_referrals_updated_at BEFORE UPDATE ON referrals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();