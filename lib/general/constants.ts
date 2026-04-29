export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://www.moisis-flower-design.gr";

export const BUSINESS = {
  name: "MΩISIS Flower Design",
  tagline: "Curated floral compositions — Defined by quality & detail",
  owner: "Χάρης (Harris) / Μωυσής (Moisis)",
  address: {
    street: "Λεωφ. Δημοκρατίας 86",
    city: "Ηλιούπολη",
    zip: "163 44",
    full: "Λεωφ. Δημοκρατίας 86, Ηλιούπολη 163 44",
  },
  phone: "21 0975 2161",
  phoneHref: "tel:+302109752161",
  whatsapp: "306947876166",
  email: "moisisflowerdesign@gmail.com",
  wolt: "https://wolt.com/en/grc/athens/venue/misis-flower-design",
  socials: {
    facebook: "https://www.facebook.com/p/Moisis-flower-design-61562042782828/",
    instagram: "https://www.instagram.com/moisis_flower_design/",
    tiktok: "https://www.tiktok.com/@harris_moisis",
  },
  hours: {
    weekdays: { open: "09:00", close: "22:00" },
    saturday: { open: "09:00", close: "22:00" },
    sunday: { open: "10:00", close: "21:00" },
  },
  googleMapsLink: "https://maps.app.goo.gl/kmyEjX8qJb37WkbDA",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.5!2d23.75!3d37.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd40b8c7c22b%3A0x6f8d6f1e5c9c4a2e!2sMoisis%20Flower%20Design!5e0!3m2!1sel!2sgr",
  googlePlaceId: "ChIJrz4AnOy9oRQRyuTxdbJMarY",
} as const;

export const OCCASIONS = [
  { slug: "anniversary" },
  { slug: "birthday" },
  { slug: "birth" },
  { slug: "graduation" },
  { slug: "housewarming" },
  { slug: "condolence" },
] as const;

export const EVENTS = [
  { slug: "wedding" },
  { slug: "christening" },
  { slug: "events" },
] as const;

export const PRODUCTS = [
  {
    slug: "bouquets",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/679c9e30ebb3c49b30a13d01/f6664d2c-e48a-11ef-b281-f6018ce86b75__78__1_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/an--2",
  },
  {
    slug: "forever-roses",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/3a8c6d68-e483-11ef-b9ff-729e4bd91afd__01.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/forever-roses-4",
  },
  {
    slug: "rose-bear",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/1f305f5a-dfc6-11ef-b4bc-ded1331bed25_shopping__6_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/rose-bear-5",
  },
  {
    slug: "ecuador-roses",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/8c33474e-e489-11ef-9953-4af01833deda_download_photoroom.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-6",
  },
  {
    slug: "flowers",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/f8144e2c-e489-11ef-b3d7-6672409bad5d________________________scaled_photoroom.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-7",
  },
  {
    slug: "orchids",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/80b75132-e48c-11ef-a6f8-86ff89ed18d2_photoroom_20220207_141813_1200x1200_photoroom.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/e-8",
  },
  {
    slug: "indoor-plants",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/2c9f53a2-e48b-11ef-8b14-060df75199c5_images_photoroom__1_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/a-y-9",
  },
  {
    slug: "cacti-succulents",
    image: "https://imageproxy.wolt.com/assets/68de3b37d82091e41c7cc92e?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/a-y-10",
  },
  {
    slug: "dried-flowers",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/a8cfc622-e48c-11ef-a308-9a26e2de99a4_download_photoroom__21_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-11",
  },
  {
    slug: "lucky-bamboo",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/5458f6ba-e48a-11ef-aa29-3ae16ab65deb_download_photoroom__7_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/lucky-bamboo-12",
  },
  {
    slug: "drinks",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/dc12a95a-e932-11ef-9376-b2186e83c9a5_moet_brut_600x600_1_photoroom.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-13",
  },
  {
    slug: "packaging",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/679c9e30ebb3c49b30a13d01/9a24ad46-e490-11ef-8e5a-2a99fa805cb1__63.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/i-14",
  },
  {
    slug: "bonsai",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/12bfbbec-e48c-11ef-a61b-6e8d05cc1269_download_photoroom__15_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-16",
  },
  {
    slug: "mixed-bouquets",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/679c9e30ebb3c49b30a13d01/86b68108-fb56-11ef-946f-024484f0f83a_0_photoroom__18_.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-17",
  },
  {
    slug: "arrangements",
    image:
      "https://imageproxy.wolt.com/menu/menu-images/shared/14930000-e87e-11ef-b971-4a5df705dfc1_8b350708_da2e_11ee_8aaa_ded6a304a82f_030.jpg?w=600",
    href: "/en/grc/athens/venue/misis-flower-design/items/menucategory-18",
  },
] as const;

export const REVIEWS = [
  {
    name: "Typical Lex",
    rating: 5,
    timeAgo: "1 year ago",
    text: "My husband gets me the most BEAUTIFUL flowers from here 1-2 times a month and they NEVER disappoint!! They are always fresh and last for literal weeks. Harris is a creative genius with his bouquet designs, and I'm wowed every. single. time.",
    lang: "en",
  },
  {
    name: "G full on",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Έκανα τον γάμο μου με στολισμό από το Moisis Flower και πραγματικά ήταν όνειρο! Όλα ήταν προσεγμένα μέχρι την τελευταία λεπτομέρεια — μοναδικές συνθέσεις, φίνα…",
    lang: "el",
  },
  {
    name: "Αλεξάνδρα Στίγκα",
    rating: 5,
    timeAgo: "5 months ago",
    text: "Η ποιότητα, η ποικιλία αλλά και η ομορφιά των δημιουργιών αυτού του ανθοπωλείου ειλικρινά δεν συναντάται εύκολα. Είναι κοσμήμα για την περιοχή.",
    lang: "el",
  },
  {
    name: "Μαρθα Μακ",
    rating: 5,
    timeAgo: "5 months ago",
    text: "Εμπιστευτήκαμε το Χάρη για το στολισμό του γάμου μας. Ότι και να πω είναι λίγο! Ήταν όλα πολύ καλύτερα απ'ότι μπορούσαμε να φανταστούμε.",
    lang: "el",
  },
  {
    name: "stavroula haldoupi",
    rating: 5,
    timeAgo: "3 months ago",
    text: "Είχα καιρό να μπω σε τόσο όμορφο, περιποιημένο και γεμάτο επιλογές ανθοπωλείο! Επιχείρηση με σύγχρονη και νεανική ματιά!",
    lang: "el",
  },
  {
    name: "βασια μπουρ",
    rating: 5,
    timeAgo: "6 months ago",
    text: "Ότι ανθοδέσμες έχω πάρει, είναι πάντα προσεγμένες και τα λουλούδια φρέσκα, κρατάνε πολλές μέρες. Εξυπηρέτηση πάντα άψογη!!!",
    lang: "el",
  },
  {
    name: "A G",
    rating: 5,
    timeAgo: "1 year ago",
    text: "Ίσως το ομορφότερο Flower design shop που υπάρχει σήμερα στην περιοχή της Ηλιούπολης.",
    lang: "el",
  },
  {
    name: "anna papoydh",
    rating: 5,
    timeAgo: "1 year ago",
    text: "Εξαιρετική εξυπηρέτηση! Πολύ καλές τιμές όμορφο περιβάλλον!! Τα τριαντάφυλλα έχουν μεγάλη διάρκεια!",
    lang: "el",
  },
  {
    name: "Έλενα Δημοβασίλη",
    rating: 5,
    timeAgo: "8 months ago",
    text: "Ο Χάρης ανέλαβε τον στολισμό του γάμου μας! Έδειξε πάρα πολλή προσοχή στη λεπτομέρεια και το αποτέλεσμα ήταν θεαματικό.",
    lang: "el",
  },
  {
    name: "Eleni K",
    rating: 5,
    timeAgo: "2 months ago",
    text: "Ένα υπέροχο ανθοπωλείο-έκπληξη! Ωραία άνθη, συνθέσεις, μεγάλη ποικιλία σε κασπώ, ευγενική και καλοσυνάτη υπάλληλος.",
    lang: "el",
  },
] as const;

/** Greek national & religious holidays — key format: "D/M" */
export const GREEK_HOLIDAYS: Record<string, { el: string; en: string }> = {
  "1/1": { el: "Πρωτοχρονιά", en: "New Year's Day" },
  "6/1": { el: "Θεοφάνεια", en: "Epiphany" },
  "14/2": { el: "Αγίου Βαλεντίνου", en: "Valentine's Day" },
  "8/3": { el: "Παγκόσμια Ημέρα Γυναίκας", en: "International Women's Day" },
  "25/3": { el: "Εθνική Επέτειος 1821", en: "Greek Independence Day" },
  "1/5": { el: "Πρωτομαγιά", en: "May Day" },
  "15/8": { el: "Κοίμηση της Θεοτόκου", en: "Assumption of Mary" },
  "28/10": { el: "Ημέρα του ΟΧΙ", en: "Ohi Day" },
  "25/12": { el: "Χριστούγεννα", en: "Christmas Day" },
  "26/12": { el: "Σύναξη Θεοτόκου", en: "Synaxis of Theotokos" },
  "14/9": { el: "Ύψωση Τιμίου Σταυρού", en: "Exaltation of the Holy Cross" },
};
