<?php
/**
 * Single Tour Template — SimSem Tours
 */
if (!defined('ABSPATH')) exit;
get_header();

global $post;
$id = $post->ID;

// Get all meta
$price       = get_post_meta($id, '_simsem_price', true);
$duration    = get_post_meta($id, '_simsem_duration', true);
$pickup      = get_post_meta($id, '_simsem_pickup', true);
$language    = get_post_meta($id, '_simsem_language', true);
$group       = get_post_meta($id, '_simsem_group', true);
$transport   = get_post_meta($id, '_simsem_transport', true);
$host        = get_post_meta($id, '_simsem_host', true);
$terrain     = get_post_meta($id, '_simsem_terrain', true);
$fitness     = get_post_meta($id, '_simsem_fitness', true);
$private_opt = get_post_meta($id, '_simsem_private', true);
$country     = get_post_meta($id, '_simsem_country', true);
$badge       = get_post_meta($id, '_simsem_badge', true);
$booking_url = get_post_meta($id, '_simsem_booking_url', true);
$cta_text    = get_post_meta($id, '_simsem_cta_text', true) ?: 'Reserve Now';
$cancel_note = get_post_meta($id, '_simsem_cancel_note', true) ?: 'Free cancellation · Instant confirmation';

$highlights_raw  = get_post_meta($id, '_simsem_highlights', true);
$included_raw    = get_post_meta($id, '_simsem_included', true);
$not_included_raw = get_post_meta($id, '_simsem_not_included', true);
$itinerary_raw   = get_post_meta($id, '_simsem_itinerary', true);
$who_for         = get_post_meta($id, '_simsem_who_for', true);
$what_diff       = get_post_meta($id, '_simsem_what_different', true);
$diff_points_raw = get_post_meta($id, '_simsem_diff_points', true);
$meeting_point   = get_post_meta($id, '_simsem_meeting_point', true);
$guide_name      = get_post_meta($id, '_simsem_guide_name', true);
$guide_note      = get_post_meta($id, '_simsem_guide_note', true);
$guide_bio       = get_post_meta($id, '_simsem_guide_bio', true);
$faqs_raw        = get_post_meta($id, '_simsem_faqs', true);
$gallery_raw     = get_post_meta($id, '_simsem_gallery', true);

// Parse multi-line fields
$highlights  = array_filter(array_map('trim', explode("\n", $highlights_raw)));
$included    = array_filter(array_map('trim', explode("\n", $included_raw)));
$not_included = array_filter(array_map('trim', explode("\n", $not_included_raw)));
$diff_points = array_filter(array_map('trim', explode("\n", $diff_points_raw)));
$gallery     = array_filter(array_map('trim', explode("\n", $gallery_raw)));

// Parse JSON fields
$itinerary = json_decode($itinerary_raw, true) ?: [];
$faqs      = json_decode($faqs_raw, true) ?: [];

// Tour details grid
$details = [
    ['emoji' => '👤', 'label' => 'Host', 'value' => $host],
    ['emoji' => '⏱', 'label' => 'Duration', 'value' => $duration],
    ['emoji' => '📍', 'label' => 'Pickup', 'value' => $pickup],
    ['emoji' => '🌐', 'label' => 'Language', 'value' => $language],
    ['emoji' => '👥', 'label' => 'Group', 'value' => $group],
    ['emoji' => '🧭', 'label' => 'Transport', 'value' => $transport],
];
$details = array_filter($details, fn($d) => !empty($d['value']));
?>

<div class="wr-page">

    <!-- ========== GALLERY ========== -->
    <?php if (!empty($gallery)) : ?>
    <div class="wr-section">
        <img class="wr-gallery-main" id="wr-main-img"
             src="<?php echo esc_url($gallery[0]); ?>"
             alt="<?php echo esc_attr(get_the_title()); ?>" />
        <?php if (count($gallery) > 1) : ?>
        <div class="wr-gallery-thumbs">
            <?php foreach ($gallery as $i => $img) : ?>
            <img class="wr-gallery-thumb <?php echo $i === 0 ? 'active' : ''; ?>"
                 src="<?php echo esc_url($img); ?>"
                 alt="<?php echo esc_attr(get_the_title() . ' photo ' . ($i + 1)); ?>"
                 onclick="document.getElementById('wr-main-img').src=this.src; document.querySelectorAll('.wr-gallery-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
            <?php endforeach; ?>
        </div>
        <?php endif; ?>
    </div>
    <?php endif; ?>

    <!-- ========== MAIN LAYOUT ========== -->
    <div class="wr-layout">

        <!-- LEFT COLUMN -->
        <div>

            <!-- Header -->
            <div class="wr-section">
                <?php if ($country) : ?><span class="wr-badge wr-badge-gold"><?php echo esc_html($country); ?></span><?php endif; ?>
                <?php if ($badge) : ?><span class="wr-badge wr-badge-navy"><?php echo esc_html($badge); ?></span><?php endif; ?>
                <h1 class="wr-h1"><?php the_title(); ?></h1>
                <div class="wr-meta">
                    <?php if ($pickup) : ?><span>📍 <?php echo esc_html($pickup); ?></span><?php endif; ?>
                    <?php if ($duration) : ?><span>⏱ <?php echo esc_html($duration); ?></span><?php endif; ?>
                    <span class="wr-stars">★★★★★</span>
                </div>
                <?php if (has_excerpt()) : ?>
                <p class="wr-desc"><?php echo esc_html(get_the_excerpt()); ?></p>
                <?php endif; ?>
            </div>

            <!-- Quick Details -->
            <?php if (!empty($details)) : ?>
            <div class="wr-grid-6">
                <?php foreach ($details as $d) : ?>
                <div class="wr-detail-card">
                    <div><?php echo $d['emoji']; ?></div>
                    <div class="wr-detail-label"><?php echo esc_html($d['label']); ?></div>
                    <div class="wr-detail-value"><?php echo esc_html($d['value']); ?></div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Highlights -->
            <?php if (!empty($highlights)) : ?>
            <div class="wr-section">
                <h2>🏔 What to Expect</h2>
                <div class="wr-highlights">
                    <?php foreach ($highlights as $h) : ?>
                    <div class="wr-highlight"><span class="wr-check">✓</span> <?php echo esc_html($h); ?></div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Included / Not Included -->
            <?php if (!empty($included) || !empty($not_included)) : ?>
            <div class="wr-section">
                <h2>🛡 What's Included</h2>
                <div class="wr-incl-grid">
                    <?php if (!empty($included)) : ?>
                    <div class="wr-incl-box wr-incl-yes">
                        <h3 style="color:#22c55e;">✓ Included</h3>
                        <ul>
                            <?php foreach ($included as $item) : ?>
                            <li><span style="color:#22c55e;">✓</span> <?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>
                    <?php if (!empty($not_included)) : ?>
                    <div class="wr-incl-box wr-incl-no">
                        <h3 style="color:#ef4444;">✗ Not Included</h3>
                        <ul>
                            <?php foreach ($not_included as $item) : ?>
                            <li><span style="color:#ef4444;">✗</span> <?php echo esc_html($item); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                    <?php endif; ?>
                </div>
                <div class="wr-chips">
                    <?php if ($terrain) : ?><span class="wr-chip">🏜 <?php echo esc_html($terrain); ?></span><?php endif; ?>
                    <?php if ($fitness) : ?><span class="wr-chip">💪 <?php echo esc_html($fitness); ?></span><?php endif; ?>
                    <?php if ($private_opt) : ?><span class="wr-chip">🔒 Private: <?php echo esc_html($private_opt); ?></span><?php endif; ?>
                </div>
            </div>
            <?php endif; ?>

            <!-- Itinerary -->
            <?php if (!empty($itinerary)) : ?>
            <div class="wr-section">
                <h2>🧭 Detailed Itinerary</h2>
                <?php foreach ($itinerary as $day) : ?>
                <h3 style="font-size:16px; font-weight:700; margin:24px 0 16px;">Day <?php echo intval($day['day']); ?></h3>
                <div class="wr-timeline">
                    <?php foreach ($day['items'] as $item) : ?>
                    <div class="wr-timeline-item">
                        <div class="wr-timeline-card">
                            <div class="wr-timeline-time"><?php echo esc_html($item['time']); ?></div>
                            <div class="wr-timeline-title"><?php echo esc_html($item['title']); ?></div>
                            <div class="wr-timeline-desc"><?php echo esc_html($item['desc']); ?></div>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Who Is This For -->
            <?php if ($who_for) : ?>
            <div class="wr-info-card">
                <h2>❤️ Who Is This Experience For?</h2>
                <p><?php echo esc_html($who_for); ?></p>
            </div>
            <?php endif; ?>

            <!-- What Makes It Different -->
            <?php if ($what_diff) : ?>
            <div class="wr-info-card">
                <h2>⭐ What Makes This Tour Different?</h2>
                <p><?php echo esc_html($what_diff); ?></p>
                <?php if (!empty($diff_points)) : ?>
                <ul style="margin-top:12px; padding-left:0; list-style:none;">
                    <?php foreach ($diff_points as $pt) : ?>
                    <li style="margin-bottom:8px; font-size:14px;">⭐ <?php echo esc_html($pt); ?></li>
                    <?php endforeach; ?>
                </ul>
                <?php endif; ?>
            </div>
            <?php endif; ?>

            <!-- Meeting Point -->
            <?php if ($meeting_point) : ?>
            <div class="wr-info-card">
                <h2>📍 Where Does the Tour Start?</h2>
                <p><?php echo esc_html($meeting_point); ?></p>
            </div>
            <?php endif; ?>

            <!-- Guide -->
            <?php if ($guide_name || $guide_bio) : ?>
            <div class="wr-section">
                <div class="wr-guide">
                    <div class="wr-guide-avatar"><?php echo mb_substr($guide_name ?: 'G', 0, 1); ?></div>
                    <div>
                        <h3 style="font-size:18px; font-weight:700; margin:0 0 4px;"><?php echo esc_html($guide_name ?: 'Your Guide'); ?></h3>
                        <?php if ($guide_note) : ?><p style="font-size:12px; color:#d4af37; font-weight:500; margin-bottom:8px;"><?php echo esc_html($guide_note); ?></p><?php endif; ?>
                        <?php if ($guide_bio) : ?><p style="font-size:14px; color:#666; line-height:1.6;"><?php echo esc_html($guide_bio); ?></p><?php endif; ?>
                    </div>
                </div>
            </div>
            <?php endif; ?>

            <!-- FAQs -->
            <?php if (!empty($faqs)) : ?>
            <div class="wr-section wr-faq">
                <h2>💬 FAQs</h2>
                <?php foreach ($faqs as $faq) : ?>
                <details>
                    <summary><?php echo esc_html($faq['q']); ?></summary>
                    <div><?php echo esc_html($faq['a']); ?></div>
                </details>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Post Content (if any extra content from WP editor) -->
            <?php
            $content = get_the_content();
            if (!empty(trim($content))) : ?>
            <div class="wr-section">
                <div class="entry-content"><?php the_content(); ?></div>
            </div>
            <?php endif; ?>

        </div>

        <!-- RIGHT COLUMN — BOOKING SIDEBAR -->
        <div>
            <div class="wr-sidebar" style="position:sticky; top:80px;">
                <div class="wr-sidebar-header">
                    <p style="font-size:11px; text-transform:uppercase; letter-spacing:1px; opacity:0.6; margin-bottom:4px;">Starting from</p>
                    <p class="wr-sidebar-price">$<?php echo esc_html($price ?: '0'); ?><span>/person</span></p>
                </div>
                <div class="wr-sidebar-body">
                    <?php if ($duration) : ?><div class="wr-sidebar-row"><span class="label">⏱ Duration</span><span class="value"><?php echo esc_html($duration); ?></span></div><?php endif; ?>
                    <?php if ($group) : ?><div class="wr-sidebar-row"><span class="label">👥 Group Size</span><span class="value"><?php echo esc_html($group); ?></span></div><?php endif; ?>
                    <?php if ($pickup) : ?><div class="wr-sidebar-row"><span class="label">📍 Start</span><span class="value"><?php echo esc_html($pickup); ?></span></div><?php endif; ?>
                    <?php if ($language) : ?><div class="wr-sidebar-row"><span class="label">🌐 Languages</span><span class="value"><?php echo esc_html($language); ?></span></div><?php endif; ?>
                    <hr style="border:none; border-top:1px solid #e5e5e5; margin:16px 0;" />
                    <p style="font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; color:#999; margin-bottom:12px;">Key inclusions</p>
                    <?php foreach (array_slice($included, 0, 4) as $item) : ?>
                    <p style="font-size:13px; margin-bottom:8px;">✓ <?php echo esc_html($item); ?></p>
                    <?php endforeach; ?>

                    <?php if ($booking_url) : ?>
                    <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta"><?php echo esc_html($cta_text); ?> →</a>
                    <?php endif; ?>

                    <p style="text-align:center; font-size:12px; color:#999; margin-top:12px;"><?php echo esc_html($cancel_note); ?></p>
                </div>
            </div>
            <div class="wr-trust">
                <span>🛡 Verified</span>
                <span>⭐ Top Rated</span>
                <span>❤️ 98% Love It</span>
            </div>
        </div>

    </div>

    <!-- Mobile Sticky Bottom Bar -->
    <?php if ($booking_url) : ?>
    <div class="wr-mobile-bar">
        <div>
            <p style="font-size:11px; color:#999;">From</p>
            <p style="font-size:20px; font-weight:800;">$<?php echo esc_html($price); ?> <span style="font-size:13px; font-weight:400; color:#999;">/person</span></p>
        </div>
        <a href="<?php echo esc_url($booking_url); ?>" target="_blank" rel="noopener noreferrer" class="wr-cta-mobile"><?php echo esc_html($cta_text); ?></a>
    </div>
    <?php endif; ?>

</div>

<?php get_footer(); ?>
