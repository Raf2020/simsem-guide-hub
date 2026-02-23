<?php
/**
 * Tours Archive Template — SimSem Tours
 */
if (!defined('ABSPATH')) exit;
get_header();
?>

<div class="wr-page" style="padding: 40px 16px;">
    <h1 class="wr-h1">Explore Our Tours</h1>
    <p class="wr-desc" style="margin-bottom: 40px;">Authentic Middle Eastern travel experiences — from desert safaris to city food tours.</p>

    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
        <?php if (have_posts()) : while (have_posts()) : the_post();
            $price    = get_post_meta(get_the_ID(), '_simsem_price', true);
            $duration = get_post_meta(get_the_ID(), '_simsem_duration', true);
            $country  = get_post_meta(get_the_ID(), '_simsem_country', true);
            $gallery  = get_post_meta(get_the_ID(), '_simsem_gallery', true);
            $images   = array_filter(array_map('trim', explode("\n", $gallery)));
            $thumb    = !empty($images) ? $images[0] : '';
            if (!$thumb && has_post_thumbnail()) {
                $thumb = get_the_post_thumbnail_url(get_the_ID(), 'medium_large');
            }
        ?>
        <a href="<?php the_permalink(); ?>" style="text-decoration:none; color:inherit;">
            <div style="border-radius:16px; border:1px solid #e5e5e5; overflow:hidden; transition: box-shadow 0.2s, transform 0.2s;"
                 onmouseover="this.style.boxShadow='0 8px 30px rgba(0,0,0,0.1)'; this.style.transform='translateY(-2px)';"
                 onmouseout="this.style.boxShadow='none'; this.style.transform='none';">
                <?php if ($thumb) : ?>
                <img src="<?php echo esc_url($thumb); ?>" alt="<?php the_title_attribute(); ?>"
                     style="width:100%; height:200px; object-fit:cover;" loading="lazy" />
                <?php endif; ?>
                <div style="padding:20px;">
                    <?php if ($country) : ?>
                    <span class="wr-badge wr-badge-gold" style="margin-bottom:8px;"><?php echo esc_html($country); ?></span>
                    <?php endif; ?>
                    <h2 style="font-size:1.1rem; font-weight:700; margin:8px 0;"><?php the_title(); ?></h2>
                    <?php if (has_excerpt()) : ?>
                    <p style="font-size:13px; color:#666; line-height:1.5; margin-bottom:12px;"><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                    <?php endif; ?>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px;">
                        <?php if ($duration) : ?><span style="color:#666;">⏱ <?php echo esc_html($duration); ?></span><?php endif; ?>
                        <?php if ($price) : ?><span style="font-weight:700; color:#d4af37;">From $<?php echo esc_html($price); ?></span><?php endif; ?>
                    </div>
                </div>
            </div>
        </a>
        <?php endwhile; endif; ?>
    </div>

    <div style="margin-top:40px; text-align:center;">
        <?php the_posts_pagination(['mid_size' => 2, 'prev_text' => '← Previous', 'next_text' => 'Next →']); ?>
    </div>
</div>

<?php get_footer(); ?>
