# TeaHost - Database Schema Documentation

## Overview

This document provides detailed database schema definitions for the TeaHost platform using PostgreSQL.

## Database Configuration

```sql
-- Create database
CREATE DATABASE teahost_production;
CREATE DATABASE teahost_development;
CREATE DATABASE teahost_test;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy text search
CREATE EXTENSION IF NOT EXISTS "postgis"; -- for geographic data
```

## Core Tables

### 1. users

Central table for all user accounts (tourists and hosts).

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE,
    date_of_birth DATE,
    nationality VARCHAR(100),
    bio TEXT,
    profile_photo_url VARCHAR(500),
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('tourist', 'host', 'both')) DEFAULT 'tourist',
    verification_level VARCHAR(20) NOT NULL CHECK (verification_level IN ('basic', 'standard', 'premium')) DEFAULT 'basic',
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_id_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    is_suspended BOOLEAN DEFAULT FALSE,
    suspension_reason TEXT,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_type ON users(user_type);
CREATE INDEX idx_users_active ON users(is_active, is_suspended);
CREATE INDEX idx_users_created ON users(created_at);
```

### 2. host_profiles

Extended profile information for users who host.

```sql
CREATE TABLE host_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    neighborhood VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location GEOGRAPHY(POINT, 4326), -- PostGIS point for spatial queries
    home_description TEXT NOT NULL,
    home_type VARCHAR(50) CHECK (home_type IN ('apartment', 'house', 'studio', 'other')),
    amenities JSONB DEFAULT '[]'::jsonb,
    house_rules TEXT,
    topics TEXT[] DEFAULT ARRAY[]::TEXT[],
    languages_spoken TEXT[] DEFAULT ARRAY[]::TEXT[],
    max_guests INTEGER DEFAULT 1 CHECK (max_guests >= 1 AND max_guests <= 10),
    instant_booking_enabled BOOLEAN DEFAULT FALSE,
    price_per_session DECIMAL(10, 2) NOT NULL CHECK (price_per_session >= 0),
    currency VARCHAR(3) DEFAULT 'USD',
    average_rating DECIMAL(3, 2) DEFAULT 0.0 CHECK (average_rating >= 0 AND average_rating <= 5),
    total_reviews INTEGER DEFAULT 0,
    total_bookings INTEGER DEFAULT 0,
    response_rate INTEGER DEFAULT 0 CHECK (response_rate >= 0 AND response_rate <= 100),
    response_time_hours INTEGER,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_host_profiles_user ON host_profiles(user_id);
CREATE INDEX idx_host_profiles_city ON host_profiles(city);
CREATE INDEX idx_host_profiles_neighborhood ON host_profiles(neighborhood);
CREATE INDEX idx_host_profiles_location ON host_profiles USING GIST(location);
CREATE INDEX idx_host_profiles_price ON host_profiles(price_per_session);
CREATE INDEX idx_host_profiles_rating ON host_profiles(average_rating);
CREATE INDEX idx_host_profiles_published ON host_profiles(is_published);
CREATE INDEX idx_host_profiles_topics ON host_profiles USING GIN(topics);
CREATE INDEX idx_host_profiles_languages ON host_profiles USING GIN(languages_spoken);
```

### 3. host_photos

Photos of host's space and environment.

```sql
CREATE TABLE host_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_profile_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    photo_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    caption VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    moderation_status VARCHAR(20) DEFAULT 'pending' CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    moderation_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_host_photos_profile ON host_photos(host_profile_id);
CREATE INDEX idx_host_photos_primary ON host_photos(host_profile_id, is_primary);
CREATE INDEX idx_host_photos_order ON host_photos(host_profile_id, display_order);
CREATE INDEX idx_host_photos_moderation ON host_photos(moderation_status);
```

### 4. availability_slots

Host availability calendar.

```sql
CREATE TABLE availability_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_profile_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    slot_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    recurrence_rule VARCHAR(100), -- RRULE format for recurring availability
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_time_range CHECK (end_time > start_time)
);

-- Indexes
CREATE INDEX idx_availability_host ON availability_slots(host_profile_id);
CREATE INDEX idx_availability_date ON availability_slots(slot_date);
CREATE INDEX idx_availability_host_date ON availability_slots(host_profile_id, slot_date);
CREATE INDEX idx_availability_available ON availability_slots(host_profile_id, is_available);
CREATE UNIQUE INDEX idx_availability_unique ON availability_slots(host_profile_id, slot_date, start_time) 
    WHERE booking_id IS NULL;
```

### 5. bookings

Core booking transactions between tourists and hosts.

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    tourist_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    host_profile_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE RESTRICT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    number_of_guests INTEGER DEFAULT 1 CHECK (number_of_guests >= 1),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'declined', 'expired')),
    tourist_message TEXT,
    host_response TEXT,
    price_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    platform_fee DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(20) DEFAULT 'pending' 
        CHECK (payment_status IN ('pending', 'authorized', 'captured', 'refunded', 'failed')),
    payment_intent_id VARCHAR(255),
    refund_amount DECIMAL(10, 2),
    refund_reason TEXT,
    cancellation_reason TEXT,
    cancelled_by UUID REFERENCES users(id) ON DELETE SET NULL,
    cancellation_policy VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    completed_at TIMESTAMP,
    cancelled_at TIMESTAMP,
    expired_at TIMESTAMP,
    CONSTRAINT valid_booking_time CHECK (end_time > start_time),
    CONSTRAINT valid_amounts CHECK (total_amount = price_amount + platform_fee)
);

-- Indexes
CREATE INDEX idx_bookings_host ON bookings(host_id);
CREATE INDEX idx_bookings_tourist ON bookings(tourist_id);
CREATE INDEX idx_bookings_profile ON bookings(host_profile_id);
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment ON bookings(payment_status);
CREATE INDEX idx_bookings_created ON bookings(created_at);
CREATE INDEX idx_bookings_upcoming ON bookings(booking_date, start_time) 
    WHERE status IN ('confirmed', 'pending');
```

### 6. reviews

Reviews and ratings after completed visits.

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL UNIQUE REFERENCES bookings(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewee_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reviewer_type VARCHAR(10) NOT NULL CHECK (reviewer_type IN ('host', 'tourist')),
    
    -- Overall rating
    overall_rating INTEGER NOT NULL CHECK (overall_rating >= 1 AND overall_rating <= 5),
    
    -- Category ratings (1-5)
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    hospitality_rating INTEGER CHECK (hospitality_rating >= 1 AND hospitality_rating <= 5),
    authenticity_rating INTEGER CHECK (authenticity_rating >= 1 AND authenticity_rating <= 5),
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    
    review_text TEXT,
    review_photos TEXT[] DEFAULT ARRAY[]::TEXT[],
    
    -- Response from reviewee
    response_text TEXT,
    response_created_at TIMESTAMP,
    
    is_public BOOLEAN DEFAULT TRUE,
    is_flagged BOOLEAN DEFAULT FALSE,
    flag_reason TEXT,
    moderation_status VARCHAR(20) DEFAULT 'approved' 
        CHECK (moderation_status IN ('pending', 'approved', 'rejected')),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_reviewer CHECK (reviewer_id != reviewee_id)
);

-- Indexes
CREATE INDEX idx_reviews_booking ON reviews(booking_id);
CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_rating ON reviews(overall_rating);
CREATE INDEX idx_reviews_public ON reviews(reviewee_id, is_public, moderation_status);
CREATE INDEX idx_reviews_flagged ON reviews(is_flagged) WHERE is_flagged = TRUE;
```

### 7. messages

In-app messaging between tourists and hosts.

```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message_text TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::jsonb,
    is_read BOOLEAN DEFAULT FALSE,
    is_system_message BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    deleted_by_sender BOOLEAN DEFAULT FALSE,
    deleted_by_receiver BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT valid_message_participants CHECK (sender_id != receiver_id)
);

-- Indexes
CREATE INDEX idx_messages_booking ON messages(booking_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_unread ON messages(receiver_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_messages_conversation ON messages(booking_id, created_at);
```

### 8. user_languages

Languages spoken by users with proficiency levels.

```sql
CREATE TABLE user_languages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL, -- ISO 639-1 codes (e.g., 'en', 'fr', 'es')
    language_name VARCHAR(50) NOT NULL,
    proficiency VARCHAR(20) NOT NULL 
        CHECK (proficiency IN ('basic', 'conversational', 'fluent', 'native')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, language_code)
);

-- Indexes
CREATE INDEX idx_user_languages_user ON user_languages(user_id);
CREATE INDEX idx_user_languages_code ON user_languages(language_code);
```

### 9. favorites

Users' saved/favorited host profiles.

```sql
CREATE TABLE favorites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    host_profile_id UUID NOT NULL REFERENCES host_profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, host_profile_id)
);

-- Indexes
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_host ON favorites(host_profile_id);
CREATE INDEX idx_favorites_created ON favorites(user_id, created_at);
```

### 10. user_verifications

Verification records for different verification types.

```sql
CREATE TABLE user_verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    verification_type VARCHAR(20) NOT NULL 
        CHECK (verification_type IN ('email', 'phone', 'id', 'background', 'video', 'social')),
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
    document_url VARCHAR(500),
    document_type VARCHAR(50),
    verification_data JSONB, -- Store additional verification details
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    rejection_reason TEXT,
    verified_at TIMESTAMP,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_verifications_user ON user_verifications(user_id);
CREATE INDEX idx_verifications_type ON user_verifications(verification_type);
CREATE INDEX idx_verifications_status ON user_verifications(status);
CREATE INDEX idx_verifications_pending ON user_verifications(status, created_at) 
    WHERE status = 'pending';
```

### 11. reports

User reports for safety and moderation.

```sql
CREATE TABLE reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    reported_content_type VARCHAR(20) NOT NULL 
        CHECK (reported_content_type IN ('user', 'review', 'message', 'booking', 'photo')),
    reported_content_id UUID NOT NULL,
    report_category VARCHAR(50) NOT NULL 
        CHECK (report_category IN (
            'inappropriate_content', 'harassment', 'scam', 'fake_profile', 
            'safety_concern', 'spam', 'other'
        )),
    reason TEXT NOT NULL,
    description TEXT,
    evidence_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'investigating', 'resolved', 'dismissed')),
    priority VARCHAR(10) DEFAULT 'normal' 
        CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    resolved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    resolution_notes TEXT,
    resolution_action VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_content ON reports(reported_content_type, reported_content_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_priority ON reports(priority, status);
CREATE INDEX idx_reports_pending ON reports(status, created_at) WHERE status = 'pending';
```

### 12. payments

Payment transaction records.

```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE RESTRICT,
    payer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    payee_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    payment_provider VARCHAR(50) DEFAULT 'stripe',
    payment_intent_id VARCHAR(255) UNIQUE,
    charge_id VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    platform_fee DECIMAL(10, 2) NOT NULL,
    host_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded')),
    payment_method VARCHAR(50),
    failure_reason TEXT,
    refund_id VARCHAR(255),
    refund_amount DECIMAL(10, 2),
    refund_reason TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    succeeded_at TIMESTAMP,
    failed_at TIMESTAMP,
    refunded_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_payer ON payments(payer_id);
CREATE INDEX idx_payments_payee ON payments(payee_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_intent ON payments(payment_intent_id);
CREATE INDEX idx_payments_created ON payments(created_at);
```

### 13. payouts

Host payout records.

```sql
CREATE TABLE payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    payout_provider VARCHAR(50) DEFAULT 'stripe',
    payout_id VARCHAR(255) UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) NOT NULL DEFAULT 'pending' 
        CHECK (status IN ('pending', 'processing', 'paid', 'failed', 'cancelled')),
    payout_method VARCHAR(50),
    bank_account_last4 VARCHAR(4),
    failure_reason TEXT,
    booking_ids UUID[] DEFAULT ARRAY[]::UUID[],
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    paid_at TIMESTAMP,
    failed_at TIMESTAMP
);

-- Indexes
CREATE INDEX idx_payouts_host ON payouts(host_id);
CREATE INDEX idx_payouts_status ON payouts(status);
CREATE INDEX idx_payouts_payout_id ON payouts(payout_id);
CREATE INDEX idx_payouts_period ON payouts(period_start, period_end);
CREATE INDEX idx_payouts_created ON payouts(created_at);
```

### 14. notifications

In-app notification system.

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notification_type VARCHAR(50) NOT NULL 
        CHECK (notification_type IN (
            'booking_request', 'booking_confirmed', 'booking_cancelled',
            'message_received', 'review_received', 'review_response',
            'payment_received', 'payout_processed', 'verification_approved',
            'verification_rejected', 'reminder', 'system'
        )),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    action_url VARCHAR(500),
    is_read BOOLEAN DEFAULT FALSE,
    is_sent_email BOOLEAN DEFAULT FALSE,
    is_sent_push BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX idx_notifications_type ON notifications(notification_type);
CREATE INDEX idx_notifications_created ON notifications(created_at);
```

### 15. search_history

Track user search history for analytics and recommendations.

```sql
CREATE TABLE search_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255),
    search_query TEXT,
    filters JSONB,
    results_count INTEGER,
    selected_host_id UUID REFERENCES host_profiles(id) ON DELETE SET NULL,
    resulted_in_booking BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_search_history_user ON search_history(user_id);
CREATE INDEX idx_search_history_session ON search_history(session_id);
CREATE INDEX idx_search_history_created ON search_history(created_at);
```

### 16. platform_settings

System-wide configuration and settings.

```sql
CREATE TABLE platform_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    is_public BOOLEAN DEFAULT FALSE,
    updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example settings
INSERT INTO platform_settings (setting_key, setting_value, description, is_public) VALUES
('platform_fee_percentage', '15', 'Platform service fee percentage', FALSE),
('max_booking_advance_days', '90', 'Maximum days in advance for booking', TRUE),
('cancellation_policy_hours', '48', 'Hours before booking for full refund', TRUE),
('min_session_price', '10', 'Minimum price per session in USD', TRUE),
('max_session_price', '200', 'Maximum price per session in USD', TRUE);
```

## Views

### Active Hosts View

```sql
CREATE VIEW active_hosts AS
SELECT 
    u.id as user_id,
    u.first_name,
    u.last_name,
    u.profile_photo_url,
    u.verification_level,
    hp.id as host_profile_id,
    hp.city,
    hp.neighborhood,
    hp.price_per_session,
    hp.average_rating,
    hp.total_reviews,
    hp.total_bookings,
    hp.instant_booking_enabled,
    hp.languages_spoken,
    hp.topics
FROM users u
INNER JOIN host_profiles hp ON u.id = hp.user_id
WHERE u.is_active = TRUE 
  AND u.is_suspended = FALSE 
  AND hp.is_published = TRUE;
```

### Upcoming Bookings View

```sql
CREATE VIEW upcoming_bookings AS
SELECT 
    b.id,
    b.booking_date,
    b.start_time,
    b.end_time,
    b.status,
    t.id as tourist_id,
    t.first_name as tourist_first_name,
    t.last_name as tourist_last_name,
    h.id as host_id,
    h.first_name as host_first_name,
    h.last_name as host_last_name,
    hp.city,
    hp.neighborhood
FROM bookings b
INNER JOIN users t ON b.tourist_id = t.id
INNER JOIN users h ON b.host_id = h.id
INNER JOIN host_profiles hp ON b.host_profile_id = hp.id
WHERE b.booking_date >= CURRENT_DATE
  AND b.status IN ('confirmed', 'pending')
ORDER BY b.booking_date, b.start_time;
```

## Triggers

### Update Timestamp Trigger

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_host_profiles_updated_at BEFORE UPDATE ON host_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add for other tables...
```

### Update Host Statistics Trigger

```sql
CREATE OR REPLACE FUNCTION update_host_statistics()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT' OR TG_OP = 'UPDATE') AND NEW.status = 'completed' THEN
        UPDATE host_profiles
        SET total_bookings = total_bookings + 1
        WHERE id = NEW.host_profile_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_host_bookings
AFTER INSERT OR UPDATE ON bookings
FOR EACH ROW
WHEN (NEW.status = 'completed')
EXECUTE FUNCTION update_host_statistics();
```

### Update Host Rating Trigger

```sql
CREATE OR REPLACE FUNCTION update_host_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE host_profiles hp
    SET 
        average_rating = (
            SELECT AVG(overall_rating)::DECIMAL(3,2)
            FROM reviews r
            INNER JOIN bookings b ON r.booking_id = b.id
            WHERE b.host_profile_id = hp.id
              AND r.reviewee_id = hp.user_id
              AND r.is_public = TRUE
        ),
        total_reviews = (
            SELECT COUNT(*)
            FROM reviews r
            INNER JOIN bookings b ON r.booking_id = b.id
            WHERE b.host_profile_id = hp.id
              AND r.reviewee_id = hp.user_id
              AND r.is_public = TRUE
        )
    WHERE hp.user_id = (
        SELECT host_id FROM bookings WHERE id = NEW.booking_id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_host_rating
AFTER INSERT OR UPDATE ON reviews
FOR EACH ROW
WHEN (NEW.is_public = TRUE)
EXECUTE FUNCTION update_host_rating();
```

## Stored Procedures

### Search Hosts Procedure

```sql
CREATE OR REPLACE FUNCTION search_hosts(
    p_city VARCHAR DEFAULT NULL,
    p_neighborhood VARCHAR DEFAULT NULL,
    p_min_price DECIMAL DEFAULT NULL,
    p_max_price DECIMAL DEFAULT NULL,
    p_min_rating DECIMAL DEFAULT NULL,
    p_languages TEXT[] DEFAULT NULL,
    p_topics TEXT[] DEFAULT NULL,
    p_instant_booking BOOLEAN DEFAULT NULL,
    p_limit INTEGER DEFAULT 20,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    host_profile_id UUID,
    user_id UUID,
    first_name VARCHAR,
    last_name VARCHAR,
    profile_photo_url VARCHAR,
    city VARCHAR,
    neighborhood VARCHAR,
    price_per_session DECIMAL,
    average_rating DECIMAL,
    total_reviews INTEGER,
    instant_booking_enabled BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        hp.id,
        u.id,
        u.first_name,
        u.last_name,
        u.profile_photo_url,
        hp.city,
        hp.neighborhood,
        hp.price_per_session,
        hp.average_rating,
        hp.total_reviews,
        hp.instant_booking_enabled
    FROM host_profiles hp
    INNER JOIN users u ON hp.user_id = u.id
    WHERE u.is_active = TRUE
      AND u.is_suspended = FALSE
      AND hp.is_published = TRUE
      AND (p_city IS NULL OR hp.city = p_city)
      AND (p_neighborhood IS NULL OR hp.neighborhood = p_neighborhood)
      AND (p_min_price IS NULL OR hp.price_per_session >= p_min_price)
      AND (p_max_price IS NULL OR hp.price_per_session <= p_max_price)
      AND (p_min_rating IS NULL OR hp.average_rating >= p_min_rating)
      AND (p_languages IS NULL OR hp.languages_spoken && p_languages)
      AND (p_topics IS NULL OR hp.topics && p_topics)
      AND (p_instant_booking IS NULL OR hp.instant_booking_enabled = p_instant_booking)
    ORDER BY hp.average_rating DESC, hp.total_reviews DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$ LANGUAGE plpgsql;
```

## Data Seeding

### Sample Data

```sql
-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, phone, user_type, is_email_verified, is_phone_verified) VALUES
('host1@example.com', '$2b$10$...', 'Maria', 'Garcia', '+34123456789', 'host', TRUE, TRUE),
('host2@example.com', '$2b$10$...', 'Jean', 'Dupont', '+33123456789', 'host', TRUE, TRUE),
('tourist1@example.com', '$2b$10$...', 'John', 'Smith', '+1234567890', 'tourist', TRUE, TRUE);

-- Insert sample host profiles
INSERT INTO host_profiles (
    user_id, address_line1, city, neighborhood, country, 
    latitude, longitude, home_description, price_per_session, 
    languages_spoken, topics, is_published
) VALUES (
    (SELECT id FROM users WHERE email = 'host1@example.com'),
    'Calle Mayor 123',
    'Barcelona',
    'Gothic Quarter',
    'Spain',
    41.3851,
    2.1734,
    'Welcome to my cozy apartment in the heart of Barcelona! I love sharing stories about local culture and hidden gems.',
    25.00,
    ARRAY['Spanish', 'English', 'Catalan'],
    ARRAY['Culture', 'Food', 'History', 'Art'],
    TRUE
);
```

## Maintenance

### Cleanup Old Data

```sql
-- Delete old expired bookings
DELETE FROM bookings 
WHERE status = 'expired' 
  AND created_at < NOW() - INTERVAL '90 days';

-- Archive old messages
CREATE TABLE messages_archive AS 
SELECT * FROM messages 
WHERE created_at < NOW() - INTERVAL '1 year';

DELETE FROM messages 
WHERE created_at < NOW() - INTERVAL '1 year';

-- Clean up unverified users after 30 days
UPDATE users 
SET is_active = FALSE 
WHERE is_email_verified = FALSE 
  AND created_at < NOW() - INTERVAL '30 days';
```

### Database Backup

```bash
# Backup
pg_dump -U postgres -d teahost_production -F c -f backup_$(date +%Y%m%d).dump

# Restore
pg_restore -U postgres -d teahost_production -c backup_20240101.dump
```

## Performance Optimization

### Query Optimization Tips

1. **Use EXPLAIN ANALYZE** to understand query performance
2. **Add appropriate indexes** on frequently queried columns
3. **Use connection pooling** (pg-pool)
4. **Implement query result caching** (Redis)
5. **Partition large tables** (e.g., messages, notifications)
6. **Regular VACUUM and ANALYZE** operations

```sql
-- Analyze query performance
EXPLAIN ANALYZE
SELECT * FROM host_profiles
WHERE city = 'Barcelona'
  AND price_per_session <= 50
  AND average_rating >= 4.5;

-- Vacuum and analyze
VACUUM ANALYZE host_profiles;
VACUUM ANALYZE bookings;
```

This schema provides a solid foundation for the TeaHost platform with proper normalization, indexing, and data integrity constraints.
