// ===== EDIT THIS FILE to change the website's content =====
// Anything left as "" (empty) is hidden automatically.
export const site = {
  groomFirst: "Nithin",   brideFirst: "Gopika",
  groomFull:  "Nithin",   brideFull:  "Gopika",       // e.g. "Dr. Nithin K"
  initials:   "N  G",                                  // shown top-left

  // Date & time: the countdown, calendar file, weekday and date text all come from this line
  dateISO: "2026-11-15T11:00:00+05:30",                // EDIT ME (format YYYY-MM-DDTHH:MM:SS+05:30)
  timeText: "11:00 am onwards",                        // EDIT ME

  eventTitle: "Wedding Reception",
  eventTitleMl: "വിവാഹ സൽക്കാരം",                       // "" to hide
  venue: "Lekshmi Kalyana Mandapam, Kaimanam",
  mapsUrl: "maps.app.goo.gl/2MaibC4WhKzL5wQH8?g_st=iw",                  // EDIT ME: Google Maps share link
  place: "Trivandrum",                    // shown on hero and footer
  note: "",                                            // e.g. "Marriage will take place on ... at ..."

  quote: "“I would rather share one lifetime with you…”",
  quoteBy: "J.R.R. Tolkien, The Lord of the Rings",
  storyTitle: "The Red Thread of Fate",
  storyP1: "An old Chinese folktale says that an invisible red thread ties together the people who are meant to meet, however far apart they begin.",
  storyP2: "It may stretch and it may tangle, but it never breaks. Our red thread is finally getting tied, in front of everyone we love.",
  storyCredit: "from Chinese folklore",

  groomRole: "Son of G Remadevan Pillai",      groomParents: " Mr. G Remadevan Pillai & Mrs. C Mallika Kumari Amma...",  groomAddress: "Odanavattom, Kollam",
  brideRole: "Daughter of A Bijukumar", brideParents: " Mr. A Bijukumar & Mrs. Deepa V.S...",  brideAddress: "Poojapura, Trivandrum",
  brideExtraLabel: "",      brideExtraName: "",          // e.g. "Sister of" / "Name"; "" to hide

  phone: "+910000000000",   phoneDisplay: "+91 00000 00000",   // EDIT ME

  show: { marquee: true, story: true, countdown: true }  ,        // set false to hide a section

  
  // Additional reception cards
  // Set enabled: false to hide a card.
  // Empty strings are automatically hidden.
  receptions: [
    {
      enabled: true,
      side: "bride",
      label: "The Bride's Side",
      title: "Bride's Reception",
      titleMl: "വധുവിന്റെ വിവാഹ സൽക്കാരം",
      dateText: "13 November 2026",
      timeText: "4:00 pm onwards",
      venue: "Balakrishna Auditorium, Thirumala",
      image: "images/bride-reception.jpg",
      mapsUrl: "https://share.google/pIVLPPC7Dm5TeNKVB",
      note: ""
    },
    {
      enabled: true,
      side: "groom",
      label: "The Groom's Side",
      title: "Groom's Reception",
      titleMl: "വരന്റെ വിവാഹ സൽക്കാരം",
      dateText: "15 November 2026",
      timeText: "05:00 pm onwards",
      venue: "AKS Auditorium, Odanavattom",
      image: "images/groom-reception.jpg",
      mapsUrl: "maps.app.goo.gl/2MaibC4WhKzL5wQH8?g_st=iw",
      note: ""
    }
  ],

  show: {
    marquee: true,
    story: true,
    countdown: true
  }

};
