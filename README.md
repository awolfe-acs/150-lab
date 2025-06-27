# Interactive Globe Project

An interactive 3D globe where visitors can place pins to show where they're from. Each user can place only one pin, and all pins are visible to all visitors in real-time.

## Features

- 🌍 Interactive 3D globe using globe.gl
- 📍 One pin per user (tracked via browser fingerprinting)
- 💾 Persistent pins stored in Supabase
- ⚡ Real-time updates when new pins are placed
- 🔒 No user accounts required
- 📱 Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. In the SQL editor, run the contents of `supabase-schema.sql` to create the necessary table and policies
3. Go to Settings → API to get your project URL and anon key

### 3. Configure Environment

Update the Supabase configuration in `src/js/interactive.js`:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL"; // Replace with your actual URL
const SUPABASE_KEY = "YOUR_SUPABASE_ANON_KEY"; // Replace with your actual key
```

### 4. Run the Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

## How It Works

### User Identification

- Uses browser fingerprinting to create unique user IDs
- Combines user agent, language, screen resolution, timezone, and canvas fingerprinting
- Stores user ID in localStorage for consistency

### Pin Placement

- Users click anywhere on the globe to place a pin
- System checks both locally (localStorage) and server-side to prevent duplicate pins
- Coordinates are rounded to 6 decimal places for consistency

### Real-time Updates

- Uses Supabase real-time subscriptions
- New pins appear immediately for all connected users
- Pin counter updates in real-time

### Data Persistence

- All pins stored in Supabase PostgreSQL database
- Row Level Security (RLS) policies prevent unauthorized modifications
- Unique constraint on user_fingerprint prevents duplicate pins

## Database Schema

```sql
CREATE TABLE public.pins (
  id UUID PRIMARY KEY,
  user_fingerprint TEXT UNIQUE NOT NULL,
  lat DOUBLE PRECISION NOT NULL,
  lng DOUBLE PRECISION NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Security Features

- Row Level Security (RLS) enabled
- Read-only access for viewing pins
- Insert-only for new pins
- No updates or deletes allowed
- Latitude/longitude validation constraints

## Browser Support

- Modern browsers with WebGL support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers supported

## Customization

### Globe Appearance

Modify globe settings in `initGlobe()` function:

- `globeImageUrl`: Earth texture
- `bumpImageUrl`: Surface topology
- `backgroundImageUrl`: Space background
- `pointColor`: Pin color
- `pointRadius`: Pin size

### Pin Behavior

Customize pin placement in `submitPin()` function:

- Add confirmation dialogs
- Implement custom validation
- Add metadata collection

## Troubleshooting

### Common Issues

1. **Pins not appearing**

   - Check Supabase configuration
   - Verify database policies are set correctly
   - Check browser console for errors

2. **Real-time updates not working**

   - Ensure real-time is enabled on the pins table
   - Check network connectivity
   - Verify Supabase subscription status

3. **Globe not loading**
   - Check WebGL support in browser
   - Verify globe.gl dependencies are installed
   - Check for JavaScript errors in console

### Browser Console Commands

Test the functionality using these console commands:

```javascript
// Check if user has pinned
globeApp.hasPinned();

// Get user ID
globeApp.getUserId();

// Manually refresh pins
globeApp.fetchPins();
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
