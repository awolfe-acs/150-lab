# Interactive Globe Setup Guide

This guide will help you set up the interactive globe feature that allows visitors to place pins showing where they're from.

## Prerequisites

1. **Supabase Account**: You need a Supabase project set up
2. **Environment Variables**: Supabase URL and API key configured

## Database Setup

### Step 1: Create the Database Table

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-setup.sql`
4. Run the SQL commands

This will create:

- A `pins` table to store user pin locations
- Row Level Security (RLS) policies
- Proper indexes for performance

### Step 2: Verify Environment Variables

Make sure your environment variables are set correctly:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Or update the hardcoded values in `interactive.js` if needed.

## Features

### User Experience

- **One Pin Per User**: Each visitor can only place one pin (tracked by browser fingerprint)
- **Real-time Updates**: All visitors see pins placed by others in real-time
- **Persistent Storage**: Pins persist across browser sessions
- **Clear Pin Option**: Users can remove their pin and place a new one

### Technical Features

- **Browser Fingerprinting**: Unique user identification without accounts
- **Globe.gl Integration**: 3D interactive globe with Earth textures
- **Supabase Backend**: Real-time database with Row Level Security
- **Responsive Design**: Works on desktop and mobile devices

## Usage

1. Visit `/globe.html`
2. Click anywhere on the globe to place a pin
3. Your pin will appear and be visible to all other visitors
4. Use the "Clear Pin" button (top-right) to remove your pin

## Troubleshooting

### "Database Setup Required" Message

- The `pins` table doesn't exist in your Supabase database
- Run the SQL commands from `supabase-setup.sql` in your Supabase dashboard

### Globe Not Loading

- Check browser console for errors
- Verify that `globe.gl` dependency is installed: `npm install globe.gl`
- Ensure the container element `#interactive-globe` exists

### Pins Not Saving

- Check Supabase credentials in the console
- Verify RLS policies are set up correctly
- Check network tab for 404 errors to Supabase endpoints

### Multiple Initialization Errors

- This has been fixed in the latest version
- Clear browser cache and reload if you see duplicate initialization

## File Structure

```
150-lab/
├── src/js/interactive.js     # Main globe functionality
├── globe.html               # Globe page template
├── supabase-setup.sql       # Database setup script
└── GLOBE_SETUP.md          # This setup guide
```

## Security Notes

- The app uses browser fingerprinting for user identification
- No personal data is collected or stored
- Only latitude/longitude coordinates are saved
- All data is public and visible to all users
- RLS policies ensure data integrity

## Performance

- Globe textures are loaded from CDN
- Real-time updates use Supabase's efficient WebSocket connections
- Browser fingerprinting is computed once and cached
- Duplicate initializations are prevented
