export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://moisisflowerdesign.gr";

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
  email: "moisisflowersdesign@gmail.com",
  wolt: "https://wolt.com/en/grc/athens/venue/misis-flower-design",
  socials: {
    facebook: "https://www.facebook.com/p/Moisis-flower-design-61562042782828/",
    instagram: "https://www.instagram.com/moisis_flower_design/",
    tiktok: "https://www.tiktok.com/@harris_moisis",
  },
  hours: {
    weekdays: { open: "09:00", close: "22:00" },
    saturday: { open: "10:00", close: "22:00" },
    sunday: { open: "10:00", close: "21:00" },
  },
  googleMapsLink: "https://maps.app.goo.gl/kmyEjX8qJb37WkbDA",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3146.5!2d23.75!3d37.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd40b8c7c22b%3A0x6f8d6f1e5c9c4a2e!2sMoisis%20Flower%20Design!5e0!3m2!1sel!2sgr",
} as const;

export const OCCASIONS = [
  { slug: "love", icon: "Heart" },
  { slug: "birth", icon: "Baby" },
  { slug: "congratulations", icon: "PartyPopper" },
  { slug: "condolence", icon: "Flower2" },
] as const;

export const EVENTS = [
  { slug: "wedding" },
  { slug: "christening" },
  { slug: "graduation" },
  { slug: "corporate" },
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
