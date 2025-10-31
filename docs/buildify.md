
# CB Ai – AI Smart Studio

## Requirements

### Core Features
1. **PhonePe Payment Integration**
   - 4 subscription plans: ₹666 (Basic), ₹999 (Pro), ₹1200 (Video), ₹1500 (Full)
   - PhonePe API integration with merchant ID & secret key
   - Auto-update user roles: basic_user, pro_user, video_user, full_user
   - Payment logs visible in admin dashboard
   - UPI + card payment options

2. **Admin Dashboard**
   - Admin-only access (role-based)
   - Total users count
   - Active subscriptions by plan
   - Reports table (from user reports)
   - User management (suspend/delete)
   - Payment logs display
   - Daily active users chart

3. **AI Video Studio**
   - Video upload and editing
   - AI filters, effects, auto captions
   - Video generation capabilities
   - Watermark "CB Ai Studio" for free users
   - Access restricted to ₹1200+ plans
   - Download and share functionality

4. **Report System**
   - Report buttons on Chat, Photo, Video pages
   - Report form: username, issue type, message, timestamp
   - Reports sent to admin dashboard

5. **Privacy & Terms Pages**
   - Privacy Policy page
   - Terms of Service page
   - Key safety messages about encryption, content policies
   - Links on Login & Payment pages

6. **Existing Features to Maintain**
   - Email/OTP login
   - Encrypted user data
   - Safe content policies (no NSFW)

## Design

### User Roles & Permissions
- **Free User**: AI Chat + Basic Photo Edit (3 credits/day)
- **Basic User (₹666)**: AI Chat + Basic Photo Edit (unlimited)
- **Pro User (₹999)**: AI Chat + Pro Photo Tools
- **Video User (₹1200)**: All above + Video Studio
- **Full User (₹1500)**: All AI Tools + Premium Features
- **Admin**: Full dashboard access + user management

### Database Schema (Supabase)
```sql
-- Users table (extend existing)
users (
  id, email, name, role, plan, photo_credits, created_at, suspended
)

-- Subscriptions table
subscriptions (
  id, user_id, plan_type, amount, status, phonepe_transaction_id, created_at
)

-- Reports table
reports (
  id, user_id, username, page, issue_type, message, status, created_at
)

-- Payment logs table
payment_logs (
  id, user_id, amount, plan, phonepe_response, status, created_at
)