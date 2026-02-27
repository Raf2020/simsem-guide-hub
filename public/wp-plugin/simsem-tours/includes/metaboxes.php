<?php
if (!defined('ABSPATH')) exit;

/**
 * Register all meta boxes for the Tour CPT
 */
add_action('add_meta_boxes', function () {
    add_meta_box('simsem_tour_details', '🧭 Tour Details', 'simsem_tour_details_cb', 'simsem_tour', 'normal', 'high');
    add_meta_box('simsem_tour_highlights', '🏔 Tour Highlights', 'simsem_tour_highlights_cb', 'simsem_tour', 'normal', 'high');
    add_meta_box('simsem_tour_included', '🛡 Included / Not Included', 'simsem_tour_included_cb', 'simsem_tour', 'normal', 'high');
    add_meta_box('simsem_tour_itinerary', '📅 Detailed Itinerary', 'simsem_tour_itinerary_cb', 'simsem_tour', 'normal', 'high');
    add_meta_box('simsem_tour_content', '📝 Extra Content Sections', 'simsem_tour_content_cb', 'simsem_tour', 'normal', 'high');
    add_meta_box('simsem_tour_guide', '👤 Guide Info', 'simsem_tour_guide_cb', 'simsem_tour', 'normal', 'default');
    add_meta_box('simsem_tour_faqs', '💬 Frequently Asked Questions', 'simsem_tour_faqs_cb', 'simsem_tour', 'normal', 'default');
    add_meta_box('simsem_tour_gallery', '📷 Gallery Images', 'simsem_tour_gallery_cb', 'simsem_tour', 'normal', 'default');
    add_meta_box('simsem_tour_seo', '📋 SEO Meta', 'simsem_tour_seo_cb', 'simsem_tour', 'normal', 'default');
    add_meta_box('simsem_tour_booking', '🎫 Booking', 'simsem_tour_booking_cb', 'simsem_tour', 'side', 'high');
    add_meta_box('simsem_seo_validation', '⚠️ SEO Validation', 'simsem_seo_validation_cb', 'simsem_tour', 'side', 'high');
});

/**
 * Helper: get meta value
 */
function simsem_get($post_id, $key, $default = '') {
    $val = get_post_meta($post_id, $key, true);
    return $val !== '' ? $val : $default;
}

/**
 * SEO Validation meta box — shows warnings in admin
 */
function simsem_seo_validation_cb($post) {
    $title   = $post->post_title;
    $price   = simsem_get($post->ID, '_simsem_price');
    $dur     = simsem_get($post->ID, '_simsem_duration');
    $pickup  = simsem_get($post->ID, '_simsem_pickup');
    $booking = simsem_get($post->ID, '_simsem_booking_url');
    $excerpt = $post->post_excerpt;

    $warnings = [];
    if (empty($title) || mb_strlen($title) < 5) {
        $warnings[] = '❌ H1 title too short — must contain primary keyword';
    }

    // Check price, duration, pickup in first 120 words
    $first120 = implode(' ', array_slice(str_word_count($excerpt . ' ' . $price . ' ' . $dur . ' ' . $pickup, 1), 0, 120));
    $first120lower = strtolower($first120);

    if (empty($price)) {
        $warnings[] = '❌ Price is missing — must appear above the fold';
    }
    if (empty($dur)) {
        $warnings[] = '❌ Duration is missing — must appear above the fold';
    }
    if (empty($pickup)) {
        $warnings[] = '❌ Pickup location is missing — must appear above the fold';
    }
    if (empty($booking)) {
        $warnings[] = '❌ No booking URL — CTA cannot render above the fold';
    }

    if (empty($warnings)) {
        echo '<p style="color:#00a32a;font-weight:600;">✅ All SEO validation rules pass</p>';
    } else {
        echo '<div style="background:#fff3cd;border:1px solid #ffc107;border-radius:4px;padding:10px;margin-bottom:8px;">';
        foreach ($warnings as $w) {
            echo '<p style="margin:4px 0;font-size:13px;color:#856404;">' . esc_html($w) . '</p>';
        }
        echo '</div>';
        echo '<p class="description" style="margin-top:8px;">Fix these before publishing for optimal SERP ranking.</p>';
    }
}

/**
 * Tour Details meta box
 */
function simsem_tour_details_cb($post) {
    wp_nonce_field('simsem_save_tour', 'simsem_tour_nonce');
    $fields = [
        '_simsem_price'     => ['label' => 'Price (USD)', 'placeholder' => '147.00', 'type' => 'text'],
        '_simsem_duration'  => ['label' => 'Duration', 'placeholder' => '2 Days', 'type' => 'text'],
        '_simsem_pickup'    => ['label' => 'Pickup Location', 'placeholder' => 'Visitor Center', 'type' => 'text'],
        '_simsem_language'  => ['label' => 'Languages', 'placeholder' => 'English, Arabic', 'type' => 'text'],
        '_simsem_group'     => ['label' => 'Group Size', 'placeholder' => '2–8 people', 'type' => 'text'],
        '_simsem_transport' => ['label' => 'Transport', 'placeholder' => '4x4 Jeep', 'type' => 'text'],
        '_simsem_host'      => ['label' => 'Host', 'placeholder' => 'Local Guide', 'type' => 'text'],
        '_simsem_terrain'   => ['label' => 'Terrain', 'placeholder' => 'Desert, sand dunes', 'type' => 'text'],
        '_simsem_fitness'   => ['label' => 'Fitness Level', 'placeholder' => 'Easy', 'type' => 'text'],
        '_simsem_private'   => ['label' => 'Private Option', 'placeholder' => 'Yes', 'type' => 'text'],
        '_simsem_country'   => ['label' => 'Country', 'placeholder' => 'Jordan', 'type' => 'text'],
        '_simsem_badge'     => ['label' => 'Badge Text', 'placeholder' => '2-Day Safari', 'type' => 'text'],
    ];
    echo '<div class="simsem-meta-grid">';
    foreach ($fields as $key => $field) {
        $val = simsem_get($post->ID, $key);
        printf(
            '<div class="simsem-field"><label>%s</label><input type="%s" name="%s" value="%s" placeholder="%s" /></div>',
            esc_html($field['label']),
            esc_attr($field['type']),
            esc_attr($key),
            esc_attr($val),
            esc_attr($field['placeholder'])
        );
    }
    echo '</div>';
}

/**
 * Highlights meta box
 */
function simsem_tour_highlights_cb($post) {
    $highlights = simsem_get($post->ID, '_simsem_highlights', '');
    echo '<p class="description">One highlight per line — operational facts only, no storytelling</p>';
    printf('<textarea name="_simsem_highlights" rows="8" style="width:100%%">%s</textarea>', esc_textarea($highlights));
}

/**
 * Included / Not Included
 */
function simsem_tour_included_cb($post) {
    $included = simsem_get($post->ID, '_simsem_included', '');
    $not_included = simsem_get($post->ID, '_simsem_not_included', '');
    echo '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">';
    echo '<div><label><strong>✓ What\'s Included</strong> (one per line)</label>';
    printf('<textarea name="_simsem_included" rows="6" style="width:100%%">%s</textarea>', esc_textarea($included));
    echo '</div>';
    echo '<div><label><strong>✗ What\'s Not Included</strong> (one per line)</label>';
    printf('<textarea name="_simsem_not_included" rows="6" style="width:100%%">%s</textarea>', esc_textarea($not_included));
    echo '</div></div>';
}

/**
 * Itinerary meta box
 */
function simsem_tour_itinerary_cb($post) {
    $itinerary = simsem_get($post->ID, '_simsem_itinerary', '');
    echo '<p class="description">JSON format: <code>[{"day":1,"items":[{"time":"9:00 AM","title":"...","desc":"..."}]}]</code></p>';
    printf('<textarea name="_simsem_itinerary" rows="12" style="width:100%%;font-family:monospace;font-size:12px;">%s</textarea>', esc_textarea($itinerary));
}

/**
 * Extra content sections
 */
function simsem_tour_content_cb($post) {
    $who = simsem_get($post->ID, '_simsem_who_for', '');
    $diff = simsem_get($post->ID, '_simsem_what_different', '');
    $diff_points = simsem_get($post->ID, '_simsem_diff_points', '');
    $meeting = simsem_get($post->ID, '_simsem_meeting_point', '');

    $about = simsem_get($post->ID, '_simsem_about', '');

    echo '<label><strong>📖 About This Experience</strong> (rich intro paragraph)</label>';
    printf('<textarea name="_simsem_about" rows="4" style="width:100%%">%s</textarea>', esc_textarea($about));

    echo '<br/><label><strong>❤️ Who Is This Tour For?</strong> (booking anxiety resolver)</label>';
    printf('<textarea name="_simsem_who_for" rows="3" style="width:100%%">%s</textarea>', esc_textarea($who));

    echo '<br/><label><strong>⭐ What Makes This Tour Different?</strong> (local operator signal)</label>';
    printf('<textarea name="_simsem_what_different" rows="3" style="width:100%%">%s</textarea>', esc_textarea($diff));

    echo '<br/><label><strong>⭐ Differentiator bullet points</strong> (one per line)</label>';
    printf('<textarea name="_simsem_diff_points" rows="4" style="width:100%%">%s</textarea>', esc_textarea($diff_points));

    echo '<br/><label><strong>📍 Where Does the Tour Start?</strong> (reduces logistics anxiety)</label>';
    printf('<textarea name="_simsem_meeting_point" rows="3" style="width:100%%">%s</textarea>', esc_textarea($meeting));
}

/**
 * Guide info
 */
function simsem_tour_guide_cb($post) {
    $name = simsem_get($post->ID, '_simsem_guide_name', '');
    $bio = simsem_get($post->ID, '_simsem_guide_bio', '');
    $note = simsem_get($post->ID, '_simsem_guide_note', '');

    printf('<label>Guide Display Name</label><input type="text" name="_simsem_guide_name" value="%s" placeholder="Your Bedouin Guide" style="width:100%%" />', esc_attr($name));
    printf('<br/><label>Guide Note</label><input type="text" name="_simsem_guide_note" value="%s" placeholder="Name shared after booking" style="width:100%%" />', esc_attr($note));
    printf('<br/><label>Guide Bio</label><textarea name="_simsem_guide_bio" rows="3" style="width:100%%">%s</textarea>', esc_textarea($bio));
}

/**
 * FAQs
 */
function simsem_tour_faqs_cb($post) {
    $faqs = simsem_get($post->ID, '_simsem_faqs', '');
    echo '<p class="description">JSON format: <code>[{"q":"Question?","a":"Answer."}]</code><br/>MUST include: cost, private availability, pickup, inclusions, experience needed</p>';
    printf('<textarea name="_simsem_faqs" rows="8" style="width:100%%;font-family:monospace;font-size:12px;">%s</textarea>', esc_textarea($faqs));
}

/**
 * Gallery
 */
function simsem_tour_gallery_cb($post) {
    $gallery = simsem_get($post->ID, '_simsem_gallery', '');
    echo '<p class="description">One image URL per line (CDN URLs or WordPress media URLs)</p>';
    printf('<textarea name="_simsem_gallery" rows="10" style="width:100%%">%s</textarea>', esc_textarea($gallery));
}

/**
 * SEO meta box
 */
function simsem_tour_seo_cb($post) {
    $meta_title = simsem_get($post->ID, '_simsem_meta_title', '');
    $meta_desc = simsem_get($post->ID, '_simsem_meta_desc', '');

    printf('<label>Meta Title (≤60 chars)</label><input type="text" name="_simsem_meta_title" value="%s" style="width:100%%" maxlength="60" />', esc_attr($meta_title));
    printf('<br/><label>Meta Description (≤160 chars)</label><textarea name="_simsem_meta_desc" rows="2" style="width:100%%" maxlength="160">%s</textarea>', esc_textarea($meta_desc));
}

/**
 * Booking sidebar meta box
 */
function simsem_tour_booking_cb($post) {
    $url = simsem_get($post->ID, '_simsem_booking_url', '');
    $cta = simsem_get($post->ID, '_simsem_cta_text', 'Reserve Now');
    $cancel = simsem_get($post->ID, '_simsem_cancel_note', 'Free cancellation · Instant confirmation');
    $instagram = simsem_get($post->ID, '_simsem_instagram_url', '');

    printf('<label>Booking URL</label><input type="url" name="_simsem_booking_url" value="%s" style="width:100%%" />', esc_attr($url));
    printf('<br/><label>CTA Text</label><input type="text" name="_simsem_cta_text" value="%s" style="width:100%%" />', esc_attr($cta));
    printf('<br/><label>Note below CTA</label><input type="text" name="_simsem_cancel_note" value="%s" style="width:100%%" />', esc_attr($cancel));
    printf('<br/><label>📸 Instagram URL</label><input type="url" name="_simsem_instagram_url" value="%s" placeholder="https://www.instagram.com/simsem.travel/" style="width:100%%" />', esc_attr($instagram));
}

/**
 * Save all meta fields
 */
add_action('save_post_simsem_tour', function ($post_id) {
    if (!isset($_POST['simsem_tour_nonce']) || !wp_verify_nonce($_POST['simsem_tour_nonce'], 'simsem_save_tour')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $text_fields = [
        '_simsem_price', '_simsem_duration', '_simsem_pickup', '_simsem_language',
        '_simsem_group', '_simsem_transport', '_simsem_host', '_simsem_terrain',
        '_simsem_fitness', '_simsem_private', '_simsem_country', '_simsem_badge',
        '_simsem_guide_name', '_simsem_guide_note', '_simsem_cta_text',
        '_simsem_cancel_note', '_simsem_meta_title',
    ];

    $textarea_fields = [
        '_simsem_about', '_simsem_highlights', '_simsem_included', '_simsem_not_included',
        '_simsem_itinerary', '_simsem_who_for', '_simsem_what_different',
        '_simsem_diff_points', '_simsem_meeting_point', '_simsem_guide_bio',
        '_simsem_faqs', '_simsem_gallery', '_simsem_meta_desc',
    ];

    $url_fields = ['_simsem_booking_url', '_simsem_instagram_url'];

    foreach ($text_fields as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, sanitize_text_field($_POST[$key]));
        }
    }
    foreach ($textarea_fields as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, sanitize_textarea_field($_POST[$key]));
        }
    }
    foreach ($url_fields as $key) {
        if (isset($_POST[$key])) {
            update_post_meta($post_id, $key, esc_url_raw($_POST[$key]));
        }
    }
});
