export type Locale = 'en' | 'de' | 'fr' | 'it' | 'nl';

export interface Translations {
  [key: string]: string;
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  en: {
    // Nav
    nav_coupons: 'Coupons',
    nav_stores: 'Stores',
    nav_categories: 'Categories',
    nav_guides: 'Guides',
    nav_reviews: 'Reviews',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    search_placeholder: 'Search deals...',
    select_region: 'Select Region',

    // Hero
    hero_badge: 'VERIFIED PROMO CODES & DAILY DEALS',
    hero_title_1: 'Unlock',
    hero_title_2: 'Smarter Savings.',
    hero_title_3: 'Every Day.',
    hero_desc: 'Access 50,000+ hand-tested promo codes, discount vouchers, and exclusive savings across 500+ top verified retailers.',
    hero_search_input: 'Search stores, brands, or coupon codes...',
    hero_btn_find: 'Find Deals',
    hero_trending: 'Trending:',
    hero_floating_1: '25% OFF Sitewide',
    hero_floating_2: '40% OFF',
    hero_floating_3: '15% OFF + Free Ship',

    // Section Titles & Badges
    section_highlights_badge: "Today's Highlights",
    section_featured_deals_title: 'Featured Deals & Exclusive Promo Codes',
    view_all_offers: 'View All Offers',
    section_partner_retailers: 'Partner Retailers',
    section_top_stores_title: 'Top Stores with Verified Coupons',
    all_stores_directory: 'All Stores Directory',
    section_browse_departments: 'Browse Departments',
    section_popular_categories_title: 'Popular Shopping Categories',
    all_categories: 'All Categories',
    stores_available: 'Stores Available',
    section_editorial_insights: 'Editorial Insights',
    section_smart_guides_title: 'Smart Shopping Guides & Hacks',
    read_all_guides: 'Read All Guides',
    read_guide: 'Read Guide',
    min_read: 'min read',

    section_featured_coupons: 'Top Verified Promo Codes & Exclusive Offers',
    section_featured_coupons_sub: 'Hand-verified coupon codes saving shoppers the most right now',
    section_popular_stores: 'Trending Stores & Featured Retailers',
    section_popular_stores_sub: "Save instantly at today's most popular shopping destinations",
    section_categories: 'Shop Deals by Popular Categories',
    section_categories_sub: "Find verified promotional codes for whatever you're shopping for",
    section_guides: 'Expert Money-Saving Guides & Tips',
    section_guides_sub: 'Proven shopping strategies, insider discount hacks, and retail advice',
    section_reviews: 'In-Depth Store Reviews & Trust Ratings',
    section_reviews_sub: 'Real shopping experiences, policy breakdowns, and savings credibility',

    // Buttons, Badges & Labels
    btn_get_code: 'Get Code',
    btn_get_deal: 'Get Deal',
    btn_shop_now: 'Shop Now',
    btn_view_all: 'View All',
    btn_visit_store: 'Visit Store',
    badge_verified: 'Verified Today',
    badge_staff_pick: 'Staff Pick',
    badge_exclusive: 'Exclusive',
    badge_expiring: 'Expiring Soon',
    uses_today: 'uses today',
    success_rate: 'Success',
    code_copied: 'Code Copied!',
    copy_code: 'Copy Code',
    promo_code_badge: 'Promo Code',
    direct_deal_badge: 'Direct Deal',
    claim_offer: 'Claim Offer',
    automatic_at_checkout: 'Automatic at checkout',
    available_deals: 'Deals',

    // Newsletter
    newsletter_badge: 'STAY UPDATED',
    newsletter_title: 'Get Verified Deals Delivered Weekly',
    newsletter_desc: 'Join 50,000+ smart shoppers and receive our curated weekly digest of tested promo codes and price drops.',
    newsletter_placeholder: 'Enter your email address...',
    newsletter_btn: 'Subscribe Free',
    newsletter_privacy: 'Zero spam. Unsubscribe at any time with 1 click.',

    // Footer
    footer_tagline: 'Your premier destination for verified discount promo codes, daily sales, and exclusive merchant savings.',
    footer_quick_links: 'Quick Links',
    footer_categories: 'Categories',
    footer_stores: 'Popular Stores',
    footer_legal: 'Legal & Info',
    footer_terms: 'Terms & Conditions',
    footer_privacy: 'Privacy Policy',
    footer_rights: 'All rights reserved.',
    footer_trust_1_title: '100% Tested Daily',
    footer_trust_1_desc: 'Every coupon code is verified before listing to guarantee real savings at checkout.',
    footer_trust_2_title: 'Free & No Sign-Up Needed',
    footer_trust_2_desc: 'Instant 1-click access to discount codes and deals with zero registration hurdles.',
    footer_trust_3_title: 'Affiliate Transparency',
    footer_trust_3_desc: 'We partner with trusted retailers and may earn a commission when you redeem offers.',
    footer_promo_codes: 'Promo Codes',
    footer_free_shipping: 'Free Shipping Offers',
    footer_nike_codes: 'Nike Promo Codes',
    footer_amazon_deals: 'Amazon Deals',
    footer_sephora_coupons: 'Sephora Beauty Coupons',
  },

  de: {
    // Nav
    nav_coupons: 'Gutscheine',
    nav_stores: 'Geschäfte',
    nav_categories: 'Kategorien',
    nav_guides: 'Ratgeber',
    nav_reviews: 'Bewertungen',
    nav_about: 'Über uns',
    nav_contact: 'Kontakt',
    nav_admin: 'Admin',
    search_placeholder: 'Angebote suchen...',
    select_region: 'Region auswählen',

    // Hero
    hero_badge: 'GEPRÜFTE GUTSCHEINCODES & TAGESANGEBOTE',
    hero_title_1: 'Entfesseln Sie',
    hero_title_2: 'Intelligentere Ersparnisse.',
    hero_title_3: 'Jeden Tag.',
    hero_desc: 'Zugriff auf über 50.000 handgeprüfte Gutscheincodes, Rabattcoupons und exklusive Angebote von über 500 geprüften Top-Händlern.',
    hero_search_input: 'Geschäfte, Marken, Gutscheine suchen...',
    hero_btn_find: 'Angebote finden',
    hero_trending: 'Angesagt:',
    hero_floating_1: '25% RABATT auf alles',
    hero_floating_2: '40% RABATT',
    hero_floating_3: '15% RABATT + Gratis Versand',

    // Section Titles & Badges
    section_highlights_badge: 'Highlights des Tages',
    section_featured_deals_title: 'Ausgewählte Angebote & Exklusive Gutscheincodes',
    view_all_offers: 'Alle Angebote anzeigen',
    section_partner_retailers: 'Partner-Händler',
    section_top_stores_title: 'Top-Geschäfte mit geprüften Gutscheinen',
    all_stores_directory: 'Alle Geschäfte anzeigen',
    section_browse_departments: 'Kategorien durchstöbern',
    section_popular_categories_title: 'Beliebte Shopping-Kategorien',
    all_categories: 'Alle Kategorien',
    stores_available: 'Geschäfte verfügbar',
    section_editorial_insights: 'Experten-Tipps',
    section_smart_guides_title: 'Clevere Einkaufsratgeber & Spartipps',
    read_all_guides: 'Alle Ratgeber lesen',
    read_guide: 'Ratgeber lesen',
    min_read: 'Min. Lesezeit',

    section_featured_coupons: 'Top geprüfte Gutscheincodes & Exklusive Angebote',
    section_featured_coupons_sub: 'Handgeprüfte Gutscheine, mit denen Käufer aktuell am meisten sparen',
    section_popular_stores: 'Beliebte Geschäfte & Top-Händler',
    section_popular_stores_sub: 'Sparen Sie sofort bei den gefragtesten Shopping-Adressen',
    section_categories: 'Angebote nach beliebten Kategorien',
    section_categories_sub: 'Finden Sie geprüfte Rabattcodes für alles, was Sie einkaufen',
    section_guides: 'Spartipps & Einkaufsratgeber von Experten',
    section_guides_sub: 'Bewährte Einkaufsstrategien, Insider-Tricks und Spartipps',
    section_reviews: 'Detaillierte Shop-Bewertungen & Vertrauens-Scores',
    section_reviews_sub: 'Echte Einkaufserfahrungen, Rückgaberichtlinien und Sparvorteile',

    // Buttons, Badges & Labels
    btn_get_code: 'Code anzeigen',
    btn_get_deal: 'Angebot sichern',
    btn_shop_now: 'Jetzt einkaufen',
    btn_view_all: 'Alle anzeigen',
    btn_visit_store: 'Zum Geschäft',
    badge_verified: 'Heute geprüft',
    badge_staff_pick: 'Redaktionstipp',
    badge_exclusive: 'Exklusiv',
    badge_expiring: 'Läuft bald ab',
    uses_today: 'mal heute genutzt',
    success_rate: 'Erfolgsquote',
    code_copied: 'Code kopiert!',
    copy_code: 'Code kopieren',
    promo_code_badge: 'Gutscheincode',
    direct_deal_badge: 'Direkt-Angebot',
    claim_offer: 'Angebot sichern',
    automatic_at_checkout: 'Automatisch an der Kasse',
    available_deals: 'Angebote',

    // Newsletter
    newsletter_badge: 'AUF DEM LAUFENDEN BLEIBEN',
    newsletter_title: 'Geprüfte Angebote wöchentlich erhalten',
    newsletter_desc: 'Schließen Sie sich über 50.000 cleveren Käufern an und erhalten Sie wöchentlich getestete Gutscheincodes direkt ins Postfach.',
    newsletter_placeholder: 'E-Mail-Adresse eingeben...',
    newsletter_btn: 'Kostenlos abonnieren',
    newsletter_privacy: 'Kein Spam. Jederzeit mit einem Klick kündbar.',

    // Footer
    footer_tagline: 'Ihre beste Adresse für geprüfte Gutscheincodes, tägliche Rabatte und exklusive Händler-Angebote.',
    footer_quick_links: 'Schnellzugriff',
    footer_categories: 'Kategorien',
    footer_stores: 'Beliebte Shops',
    footer_legal: 'Rechtliches & Info',
    footer_terms: 'AGB',
    footer_privacy: 'Datenschutz',
    footer_rights: 'Alle Rechte vorbehalten.',
    footer_trust_1_title: 'Täglich zu 100% geprüft',
    footer_trust_1_desc: 'Jeder Gutscheincode wird vor der Veröffentlichung geprüft, um echte Rabatte zu garantieren.',
    footer_trust_2_title: 'Kostenlos & Ohne Anmeldung',
    footer_trust_2_desc: 'Direkter 1-Klick-Zugriff auf Rabattcodes und Angebote ohne lästige Registrierung.',
    footer_trust_3_title: 'Transparente Partnerschaften',
    footer_trust_3_desc: 'Wir kooperieren mit vertrauenswürdigen Händlern und erhalten eventuell eine Provision.',
    footer_promo_codes: 'Gutscheincodes',
    footer_free_shipping: 'Kostenloser Versand',
    footer_nike_codes: 'Nike Gutscheine',
    footer_amazon_deals: 'Amazon Angebote',
    footer_sephora_coupons: 'Sephora Beauty-Codes',
  },

  fr: {
    // Nav
    nav_coupons: 'Codes Promo',
    nav_stores: 'Boutiques',
    nav_categories: 'Catégories',
    nav_guides: 'Guides',
    nav_reviews: 'Avis',
    nav_about: 'À propos',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    search_placeholder: 'Rechercher des offres...',
    select_region: 'Sélectionner la région',

    // Hero
    hero_badge: 'CODES PROMO VÉRIFIÉS & BONS PLANS DU JOUR',
    hero_title_1: 'Débloquez des',
    hero_title_2: 'Économies Intelligentes.',
    hero_title_3: 'Chaque Jour.',
    hero_desc: 'Accédez à plus de 50 000 codes promo testés à la main, bons de réduction et remises exclusives auprès de plus de 500 grandes boutiques vérifiées.',
    hero_search_input: 'Rechercher magasins, marques, codes...',
    hero_btn_find: 'Trouver des offres',
    hero_trending: 'Tendances :',
    hero_floating_1: '25% DE RÉDUCTION sur tout',
    hero_floating_2: '40% DE RÉDUCTION',
    hero_floating_3: '15% DE RÉDUCTION + Livraison Gratuite',

    // Section Titles & Badges
    section_highlights_badge: 'Points forts du jour',
    section_featured_deals_title: 'Bons plans du moment & Codes promo exclusifs',
    view_all_offers: 'Voir toutes les offres',
    section_partner_retailers: 'Boutiques partenaires',
    section_top_stores_title: 'Meilleures boutiques avec codes promo vérifiés',
    all_stores_directory: 'Annuaire des boutiques',
    section_browse_departments: 'Parcourir les rayons',
    section_popular_categories_title: "Catégories d'achats populaires",
    all_categories: 'Toutes les catégories',
    stores_available: 'Boutiques disponibles',
    section_editorial_insights: 'Conseils de la rédaction',
    section_smart_guides_title: "Guides d'achat malins & Astuces d'économies",
    read_all_guides: 'Lire tous les guides',
    read_guide: 'Lire le guide',
    min_read: 'min de lecture',

    section_featured_coupons: 'Top Codes Promo Vérifiés & Offres Exclusives',
    section_featured_coupons_sub: 'Codes promo vérifiés à la main qui permettent aux acheteurs de faire les plus grandes économies',
    section_popular_stores: 'Boutiques Tendance & Grandes Enseignes',
    section_popular_stores_sub: 'Économisez immédiatement auprès des destinations shopping les plus prisées',
    section_categories: 'Bons Plans par Catégories Populaires',
    section_categories_sub: 'Trouvez des codes de réduction vérifiés pour tous vos achats',
    section_guides: "Guides d'Experts & Astuces pour Économiser",
    section_guides_sub: "Stratégies d'achat éprouvées, secrets de réduction et conseils shopping",
    section_reviews: 'Avis Détaillés sur les Boutiques & Indices de Confiance',
    section_reviews_sub: 'Vraies expériences clients, analyse des politiques et fiabilité des réductions',

    // Buttons, Badges & Labels
    btn_get_code: 'Voir le code',
    btn_get_deal: "Voir l'offre",
    btn_shop_now: 'Acheter maintenant',
    btn_view_all: 'Tout afficher',
    btn_visit_store: 'Visiter la boutique',
    badge_verified: 'Vérifié aujourd’hui',
    badge_staff_pick: 'Coup de cœur',
    badge_exclusive: 'Exclusif',
    badge_expiring: 'Expire bientôt',
    uses_today: 'utilisations aujourd’hui',
    success_rate: 'Taux de réussite',
    code_copied: 'Code copié !',
    copy_code: 'Copier le code',
    promo_code_badge: 'Code Promo',
    direct_deal_badge: 'Offre Directe',
    claim_offer: "Profiter de l'offre",
    automatic_at_checkout: 'Automatique au panier',
    available_deals: 'Offres',

    // Newsletter
    newsletter_badge: 'RESTEZ INFORMÉ',
    newsletter_title: 'Recevez les offres vérifiées chaque semaine',
    newsletter_desc: 'Rejoignez plus de 50 000 acheteurs malins et recevez notre sélection hebdomadaire de codes promo testés et baisses de prix.',
    newsletter_placeholder: 'Entrez votre adresse email...',
    newsletter_btn: "S'inscrire gratuitement",
    newsletter_privacy: 'Zéro spam. Désabonnement en 1 clic à tout moment.',

    // Footer
    footer_tagline: 'Votre référence pour les codes promo vérifiés, réductions quotidiennes et remises marchandes exclusives.',
    footer_quick_links: 'Accès Rapide',
    footer_categories: 'Catégories',
    footer_stores: 'Boutiques Populaires',
    footer_legal: 'Mentions Légales & Infos',
    footer_terms: 'Conditions Générales',
    footer_privacy: 'Politique de Confidentialité',
    footer_rights: 'Tous droits réservés.',
    footer_trust_1_title: '100% Testé Quotidiennement',
    footer_trust_1_desc: 'Chaque code promo est vérifié manuellement pour garantir de vraies économies au panier.',
    footer_trust_2_title: 'Gratuit & Sans Inscription',
    footer_trust_2_desc: 'Accès immédiat en 1 clic aux codes de réduction sans aucune inscription requise.',
    footer_trust_3_title: 'Transparence d’Affiliation',
    footer_trust_3_desc: 'Nous collaborons avec des marchands réputés et pouvons percevoir une commission.',
    footer_promo_codes: 'Codes Promo',
    footer_free_shipping: 'Livraison Gratuite',
    footer_nike_codes: 'Codes Promo Nike',
    footer_amazon_deals: 'Bons Plans Amazon',
    footer_sephora_coupons: 'Codes Réduction Sephora',
  },

  it: {
    // Nav
    nav_coupons: 'Coupon',
    nav_stores: 'Negozi',
    nav_categories: 'Categorie',
    nav_guides: 'Guide',
    nav_reviews: 'Recensioni',
    nav_about: 'Chi siamo',
    nav_contact: 'Contatto',
    nav_admin: 'Admin',
    search_placeholder: 'Cerca offerte...',
    select_region: 'Seleziona Regione',

    // Hero
    hero_badge: 'CODICI PROMOZIONALI VERIFICATI & OFFERTE DEL GIORNO',
    hero_title_1: 'Sblocca',
    hero_title_2: 'Risparmi Più Intelligenti.',
    hero_title_3: 'Ogni Giorno.',
    hero_desc: 'Accedi a oltre 50.000 codici promozionali testati a mano, voucher di sconto e offerte esclusive dei migliori 500+ negozi verificati.',
    hero_search_input: 'Cerca negozi, marchi, codici...',
    hero_btn_find: 'Trova Offerte',
    hero_trending: 'Di tendenza:',
    hero_floating_1: '25% DI SCONTO su tutto',
    hero_floating_2: '40% DI SCONTO',
    hero_floating_3: '15% DI SCONTO + Spedizione Gratuita',

    // Section Titles & Badges
    section_highlights_badge: 'In primo piano oggi',
    section_featured_deals_title: 'Offerte in primo piano e codici promozionali esclusivi',
    view_all_offers: 'Vedi tutte le offerte',
    section_partner_retailers: 'Negozi partner',
    section_top_stores_title: 'I migliori negozi con coupon verificati',
    all_stores_directory: 'Elenco completo negozi',
    section_browse_departments: 'Esplora i reparti',
    section_popular_categories_title: 'Categorie di shopping popolari',
    all_categories: 'Tutte le categorie',
    stores_available: 'Negozi disponibili',
    section_editorial_insights: 'Approfondimenti editoriali',
    section_smart_guides_title: 'Guide allo shopping intelligente e trucchi',
    read_all_guides: 'Leggi tutte le guide',
    read_guide: 'Leggi la guida',
    min_read: 'min di lettura',

    section_featured_coupons: 'Top Codici Sconto Verificati & Offerte Esclusive',
    section_featured_coupons_sub: 'Coupon verificati a mano con cui i clienti risparmiano di più in questo momento',
    section_popular_stores: 'Negozi di Tendenza & Grandi Marchi',
    section_popular_stores_sub: 'Risparmia immediatamente nelle mete di shopping più gettonate',
    section_categories: 'Acquista Offerte per Categoria',
    section_categories_sub: 'Trova codici promozionali verificati per ogni tuo acquisto',
    section_guides: 'Guide di Risparmio & Consigli dagli Esperti',
    section_guides_sub: 'Strategie di spesa testate, trucchi di sconto e consigli di shopping',
    section_reviews: 'Recensioni Dettagliate dei Negozi & Indice di Affidabilità',
    section_reviews_sub: 'Vere esperienze di acquisto, analisi delle condizioni e credibilità dei risparmi',

    // Buttons, Badges & Labels
    btn_get_code: 'Mostra Codice',
    btn_get_deal: "Attiva Offerta",
    btn_shop_now: 'Acquista Ora',
    btn_view_all: 'Vedi Tutti',
    btn_visit_store: 'Visita Negozio',
    badge_verified: 'Verificato oggi',
    badge_staff_pick: 'Consigliato',
    badge_exclusive: 'Esclusivo',
    badge_expiring: 'In scadenza',
    uses_today: 'volte usato oggi',
    success_rate: 'Tasso di successo',
    code_copied: 'Codice copiato!',
    copy_code: 'Copia codice',
    promo_code_badge: 'Codice Promo',
    direct_deal_badge: 'Offerta Diretta',
    claim_offer: "Attiva offerta",
    automatic_at_checkout: 'Automatico alla cassa',
    available_deals: 'Offerte',

    // Newsletter
    newsletter_badge: 'RESTA AGGIORNATO',
    newsletter_title: 'Ricevi offerte verificate ogni settimana',
    newsletter_desc: 'Unisciti a oltre 50.000 acquirenti smart e ricevi la nostra rassegna settimanale di codici promozionali testati e sconti.',
    newsletter_placeholder: 'Inserisci la tua email...',
    newsletter_btn: 'Iscriviti gratis',
    newsletter_privacy: 'Zero spam. Cancellati in qualsiasi momento con un clic.',

    // Footer
    footer_tagline: 'La tua destinazione principale per codici promozionali verificati, saldi giornalieri e sconti esclusivi.',
    footer_quick_links: 'Link Rapidi',
    footer_categories: 'Categorie',
    footer_stores: 'Negozi Popolari',
    footer_legal: 'Legale & Info',
    footer_terms: 'Termini & Condizioni',
    footer_privacy: 'Informativa sulla Privacy',
    footer_rights: 'Tutti i diritti riservati.',
    footer_trust_1_title: 'Testato al 100% ogni giorno',
    footer_trust_1_desc: 'Ogni codice promozionale viene verificato prima della pubblicazione.',
    footer_trust_2_title: 'Gratuito & Senza Registrazione',
    footer_trust_2_desc: 'Accesso immediato con 1 clic a codici sconto e offerte senza alcuna iscrizione.',
    footer_trust_3_title: 'Trasparenza di Affiliazione',
    footer_trust_3_desc: 'Collaboriamo con rivenditori affidabili e potremmo ricevere una commissione.',
    footer_promo_codes: 'Codici Promo',
    footer_free_shipping: 'Spedizione Gratuita',
    footer_nike_codes: 'Codici Promo Nike',
    footer_amazon_deals: 'Offerte Amazon',
    footer_sephora_coupons: 'Coupon Bellezza Sephora',
  },

  nl: {
    // Nav
    nav_coupons: 'Kortingscodes',
    nav_stores: 'Winkels',
    nav_categories: 'Categorieën',
    nav_guides: 'Koopgidsen',
    nav_reviews: 'Beoordelingen',
    nav_about: 'Over ons',
    nav_contact: 'Contact',
    nav_admin: 'Admin',
    search_placeholder: 'Zoek deals...',
    select_region: 'Selecteer Regio',

    // Hero
    hero_badge: 'GEVERIFIEERDE KORTINGSCODES & DAGELIJKSE DEALS',
    hero_title_1: 'Ontdek',
    hero_title_2: 'Slimmer Besparen.',
    hero_title_3: 'Elke Dag.',
    hero_desc: 'Toegang tot meer dan 50.000 handmatig geteste kortingscodes, coupons en exclusieve kortingen bij 500+ geverifieerde topwinkels.',
    hero_search_input: 'Zoek winkels, merken, codes...',
    hero_btn_find: 'Vind Deals',
    hero_trending: 'Populair:',
    hero_floating_1: '25% KORTING op alles',
    hero_floating_2: '40% KORTING',
    hero_floating_3: '15% KORTING + Gratis Verzending',

    // Section Titles & Badges
    section_highlights_badge: 'Hoogtepunten van vandaag',
    section_featured_deals_title: 'Aanbevolen deals & Exclusieve kortingscodes',
    view_all_offers: 'Bekijk alle deals',
    section_partner_retailers: 'Partnerwinkels',
    section_top_stores_title: 'Topwinkels met geverifieerde kortingscodes',
    all_stores_directory: 'Overzicht van alle winkels',
    section_browse_departments: 'Blader door categorieën',
    section_popular_categories_title: 'Populaire winkelcategorieën',
    all_categories: 'Alle categorieën',
    stores_available: 'Winkels beschikbaar',
    section_editorial_insights: 'Redactionele tips',
    section_smart_guides_title: 'Slimme winkelgidsen & Bespaartips',
    read_all_guides: 'Lees alle gidsen',
    read_guide: 'Lees gids',
    min_read: 'min leestijd',

    section_featured_coupons: 'Top Geverifieerde Kortingscodes & Exclusieve Deals',
    section_featured_coupons_sub: 'Handmatig gecontroleerde kortingscodes waarmee u direct maximaal bespaart',
    section_popular_stores: 'Populaire Winkels & Top Merken',
    section_popular_stores_sub: 'Bespaar direct bij de meest favoriete online webshops',
    section_categories: 'Kortingen per Categorie',
    section_categories_sub: 'Vind geteste actiecodes voor alles wat u wilt aanschaffen',
    section_guides: 'Bespaartips & Deskundige Koopgidsen',
    section_guides_sub: 'Bewezen winkelstrategieën, insider-kortingshacks en aankoopadvies',
    section_reviews: 'Uitgebreide Winkelbeoordelingen & Betrouwbaarheid',
    section_reviews_sub: 'Echte winkelervaringen, voorwaarden en kortingsbetrouwbaarheid',

    // Buttons, Badges & Labels
    btn_get_code: 'Bekijk Code',
    btn_get_deal: 'Pak Aanbieding',
    btn_shop_now: 'Nu Winkelen',
    btn_view_all: 'Bekijk Alles',
    btn_visit_store: 'Naar de Winkel',
    badge_verified: 'Vandaag gecontroleerd',
    badge_staff_pick: 'Aanrader',
    badge_exclusive: 'Exclusief',
    badge_expiring: 'Verloopt binnenkort',
    uses_today: 'keer gebruikt vandaag',
    success_rate: 'Succespercentage',
    code_copied: 'Code gekopieerd!',
    copy_code: 'Code kopiëren',
    promo_code_badge: 'Kortingscode',
    direct_deal_badge: 'Directe Deal',
    claim_offer: 'Pak aanbieding',
    automatic_at_checkout: 'Automatisch bij afrekenen',
    available_deals: 'Deals',

    // Newsletter
    newsletter_badge: 'BLIJF OP DE HOOGTE',
    newsletter_title: 'Ontvang wekelijks geteste kortingen',
    newsletter_desc: 'Meld u aan met 50.000+ slimme shoppers en ontvang onze wekelijkse selectie van geteste kortingscodes en prijsdalingen.',
    newsletter_placeholder: 'Vul uw e-mailadres in...',
    newsletter_btn: 'Gratis aanmelden',
    newsletter_privacy: 'Geen spam. Uitschrijven kan op elk moment met 1 klik.',

    // Footer
    footer_tagline: 'Uw betrouwbare bron voor geteste kortingscodes, dagelijkse deals en exclusieve aanbiedingen.',
    footer_quick_links: 'Snelle Links',
    footer_categories: 'Categorieën',
    footer_stores: 'Populaire Winkels',
    footer_legal: 'Juridisch & Info',
    footer_terms: 'Algemene Voorwaarden',
    footer_privacy: 'Privacybeleid',
    footer_rights: 'Alle rechten voorbehouden.',
    footer_trust_1_title: '100% Dagelijks Getest',
    footer_trust_1_desc: 'Elke kortingscode wordt vooraf getest om echte besparingen te garanderen.',
    footer_trust_2_title: 'Gratis & Zonder Registratie',
    footer_trust_2_desc: 'Direct met 1 klik toegang tot actiecodes zonder aanmeldingsverplichting.',
    footer_trust_3_title: 'Affiliate Transparantie',
    footer_trust_3_desc: 'Wij werken samen met betrouwbare winkels en kunnen een commissie ontvangen.',
    footer_promo_codes: 'Kortingscodes',
    footer_free_shipping: 'Gratis Verzending',
    footer_nike_codes: 'Nike Kortingscodes',
    footer_amazon_deals: 'Amazon Aanbiedingen',
    footer_sephora_coupons: 'Sephora Beauty Coupons',
  },
};

export function getTranslation(locale: string, key: string, fallback?: string): string {
  const loc = (locale as Locale) in TRANSLATIONS ? (locale as Locale) : 'en';
  return TRANSLATIONS[loc]?.[key] || TRANSLATIONS.en[key] || fallback || key;
}

// Localized deal titles dictionary
const LOCALIZED_DEAL_TITLES: Record<string, Record<Locale, string>> = {
  '71% OFF 2-Year Plan + 3 Extra Months Free': {
    en: '71% OFF 2-Year Plan + 3 Extra Months Free',
    de: '71% Rabatt auf den 2-Jahres-Plan + 3 Gratismonate',
    fr: '71% de réduction sur le forfait 2 ans + 3 mois offerts',
    it: '71% di sconto sul piano di 2 anni + 3 mesi extra gratis',
    nl: '71% korting op 2-jarig abonnement + 3 extra maanden gratis',
  },
  'Free 8-Piece Luxury Skincare Sample Bag with $45+ Order': {
    en: 'Free 8-Piece Luxury Skincare Sample Bag with $45+ Order',
    de: 'Kostenlose 8-teilige Luxus-Hautpflegetasche ab 45$ Einkaufswert',
    fr: "Trousse de 8 échantillons de soins de luxe offerte dès 45$ d'achat",
    it: 'Borsa di 8 campioni di cura della pelle di lusso in omaggio con 45$+',
    nl: 'Gratis 8-delige luxe huidverzorgingsset bij besteding vanaf 45$',
  },
  '$100 OFF Select Laptops & MacBooks': {
    en: '$100 OFF Select Laptops & MacBooks',
    de: '100$ Rabatt auf ausgewählte Laptops & MacBooks',
    fr: '100$ de réduction sur une sélection de PC portables & MacBooks',
    it: '100$ di sconto su laptop e MacBook selezionati',
    nl: '100$ korting op geselecteerde laptops & MacBooks',
  },
  '20% OFF First Order with ASOS App': {
    en: '20% OFF First Order with ASOS App',
    de: '20% Rabatt auf die erste Bestellung mit der ASOS-App',
    fr: '20% de réduction sur la 1ère commande avec l’application ASOS',
    it: '20% di sconto sul primo ordine con l’app ASOS',
    nl: '20% korting op de eerste bestelling met de ASOS-app',
  },
  '$15 OFF First Amazon App Order of $30+': {
    en: '$15 OFF First Amazon App Order of $30+',
    de: '15$ Rabatt auf die erste Amazon-App-Bestellung ab 30$',
    fr: '15$ de réduction dès 30$ d’achat sur la 1ère commande Amazon App',
    it: '15$ di sconto sul primo ordine Amazon App da 30$+',
    nl: '15$ korting op de eerste Amazon App bestelling vanaf 30$',
  },
  'Up to 50% OFF Daily Lightning Deals': {
    en: 'Up to 50% OFF Daily Lightning Deals',
    de: 'Bis zu 50% Rabatt auf tägliche Blitzangebote',
    fr: "Jusqu'à 50% de réduction sur les ventes flash du jour",
    it: 'Fino al 50% di sconto sulle offerte lampo del giorno',
    nl: 'Tot 50% korting op dagelijkse bliksemdeals',
  },
  '30% OFF Summer Styles & Sneakers': {
    en: '30% OFF Summer Styles & Sneakers',
    de: '30% Rabatt auf Sommer-Trends & Sneaker',
    fr: "30% de réduction sur les styles d'été et les baskets",
    it: '30% di sconto su stili estivi e sneaker',
    nl: '30% korting op zomerse stijlen & sneakers',
  },
  'Up to 50% OFF Daily Deals & Best Sellers': {
    en: 'Up to 50% OFF Daily Deals & Best Sellers',
    de: 'Bis zu 50% Rabatt auf Tagesangebote & Bestseller',
    fr: "Jusqu'à 50% de réduction sur les offres du jour et best-sellers",
    it: 'Fino al 50% di sconto su offerte del giorno e bestseller',
    nl: 'Tot 50% korting op dagaanbiedingen & bestsellers',
  },
  '40% OFF Sitewide Friends & Family Sale': {
    en: '40% OFF Sitewide Friends & Family Sale',
    de: '40% Rabatt auf alles — Freunde & Familie Sale',
    fr: '40% de réduction sur tout le site — Vente Privée',
    it: '40% di sconto su tutto il sito — Saldi Amici & Famiglia',
    nl: '40% korting op de hele site — Vrienden & Familie Sale',
  },
};

export function getLocalizedDealTitle(title: string, locale: Locale): string {
  if (!title) return '';
  const normalized = title.replace(/[’']/g, "'").toLowerCase().trim();
  for (const [key, mapping] of Object.entries(LOCALIZED_DEAL_TITLES)) {
    if (key.replace(/[’']/g, "'").toLowerCase().trim() === normalized) {
      return mapping[locale] || mapping.en || title;
    }
  }
  return title;
}

// Localized discount badges
const LOCALIZED_DISCOUNTS: Record<string, Record<Locale, string>> = {
  'Free Gift': {
    en: 'Free Gift',
    de: 'Gratis-Geschenk',
    fr: 'Cadeau Offert',
    it: 'Regalo Gratis',
    nl: 'Gratis Cadeau',
  },
  'Up to 50% OFF': {
    en: 'Up to 50% OFF',
    de: 'Bis zu 50% Rabatt',
    fr: "Jusqu'à 50% Offert",
    it: 'Fino al 50% Sconto',
    nl: 'Tot 50% Korting',
  },
  '71% OFF': {
    en: '71% OFF',
    de: '71% Rabatt',
    fr: '71% de Réduction',
    it: '71% di Sconto',
    nl: '71% Korting',
  },
  '$100 OFF': {
    en: '$100 OFF',
    de: '100$ Rabatt',
    fr: '100$ de Réduction',
    it: '100$ di Sconto',
    nl: '100$ Korting',
  },
  '20% OFF': {
    en: '20% OFF',
    de: '20% Rabatt',
    fr: '20% de Réduction',
    it: '20% di Sconto',
    nl: '20% Korting',
  },
  '$15 OFF': {
    en: '$15 OFF',
    de: '15$ Rabatt',
    fr: '15$ de Réduction',
    it: '15$ di Sconto',
    nl: '15$ Korting',
  },
};

export function getLocalizedDiscountValue(discount: string, locale: Locale): string {
  if (!discount) return '';
  const trimmed = discount.trim();
  if (LOCALIZED_DISCOUNTS[trimmed] && LOCALIZED_DISCOUNTS[trimmed][locale]) {
    return LOCALIZED_DISCOUNTS[trimmed][locale];
  }
  return discount;
}

// Localized category names
const LOCALIZED_CATEGORIES: Record<string, Record<Locale, string>> = {
  'Fashion & Apparel': {
    en: 'Fashion & Apparel',
    de: 'Mode & Kleidung',
    fr: 'Mode & Vêtements',
    it: 'Moda & Abbigliamento',
    nl: 'Mode & Kleding',
  },
  'Electronics & Computers': {
    en: 'Electronics & Computers',
    de: 'Elektronik & Computer',
    fr: 'Électronique & Informatique',
    it: 'Elettronica & Computer',
    nl: 'Elektronica & Computers',
  },
  'Electronics & Tech': {
    en: 'Electronics & Tech',
    de: 'Elektronik & Technik',
    fr: 'Électronique & High-Tech',
    it: 'Elettronica & Tech',
    nl: 'Elektronica & Tech',
  },
  'Beauty & Skincare': {
    en: 'Beauty & Skincare',
    de: 'Schönheit & Hautpflege',
    fr: 'Beauté & Soins',
    it: 'Bellezza & Cura della Pelle',
    nl: 'Schoonheid & Huidverzorging',
  },
  'Health & Beauty': {
    en: 'Health & Beauty',
    de: 'Gesundheit & Schönheit',
    fr: 'Beauté & Santé',
    it: 'Salute & Bellezza',
    nl: 'Gezondheid & Schoonheid',
  },
  'Home & Garden': {
    en: 'Home & Garden',
    de: 'Haus & Garten',
    fr: 'Maison & Jardin',
    it: 'Casa & Giardino',
    nl: 'Huis & Tuin',
  },
  'Travel & Flights': {
    en: 'Travel & Flights',
    de: 'Reisen & Flüge',
    fr: 'Voyages & Vols',
    it: 'Viaggi & Voli',
    nl: 'Reizen & Vluchten',
  },
  'Travel & Vacations': {
    en: 'Travel & Vacations',
    de: 'Reisen & Urlaub',
    fr: 'Voyages & Vacances',
    it: 'Viaggi & Vacanze',
    nl: 'Reizen & Vakanties',
  },
  'Sports & Outdoors': {
    en: 'Sports & Outdoors',
    de: 'Sport & Outdoor',
    fr: 'Sports & Plein Air',
    it: 'Sport & Tempo Libero',
    nl: 'Sport & Buitenactiviteiten',
  },
  'Food & Dining': {
    en: 'Food & Dining',
    de: 'Essen & Gastronomie',
    fr: 'Alimentation & Restaurants',
    it: 'Cibo & Ristorazione',
    nl: 'Eten & Drinken',
  },
};

export function getLocalizedCategoryName(name: string, locale: Locale): string {
  if (!name) return '';
  const trimmed = name.toLowerCase().trim();
  for (const [key, mapping] of Object.entries(LOCALIZED_CATEGORIES)) {
    if (key.toLowerCase().trim() === trimmed) {
      return mapping[locale] || mapping.en || name;
    }
  }
  return name;
}

// Localized blog titles
const LOCALIZED_BLOG_TITLES: Record<string, Record<Locale, string>> = {
  "Best Summer Sales & Coupon Stacking Strategies You Shouldn't Miss": {
    en: "Best Summer Sales & Coupon Stacking Strategies You Shouldn't Miss",
    de: 'Beste Sommerschlussverkäufe & Gutschein-Stacking-Strategien',
    fr: 'Meilleurs soldes d’été et astuces pour cumuler les codes promo',
    it: 'I migliori saldi estivi e strategie per cumulare coupon',
    nl: 'Beste zomersolden en strategieën om kortingscodes te combineren',
  },
  '10 Ways to Save More Online Shopping in 2026': {
    en: '10 Ways to Save More Online Shopping in 2026',
    de: '10 Wege, um 2026 beim Online-Shopping mehr zu sparen',
    fr: '10 façons d’économiser plus lors de vos achats en ligne en 2026',
    it: '10 modi per risparmiare di più sullo shopping online nel 2026',
    nl: '10 manieren om meer te besparen bij online winkelen in 2026',
  },
};

export function getLocalizedBlogTitle(title: string, locale: Locale): string {
  if (!title) return '';
  const normalized = title.replace(/[’']/g, "'").toLowerCase().trim();
  for (const [key, mapping] of Object.entries(LOCALIZED_BLOG_TITLES)) {
    if (key.replace(/[’']/g, "'").toLowerCase().trim() === normalized) {
      return mapping[locale] || mapping.en || title;
    }
  }
  return title;
}

