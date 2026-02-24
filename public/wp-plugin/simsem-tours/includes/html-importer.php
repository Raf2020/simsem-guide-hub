<?php
if (!defined('ABSPATH')) exit;

/**
 * HTML Import Metabox — appears at the very top of the tour editor
 */
add_action('add_meta_boxes', function () {
    add_meta_box(
        'simsem_html_import',
        '📥 Import Tour from HTML',
        'simsem_html_import_cb',
        'simsem_tour',
        'normal',
        'high'
    );
}, 5);

function simsem_html_import_cb($post) {
    ?>
    <div class="simsem-import-box">
        <p class="description" style="margin-bottom:12px;">
            Paste your tour HTML content below or upload an <code>.html</code> file. 
            Click <strong>Import &amp; Fill Fields</strong> to auto-populate all tour fields.
        </p>
        <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
            <input type="file" id="simsem-html-file" accept=".html,.htm" style="flex:1;" />
            <span style="color:#999;">or paste below ↓</span>
        </div>
        <textarea id="simsem-html-raw" rows="6" style="width:100%;font-family:monospace;font-size:12px;" placeholder="Paste full HTML content here..."></textarea>
        <div style="margin-top:12px;display:flex;gap:12px;align-items:center;">
            <button type="button" id="simsem-import-btn" class="button button-primary button-large">
                📥 Import &amp; Fill Fields
            </button>
            <span id="simsem-import-status" style="font-size:13px;color:#999;"></span>
        </div>
    </div>
    <script>
    (function(){
        document.getElementById('simsem-html-file').addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (!file) return;
            var reader = new FileReader();
            reader.onload = function(ev) {
                document.getElementById('simsem-html-raw').value = ev.target.result;
                document.getElementById('simsem-import-status').textContent = 'File loaded: ' + file.name;
            };
            reader.readAsText(file);
        });

        document.getElementById('simsem-import-btn').addEventListener('click', function() {
            var html = document.getElementById('simsem-html-raw').value.trim();
            if (!html) {
                alert('Please paste HTML or upload a file first.');
                return;
            }
            var status = document.getElementById('simsem-import-status');
            status.textContent = 'Parsing...';
            status.style.color = '#999';

            var data = new FormData();
            data.append('action', 'simsem_parse_html');
            data.append('nonce', '<?php echo wp_create_nonce("simsem_import_html"); ?>');
            data.append('html', html);

            fetch(ajaxurl, { method: 'POST', body: data })
                .then(function(r) { return r.json(); })
                .then(function(res) {
                    if (!res.success) {
                        status.textContent = 'Error: ' + (res.data || 'Unknown');
                        status.style.color = '#d63638';
                        return;
                    }
                    var d = res.data;
                    var filled = 0;

                    function setField(name, val) {
                        if (!val) return;
                        var el = document.querySelector('[name="' + name + '"]');
                        if (el) { el.value = val; filled++; }
                    }

                    // Title
                    if (d.title) {
                        var titleEl = document.getElementById('title') || document.querySelector('#titlewrap input');
                        if (titleEl) { titleEl.value = d.title; filled++; }
                        var gbTitle = document.querySelector('.editor-post-title__input, .wp-block-post-title');
                        if (gbTitle) {
                            gbTitle.textContent = d.title;
                            gbTitle.dispatchEvent(new Event('input', {bubbles:true}));
                        }
                    }

                    // Excerpt
                    if (d.excerpt) {
                        var excerptEl = document.getElementById('excerpt');
                        if (excerptEl) { excerptEl.value = d.excerpt; filled++; }
                    }

                    // Simple fields
                    setField('_simsem_price', d.price);
                    setField('_simsem_duration', d.duration);
                    setField('_simsem_pickup', d.pickup);
                    setField('_simsem_language', d.language);
                    setField('_simsem_group', d.group);
                    setField('_simsem_transport', d.transport);
                    setField('_simsem_host', d.host);
                    setField('_simsem_terrain', d.terrain);
                    setField('_simsem_fitness', d.fitness);
                    setField('_simsem_private', d.private_opt);
                    setField('_simsem_country', d.country);
                    setField('_simsem_badge', d.badge);
                    setField('_simsem_booking_url', d.booking_url);

                    // Textarea fields
                    setField('_simsem_highlights', d.highlights);
                    setField('_simsem_included', d.included);
                    setField('_simsem_not_included', d.not_included);
                    setField('_simsem_diff_points', d.diff_points);

                    // Text/textarea fields
                    setField('_simsem_who_for', d.who_for);
                    setField('_simsem_what_different', d.what_different);
                    setField('_simsem_meeting_point', d.meeting_point);

                    // JSON fields
                    setField('_simsem_itinerary', d.itinerary);
                    setField('_simsem_faqs', d.faqs);

                    // Gallery
                    setField('_simsem_gallery', d.gallery);

                    // Guide
                    setField('_simsem_guide_name', d.guide_name);
                    setField('_simsem_guide_bio', d.guide_bio);
                    setField('_simsem_guide_note', d.guide_note);

                    // SEO
                    setField('_simsem_meta_title', d.meta_title);
                    setField('_simsem_meta_desc', d.meta_desc);

                    status.textContent = '✅ Imported! ' + filled + ' fields filled. Review & save.';
                    status.style.color = '#00a32a';
                })
                .catch(function(err) {
                    status.textContent = 'Error: ' + err.message;
                    status.style.color = '#d63638';
                });
        });
    })();
    </script>
    <?php
}

/**
 * AJAX handler: parse HTML and return structured data
 */
add_action('wp_ajax_simsem_parse_html', function () {
    check_ajax_referer('simsem_import_html', 'nonce');

    if (!current_user_can('edit_posts')) {
        wp_send_json_error('Permission denied');
    }

    $html = wp_unslash($_POST['html'] ?? '');
    if (empty($html)) {
        wp_send_json_error('No HTML provided');
    }

    $result = simsem_parse_tour_html($html);
    wp_send_json_success($result);
});

/**
 * Parse tour HTML into structured meta fields
 */
function simsem_parse_tour_html($html) {
    $data = [];

    libxml_use_internal_errors(true);
    $doc = new DOMDocument();
    $doc->loadHTML('<?xml encoding="UTF-8">' . $html, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
    libxml_clear_errors();

    $xpath = new DOMXPath($doc);

    // Title
    $h1 = $xpath->query('//h1');
    if ($h1->length) {
        $data['title'] = trim($h1->item(0)->textContent);
    }

    // Meta description
    $metaDesc = $xpath->query('//meta[@name="description"]/@content');
    if ($metaDesc->length) {
        $data['meta_desc'] = trim($metaDesc->item(0)->nodeValue);
    }

    // Meta title
    $titleTag = $xpath->query('//title');
    if ($titleTag->length) {
        $data['meta_title'] = mb_substr(trim($titleTag->item(0)->textContent), 0, 60);
    }

    // Excerpt — first <p> after <h1>
    $h1Node = $h1->length ? $h1->item(0) : null;
    if ($h1Node) {
        $sibling = $h1Node->nextSibling;
        while ($sibling) {
            if ($sibling->nodeName === 'p' && trim($sibling->textContent)) {
                $data['excerpt'] = trim($sibling->textContent);
                break;
            }
            $sibling = $sibling->nextSibling;
        }
    }

    // Collect all h2 sections
    $h2s = $xpath->query('//h2');
    $sections = [];
    for ($i = 0; $i < $h2s->length; $i++) {
        $h2 = $h2s->item($i);
        $heading = trim($h2->textContent);
        $content = [];
        $sibling = $h2->nextSibling;
        while ($sibling && $sibling->nodeName !== 'h2') {
            $content[] = $sibling;
            $sibling = $sibling->nextSibling;
        }
        $sections[] = ['heading' => $heading, 'nodes' => $content];
    }

    foreach ($sections as $sec) {
        $h = $sec['heading'];
        $nodes = $sec['nodes'];

        // Tour Overview
        if (stripos($h, 'Tour Overview') !== false) {
            $items = simsem_extract_list_items($nodes);
            foreach ($items as $item) {
                $item = strip_tags($item);
                if (preg_match('/Guide[:\s]*(.+)/i', $item, $m)) $data['host'] = trim($m[1]);
                if (preg_match('/Price[:\s]*\$?([\d,.]+)/i', $item, $m)) $data['price'] = trim($m[1]);
                if (preg_match('/Start[:\s]*(.+)/i', $item, $m)) $data['pickup'] = trim($m[1]);
                if (preg_match('/Duration[:\s]*(.+)/i', $item, $m)) $data['duration'] = trim($m[1]);
                if (preg_match('/Language[:\s]*(.+)/i', $item, $m)) $data['language'] = trim($m[1]);
                if (preg_match('/Location[:\s]*(.+)/i', $item, $m)) {
                    $loc = trim($m[1]);
                    $parts = array_map('trim', explode(',', $loc));
                    $data['country'] = count($parts) > 1 ? end($parts) : $loc;
                }
                if (preg_match('/Transport[:\s]*(.+)/i', $item, $m)) $data['transport'] = trim($m[1]);
                if (preg_match('/Group\s*Size[:\s]*(.+)/i', $item, $m)) $data['group'] = trim($m[1]);
            }
        }

        // Highlights
        if (stripos($h, 'What to Expect') !== false) {
            $items = simsem_extract_list_items($nodes);
            $data['highlights'] = implode("\n", array_map(fn($i) => trim(strip_tags($i)), $items));
        }

        // Tour Details
        if (stripos($h, 'Tour Details') !== false) {
            $items = simsem_extract_list_items($nodes);
            foreach ($items as $item) {
                $item = preg_replace('/^[📏🏜💪🔒\s]+/', '', strip_tags($item));
                if (preg_match('/Terrain[:\s]*(.+)/i', $item, $m)) $data['terrain'] = trim($m[1]);
                if (preg_match('/Fitness[:\s]*(.+)/i', $item, $m)) $data['fitness'] = trim($m[1]);
                if (preg_match('/Private[:\s]*(.+)/i', $item, $m)) $data['private_opt'] = trim($m[1]);
            }
        }

        // What's Included
        if (stripos($h, "What's Included") !== false || stripos($h, 'What is Included') !== false) {
            $items = simsem_extract_list_items($nodes);
            $data['included'] = implode("\n", array_map(fn($i) => trim(preg_replace('/^[✓✗\s]+/', '', strip_tags($i))), $items));
        }

        // Not Included
        if (stripos($h, 'Not Included') !== false && stripos($h, "What's") === false) {
            $items = simsem_extract_list_items($nodes);
            $data['not_included'] = implode("\n", array_map(fn($i) => trim(preg_replace('/^[✓✗\s]+/', '', strip_tags($i))), $items));
        }

        // Who Is This For
        if (stripos($h, 'Who Is This') !== false) {
            $data['who_for'] = simsem_extract_paragraphs($nodes);
        }

        // What Makes This Tour Different
        if (stripos($h, 'What Makes') !== false) {
            $paras = [];
            $points = [];
            foreach ($nodes as $n) {
                if ($n->nodeName === 'p') $paras[] = trim($n->textContent);
                if ($n->nodeName === 'ul' || $n->nodeName === 'ol') {
                    $lis = $n->getElementsByTagName('li');
                    for ($j = 0; $j < $lis->length; $j++) {
                        $points[] = trim($lis->item($j)->textContent);
                    }
                }
            }
            $data['what_different'] = implode("\n\n", $paras);
            $data['diff_points'] = implode("\n", $points);
        }

        // Meeting Point
        if (stripos($h, 'Where Does') !== false || stripos($h, 'Meeting Point') !== false) {
            $data['meeting_point'] = simsem_extract_paragraphs($nodes);
        }

        // Itinerary
        if (stripos($h, 'Itinerary') !== false) {
            $itinerary = simsem_parse_itinerary_nodes($nodes);
            if (!empty($itinerary)) {
                $data['itinerary'] = json_encode($itinerary, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            }
        }

        // Guide — hardened extraction
        if (stripos($h, 'Your Guide') !== false || stripos($h, 'Guide:') !== false) {
            $guideName = '';
            $guideNote = '';

            // 1) Try <strong> inside the section nodes
            foreach ($nodes as $n) {
                if (!($n instanceof DOMElement)) continue;
                $strongs = $n->getElementsByTagName('strong');
                if ($strongs->length > 0) {
                    $candidate = trim($strongs->item(0)->textContent);
                    // Only accept if it looks like a name (not a long sentence)
                    if (mb_strlen($candidate) < 60 && !preg_match('/\b(the|this|our|your|and|with)\b/i', $candidate)) {
                        $guideName = $candidate;
                        break;
                    }
                }
            }

            // 2) Fallback: extract from heading text after "Your Guide:"
            if (empty($guideName)) {
                $guideName = trim(preg_replace('/^Your Guide[:\s]*/i', '', $h));
            }

            // 3) Strip parenthetical note from name: "Name (note here)" → name + note
            if (!empty($guideName) && preg_match('/^(.*?)\s*\(([^)]+)\)\s*$/u', $guideName, $m)) {
                $guideName = trim($m[1]);
                $guideNote = ucfirst(trim($m[2]));
            }

            // 4) Clean up: if guide name still contains "Your Guide" prefix, strip it
            $guideName = trim(preg_replace('/^Your Guide[:\s]*/i', '', $guideName));

            if (!empty($guideName)) {
                $data['guide_name'] = $guideName;
            }
            if (!empty($guideNote)) {
                $data['guide_note'] = $guideNote;
            }

            $data['guide_bio'] = simsem_extract_paragraphs($nodes);

            // 5) Infer note from bio if still empty
            if (empty($data['guide_note']) && !empty($data['guide_bio'])) {
                if (stripos($data['guide_bio'], 'after booking') !== false) {
                    $data['guide_note'] = 'Name shared after booking';
                }
            }
        }

        // FAQs
        if (stripos($h, 'Frequently Asked') !== false || stripos($h, 'FAQ') !== false) {
            $faqs = [];
            $currentQ = null;
            foreach ($nodes as $n) {
                if ($n->nodeName === 'h3') {
                    if ($currentQ !== null) $faqs[] = $currentQ;
                    $currentQ = ['q' => trim($n->textContent), 'a' => ''];
                }
                if ($n->nodeName === 'p' && $currentQ !== null) {
                    $currentQ['a'] .= ($currentQ['a'] ? ' ' : '') . trim($n->textContent);
                }
            }
            if ($currentQ !== null) $faqs[] = $currentQ;
            if (!empty($faqs)) {
                $data['faqs'] = json_encode($faqs, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            }
        }

        // Image URLs
        if (stripos($h, 'Image URL') !== false) {
            $urls = [];
            foreach ($nodes as $n) {
                if (!($n instanceof DOMElement)) continue;
                $anchors = $n->getElementsByTagName('a');
                foreach ($anchors as $a) {
                    $href = $a->getAttribute('href');
                    if (preg_match('/\.(jpg|jpeg|png|webp|gif)/i', $href)) {
                        $urls[] = $href;
                    }
                }
            }
            if (!empty($urls)) {
                $data['gallery'] = implode("\n", $urls);
            }
        }
    }

    // Booking URL
    $ctaLinks = $xpath->query('//a[contains(@class,"seo-cta")]/@href');
    if ($ctaLinks->length) {
        $data['booking_url'] = $ctaLinks->item($ctaLinks->length - 1)->nodeValue;
    }
    if (empty($data['booking_url'])) {
        $allLinks = $xpath->query('//a');
        for ($i = 0; $i < $allLinks->length; $i++) {
            $text = strtolower($allLinks->item($i)->textContent);
            if (strpos($text, 'book') !== false) {
                $data['booking_url'] = $allLinks->item($i)->getAttribute('href');
            }
        }
    }

    // Badge from duration
    if (empty($data['badge']) && !empty($data['duration'])) {
        $data['badge'] = $data['duration'] . ' Adventure';
    }

    return $data;
}

/**
 * Extract list items from DOM nodes
 */
function simsem_extract_list_items($nodes) {
    $items = [];
    foreach ($nodes as $n) {
        if (!($n instanceof DOMElement)) continue;
        if ($n->nodeName === 'ul' || $n->nodeName === 'ol') {
            $lis = $n->getElementsByTagName('li');
            for ($j = 0; $j < $lis->length; $j++) {
                $items[] = trim($lis->item($j)->textContent);
            }
        }
    }
    return $items;
}

/**
 * Extract paragraph text from DOM nodes
 */
function simsem_extract_paragraphs($nodes) {
    $texts = [];
    foreach ($nodes as $n) {
        if ($n->nodeName === 'p' && trim($n->textContent)) {
            $texts[] = trim($n->textContent);
        }
    }
    return implode("\n\n", $texts);
}

/**
 * Parse itinerary from h3 + p nodes
 */
function simsem_parse_itinerary_nodes($nodes) {
    $days = [];
    $currentDay = null;
    $currentItem = null;

    foreach ($nodes as $n) {
        if (!($n instanceof DOMElement)) continue;

        if ($n->nodeName === 'h3') {
            if ($currentItem && $currentDay) {
                $currentDay['items'][] = $currentItem;
                $currentItem = null;
            }
            if ($currentDay) $days[] = $currentDay;

            $text = trim($n->textContent);
            $dayNum = 1;
            if (preg_match('/Day\s*(\d+)/i', $text, $m)) {
                $dayNum = (int)$m[1];
            }
            $currentDay = ['day' => $dayNum, 'items' => []];
            continue;
        }

        if ($n->nodeName === 'p' && $currentDay) {
            $strongs = $n->getElementsByTagName('strong');
            if ($strongs->length > 0) {
                if ($currentItem) $currentDay['items'][] = $currentItem;

                $time = trim($strongs->item(0)->textContent);
                $title = $strongs->length > 1 ? trim($strongs->item(1)->textContent) : '';
                $time = preg_replace('/\s*[—–-]\s*$/', '', $time);

                $currentItem = ['time' => $time, 'title' => $title, 'desc' => ''];
            } else if ($currentItem) {
                $desc = trim($n->textContent);
                if ($desc) {
                    $currentItem['desc'] .= ($currentItem['desc'] ? ' ' : '') . $desc;
                }
            }
        }
    }

    if ($currentItem && $currentDay) $currentDay['items'][] = $currentItem;
    if ($currentDay) $days[] = $currentDay;

    return $days;
}
