-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wallet_address TEXT UNIQUE NOT NULL,
  username TEXT,
  email TEXT,
  referral_code TEXT UNIQUE,
  referred_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Trading accounts
CREATE TABLE trading_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  balance DECIMAL(20,8) DEFAULT 0,
  margin_used DECIMAL(20,8) DEFAULT 0,
  unrealized_pnl DECIMAL(20,8) DEFAULT 0,
  realized_pnl DECIMAL(20,8) DEFAULT 0,
  total_volume DECIMAL(20,8) DEFAULT 0,
  win_rate DECIMAL(5,2) DEFAULT 0,
  total_trades INTEGER DEFAULT 0,
  winning_trades INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Positions
CREATE TABLE positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('long', 'short')),
  size DECIMAL(20,8) NOT NULL,
  entry_price DECIMAL(20,8) NOT NULL,
  current_price DECIMAL(20,8),
  leverage INTEGER NOT NULL,
  liquidation_price DECIMAL(20,8),
  unrealized_pnl DECIMAL(20,8) DEFAULT 0,
  realized_pnl DECIMAL(20,8) DEFAULT 0,
  take_profit DECIMAL(20,8),
  stop_loss DECIMAL(20,8),
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  symbol TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('buy', 'sell')),
  type TEXT NOT NULL CHECK (type IN ('market', 'limit', 'stop')),
  price DECIMAL(20,8),
  quantity DECIMAL(20,8) NOT NULL,
  filled_quantity DECIMAL(20,8) DEFAULT 0,
  status TEXT NOT NULL CHECK (status IN ('pending', 'filled', 'cancelled', 'rejected')),
  leverage INTEGER,
  take_profit DECIMAL(20,8),
  stop_loss DECIMAL(20,8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Points system
CREATE TABLE points (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  total_points INTEGER DEFAULT 0,
  trading_points INTEGER DEFAULT 0,
  referral_points INTEGER DEFAULT 0,
  daily_checkin_points INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  last_checkin DATE,
  tier TEXT DEFAULT 'bronze',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Point transactions
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('trading', 'referral', 'checkin', 'campaign', 'quest')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES users(id) ON DELETE CASCADE,
  trading_volume DECIMAL(20,8) DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_positions_user_id ON positions(user_id);
CREATE INDEX idx_positions_symbol ON positions(symbol);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_point_transactions_user_id ON point_transactions(user_id);
CREATE INDEX idx_referrals_referrer_id ON referrals(referrer_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_trading_accounts_updated_at BEFORE UPDATE ON trading_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_positions_updated_at BEFORE UPDATE ON positions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_points_updated_at BEFORE UPDATE ON points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
