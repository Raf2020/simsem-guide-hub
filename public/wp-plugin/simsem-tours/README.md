# SimSem Tours — WordPress Plugin

A beautiful tours management plugin for WordPress with a custom post type, admin fields, and a stunning front-end booking template.

## Installation

1. Download the `simsem-tours` folder
2. Upload it to `/wp-content/plugins/` on your WordPress site
3. Activate the plugin from **Plugins → Installed Plugins**
4. Go to **Settings → Permalinks** and click **Save** (refreshes rewrite rules)

## Usage

### Adding a Tour

1. Go to **SimSem Tours → Add New Tour** in the WP admin
2. Fill in the tour title and excerpt (short description)
3. Fill in the meta boxes:
   - **🧭 Tour Details** — Price, duration, pickup, language, group size, transport, etc.
   - **🏔 Highlights** — One highlight per line
   - **🛡 Included / Not Included** — One item per line in each column
   - **📅 Itinerary** — JSON format (see below)
   - **📝 Extra Content** — Who is it for, what makes it different, meeting point
   - **👤 Guide Info** — Guide name, note, bio
   - **💬 FAQs** — JSON format (see below)
   - **📷 Gallery** — One image URL per line
   - **📋 SEO Meta** — Custom meta title and description
   - **🎫 Booking** — Booking URL and CTA text

### Itinerary JSON Format

```json
[
  {
    "day": 1,
    "items": [
      { "time": "9:00 AM", "title": "Meet at Visitor Center", "desc": "Your guide greets you..." },
      { "time": "9:30 AM", "title": "Jeep Tour", "desc": "Explore the desert..." }
    ]
  },
  {
    "day": 2,
    "items": [
      { "time": "7:00 AM", "title": "Sunrise", "desc": "Wake to the sunrise..." }
    ]
  }
]
```

### FAQ JSON Format

```json
[
  { "q": "Do I need experience?", "a": "No prior experience needed." },
  { "q": "What should I pack?", "a": "Light clothes, hat, sunscreen..." }
]
```

## Features

- ✅ Custom Post Type with `experiences` URL slug
- ✅ Tour Category and Destination taxonomies
- ✅ Beautiful responsive front-end template
- ✅ Sticky booking sidebar (desktop) + bottom bar (mobile)
- ✅ Interactive photo gallery with thumbnail navigation
- ✅ Timeline itinerary with day grouping
- ✅ Accordion FAQs
- ✅ JSON-LD structured data (TouristTrip schema)
- ✅ Custom SEO meta title and description
- ✅ Tours archive page with card grid
- ✅ Clean admin UI with organized meta boxes

## URLs

- Single tour: `yoursite.com/experiences/tour-slug`
- Archive: `yoursite.com/experiences/`
- By category: `yoursite.com/tour-category/getaway/`
- By destination: `yoursite.com/destination/jordan/`

## Compatibility

- WordPress 6.0+
- PHP 7.4+
- Works with any theme (uses `get_header()` / `get_footer()`)
- Compatible with Yoast SEO and RankMath
