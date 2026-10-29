// ===== EDIT THIS FILE to change the website's content =====
// Anything left as "" (empty) is hidden automatically.
export const site = {
    // Hero slideshow: photos fade automatically. Missing files are skipped.
  slideSeconds: 5,
  heroBackgrounds: ["images/hero.jpg", "images/story.jpg", "images/reception.jpg", "images/closing.jpg"],
  archPhotos:      ["images/arch.jpg", "images/family.jpg", "images/closing.jpg", "images/reception.jpg"],
  groomFirst: "Nithin",   brideFirst: "Gopika",
  groomFull:  "Nithin",   brideFull:  "Gopika",       // e.g. "Dr. Nithin K"
  initials:   "N  G",                                  // shown top-left

  // Date & time: the countdown, calendar file, weekday and date text all come from this line
  dateISO: "2026-11-15T11:00:00+05:30",                // EDIT ME (format YYYY-MM-DDTHH:MM:SS+05:30)
  timeText: "11:45 am - 12.05 pm",                        // EDIT ME

  eventTitle: "Wedding",
  // eventTitleMl: "വിവാഹം",                       // "" to hide
  venue: "Lekshmi Kalyana Mandapam, Kaimanam",
  mapsUrl: "https://www.google.com/maps/place/Lekshmi+Kalyana+Mandapam/@8.4711148,76.972881,17z/data=!3m1!4b1!4m6!3m5!1s0x3b05bae5665f344d:0x2095b02a4d09311a!8m2!3d8.4711148!4d76.9754559!16s%2Fg%2F1vfn522j?hl=en_GB&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",                  // EDIT ME: Google Maps share link
  place: "Trivandrum",                    // shown on hero and footer
  note: "",                                            // e.g. "Marriage will take place on ... at ..."

  // quote: "“I would rather share one lifetime with you…”",
  // quoteBy: "J.R.R. Tolkien, The Lord of the Rings",
  storyTitle: "The Red Thread of Fate",
  storyP1: "An old Chinese folktale says that an invisible red thread ties together the people who are meant to meet, however far apart they begin.",
  storyP2: "It may stretch and it may tangle, but it never breaks. Our red thread is finally getting tied, in front of everyone we love.",
  // storyCredit: "from Chinese folklore",

  groomRole: "Son of",      groomParents: " Mr. G Remadevan Pillai & Mrs. C Mallika Kumari Amma",  groomAddress: "Odanavattom, Kollam",
  brideRole: "Daughter of", brideParents: " Mr. A Bijukumar & Mrs. Deepa V.S",  brideAddress: "Poojapura, Trivandrum",
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
      // titleMl: "വധുവിന്റെ വിവാഹ സൽക്കാരം",
      dateText: "13 November 2026",
      timeText: "4:00 pm onwards",
      venue: "Balakrishna Auditorium, Thirumala",
      image: "images/bride-reception.jpg",
      mapsUrl: "https://www.google.com/maps/place/Sree+Balakrishna+Kalyana+Mandapam/data=!4m2!3m1!1s0x0:0x7d4390f36c3ccc64?sa=X&ved=1t:2428&hl=en_GB&ictx=111",
      note: ""
    },
    {
      enabled: true,
      side: "groom",
      label: "The Groom's Side",
      title: "Groom's Reception",
      // titleMl: "വരന്റെ വിവാഹ സൽക്കാരം",
      dateText: "15 November 2026",
      timeText: "05:00 pm onwards",
      venue: "AKS Auditorium, Odanavattom",
      image: "images/groom-reception.jpg",
      mapsUrl: "https://www.google.com/maps/place/AKS+Auditorium/data=!4m2!3m1!1s0x0:0xd244b7657a476a3?sa=X&ved=1t:2428&hl=en_GB&ictx=111",
      note: ""
    }
  ],

  show: {
    marquee: true,
    story: true,
    countdown: true
  }

};
