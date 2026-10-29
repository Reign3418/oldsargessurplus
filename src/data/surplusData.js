export const STORE_INFO = {
  name: "Old Sarge's Surplus",
  dba: "Old Sarge Surplus — Spring Lake / Fort Bragg",
  tagline: "30+ Years Outfitting Fort Bragg • Genuine USGI Surplus • CIF Turn-In Readiness • On-Site Uniform Sewing",
  address: "240 S Bragg Blvd, Spring Lake, NC 28390",
  streetAddress: "240 S Bragg Blvd",
  cityStateZip: "Spring Lake, NC 28390",
  landmark: "Directly on S Bragg Blvd (200 South Block) between Fort Bragg Gates & Main St Spring Lake",
  phone: "(910) 497-5335",
  phoneRaw: "9104975335",
  domain: "oldsargessurplus.com",
  ebayHandle: "oldsargessurplus",
  ebayUrl: "https://www.ebay.com/usr/oldsargessurplus",
  facebookUrl: "https://www.facebook.com/pages/old-sarge-surplus/117242535001814",
  coordinates: {
    lat: 35.1636,
    lng: -78.9728
  },
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Old+Sarge+Surplus+240+S+Bragg+Blvd+Spring+Lake+NC+28390",
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=240+S+Bragg+Blvd,+Spring+Lake,+NC+28390",
  appleMapsUrl: "https://maps.apple.com/?daddr=240+S+Bragg+Blvd,+Spring+Lake,+NC+28390&dirflg=d",
  wazeUrl: "https://waze.com/ul?ll=35.1636,-78.9728&navigate=yes",
  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "10:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed" }
  ],
  wayfindingLandmarks: [
    {
      badge: "FROM FORT BRAGG GATES",
      direction: "Heading North on S Bragg Blvd (From Honeycutt / Butner / Post Gates)",
      cue: "Traffic moves fast coming off Fort Bragg onto S Bragg Blvd (NC-24/87). Stay in the RIGHT-HAND lane as you enter the 200 South block (just before Main St). Slow down early and turn right directly into our front storefront lot at 240 S Bragg Blvd."
    },
    {
      badge: "FROM SANFORD / NC-87 SOUTH",
      direction: "Heading South on Bragg Blvd (From Sanford, Spout Springs & NC-87)",
      cue: "Driving south through Spring Lake past N Bragg Blvd and the Main St / NC-210 intersection, you immediately enter S Bragg Blvd. Get into the left turn lane entering the 200 South block — look for 240 S Bragg Blvd on your left before reaching the Fort Bragg perimeter."
    },
    {
      badge: "FROM FAYETTEVILLE / NC-210",
      direction: "Approaching via Murchison Rd / NC-210 or Ramsey St Corridor",
      cue: "Merge onto S Bragg Blvd in Spring Lake and prepare for an immediate turn-in at 240 S Bragg Blvd. Dedicated front pull-in parking accommodates pickups, POVs, and trailers."
    },
    {
      badge: "VISUAL LANDMARK CUE",
      direction: "What to Look For So You Don't Pass Us at 45 MPH",
      cue: "Look for our corrugated metal hangar-style storefront building at 240 S Bragg Blvd with our signature OLD SARGE'S SURPLUS signage and front concrete parking apron."
    }
  ],
  customerReviews: [
    {
      id: "rev-1",
      author: "82nd ABN Jumpmaster",
      location: "Fort Bragg, NC",
      rating: 5,
      highlight: "Saved $280+ on CIF Turn-In",
      quote: "Needed a replacement MOLLE II sustainment pouch, wet weather bag, and Gore-Tex bivy before clearing CIF. Old Sarge had the exact NSNs on the shelf and saved me nearly $300 off Statement of Charges."
    },
    {
      id: "rev-2",
      author: "Local Guide • 35+ 'Helpful Staff' Mentions",
      location: "Spring Lake, NC",
      rating: 5,
      highlight: "Best On-Site Uniform Sewing on Bragg Blvd",
      quote: "Dropped off two OCP tops for name tapes, rank, and wings sew-on. Stitched straight to AR 670-1 spec and ready the same afternoon. Real-deal surplus store."
    },
    {
      id: "rev-3",
      author: "Verified Collector & Outdoorsman",
      location: "Fayetteville / Harnett County",
      rating: 5,
      highlight: "Floor-to-Ceiling Authentic USGI Gear",
      quote: "Packed to the rafters with real military surplus—ALICE packs, .50 cal ammo cans with good rubber seals, Woobies, and flight suits. Helpful staff who actually know the gear."
    }
  ],
  disambiguation: {
    ourStore: {
      name: "Old Sarge's Surplus (Old Sarge Surplus)",
      location: "240 S Bragg Blvd, Spring Lake, NC 28390",
      phone: "(910) 497-5335",
      model: "Family-Owned Brick-and-Mortar Storefront, On-Site Sewing Shop & Verified eBay Store (oldsargessurplus)",
      rating: "4.3★ Local Google Maps Reputation (35+ 'Helpful Staff' & 'Gear Selection' Mentions)"
    },
    unrelatedNyStore: {
      name: "Old Sarge's Drop Zone",
      domain: "oldsargesdropzone.com",
      location: "7031 US-20, Westfield, NY 14787 (Chautauqua County, New York)",
      phone: "(716) 401-2930",
      warning: "ZERO AFFILIATION: If you placed a website order with Old Sarge's Drop Zone in New York and have not received your shipment or email reply, please contact their Westfield, NY office at (716) 401-2930 or your card issuer. Please do not post reviews meant for the New York website on our Spring Lake, NC storefront."
    }
  }
};

export const INITIAL_SEWING_STATUS = {
  turnaroundMode: "SAME_DAY", // SAME_DAY | NEXT_DAY | BUSY_48HR
  label: "⚡ WALK-IN & SAME-DAY SEWING OPEN",
  subtext: "OCP Name Tapes, Rank, Skill Badges, Unit Patches & Heavy-Duty Ruck Repair on site at 240 S Bragg Blvd",
  cutoffTime: "Drop off before 2:00 PM for same-day pickup"
};

export const INITIAL_FEATURED_DROPS = [
  {
    id: "drop-1",
    badge: "FRESH FORT BRAGG CRATE",
    title: "Complete OCP MOLLE II Large Rucksacks (Frame + Sustainment Pouches)",
    condition: "Grade 1 Serviceable / CIF Ready",
    nsn: "8465-01-641-6331",
    storePrice: 165,
    cifCharge: 412,
    stockState: "IN_STOCK",
    notes: "Inspected frames, intact lumbar pads, all Fastex buckles verified."
  },
  {
    id: "drop-2",
    badge: "SOLDIER FAVORITE",
    title: "Authentic USGI Ripstop Poncho Liners ('The Woobie' — Woodland & OCP)",
    condition: "Unissued & Grade 1 Stock",
    nsn: "8405-00-889-3683",
    storePrice: 42,
    cifCharge: 68,
    stockState: "IN_STOCK",
    notes: "Genuine quilted batting with tie cords — ready for the field or the couch."
  },
  {
    id: "drop-3",
    badge: "CIF TURN-IN SAVER",
    title: "USGI 4-Piece Modular Sleep System (MSS) w/ Gore-Tex Bivy Cover",
    condition: "Grade 1 Inspected — Clean Zippers",
    nsn: "8465-01-445-6274",
    storePrice: 185,
    cifCharge: 465,
    stockState: "LOW_STOCK",
    notes: "Includes Patrol Bag, Intermediate Cold Bag, Waterproof Bivy & Compression Sack."
  },
  {
    id: "drop-4",
    badge: "PALLET ARRIVAL",
    title: "USGI M2A1 .50 Cal & M19A1 .30 Cal Steel Ammo Cans (Live Rubber Seals)",
    condition: "Grade 1 Airtight / Dry Storage",
    nsn: "8140-01-376-6674",
    storePrice: 18,
    cifCharge: 35,
    stockState: "IN_STOCK",
    notes: "Clean interior walls, supple rubber lid gaskets — $15 (.30 Cal) / $18 (.50 Cal)."
  }
];

export const INITIAL_INVENTORY_BAYS = [
  {
    id: "rucks-packs",
    code: "BAY 01",
    name: "Rucksacks, Assault Packs & Frames",
    shortName: "Rucks & Packs",
    description: "Complete USGI MOLLE II systems, Medium Rucks, 3-Day Assault Packs, vintage ALICE rigs, and replacement polymer/aluminum frames.",
    items: [
      {
        id: "ruck-molle-lg",
        name: "USGI MOLLE II Large Rucksack Complete (OCP / Multicam)",
        nsn: "8465-01-641-6331",
        condition: "Grade 1 Serviceable",
        price: 165,
        cifCharge: 412,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Main bag, Gen IV polymer frame, molded shoulder straps, kidney pad & 2x Sustainment Pouches."
      },
      {
        id: "ruck-medium-ocp",
        name: "USGI MOLLE Medium Rucksack w/ External Frame (OCP)",
        nsn: "8465-01-585-0566",
        condition: "Grade 1 Serviceable",
        price: 125,
        cifCharge: 289,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Airborne & light infantry favorite. Complete with frame, harness, and hip belt."
      },
      {
        id: "pack-assault-ocp",
        name: "USGI 3-Day Assault Pack (OCP / Multicam)",
        nsn: "8465-01-641-6348",
        condition: "Grade 1 / Unissued Mix",
        price: 65,
        cifCharge: 158,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Includes internal plastic stiffener board, jump straps, and hydration port."
      },
      {
        id: "ruck-alice-lg",
        name: "Vintage USGI Large ALICE Pack w/ LC-2 Metal Frame & Kidney Pad",
        nsn: "8465-00-001-6482",
        condition: "Classic OD Green Issue",
        price: 115,
        cifCharge: 210,
        cifEssential: false,
        stockStatus: "LOW_STOCK",
        description: "Bombproof old-school field ruck beloved by SF selection candidates and bushcrafters."
      },
      {
        id: "bag-wet-weather",
        name: "USGI Waterproof Wet Weather Clothing Bag (Dry Bag Liner)",
        nsn: "8465-01-547-2670",
        condition: "Grade 1 Vulcanized Seal",
        price: 16,
        cifCharge: 38,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Mandatory packing list & CIF layout item. Tested watertight inner liner."
      },
      {
        id: "bag-duffel-side",
        name: "USGI Improved Side-Zip Canvas/Nylon Sea Bag Duffel (OD)",
        nsn: "8465-01-604-6541",
        condition: "Grade 1 Serviceable",
        price: 28,
        cifCharge: 59,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Heavy-duty padded shoulder straps with full-length side zipper and storm flap."
      }
    ]
  },
  {
    id: "molle-pouches",
    code: "BAY 02",
    name: "MOLLE II Pouches, TAP Rigs & LBE",
    shortName: "Pouches & LBE",
    description: "Replace missing CIF pouches in 5 minutes. Bins sorted by NSN, pattern (OCP, Coyote, UCP, Woodland), and pouch type.",
    items: [
      {
        id: "pouch-sustainment",
        name: "MOLLE II Rucksack Sustainment Pouch (OCP / Multicam)",
        nsn: "8465-01-641-6351",
        condition: "Grade 1 / Unissued",
        price: 18,
        cifCharge: 44,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Holds 3 MREs or wet weather gear on side of Large Ruck. Sold individually."
      },
      {
        id: "rig-taps-ocp",
        name: "USGI TAP (Tactical Assault Panel) Chest Rig w/ Harness (OCP)",
        nsn: "8465-01-580-0689",
        condition: "Complete w/ Harness & Adapters",
        price: 75,
        cifCharge: 164,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "8 integrated mag pockets + harness straps. Missing adapter straps sold separately too."
      },
      {
        id: "pouch-canteen-gp",
        name: "MOLLE II 1-Quart Canteen / General Purpose Pouch (OCP)",
        nsn: "8465-01-641-9311",
        condition: "Grade 1 Serviceable",
        price: 14,
        cifCharge: 31,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Drawstring top + buckle flap. One of the most common missing CIF turn-in items."
      },
      {
        id: "pouch-ifak-ii",
        name: "USGI IFAK II Outer Pouch & Folding Insert Shell (OCP)",
        nsn: "6545-01-587-8828",
        condition: "Grade 1 Serviceable",
        price: 22,
        cifCharge: 56,
        cifEssential: true,
        stockStatus: "LOW_STOCK",
        description: "Dual-pull ambidextrous medical sleeve and insert cordura body."
      },
      {
        id: "pouch-m4-double",
        name: "MOLLE II Double / Triple M4 Magazine Pouches (OCP & Coyote)",
        nsn: "8465-01-642-2279",
        condition: "Grade 1 / Unissued",
        price: 12,
        cifCharge: 28,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Hook-and-loop + snap closure. Deep bins of OCP, Coyote, and UCP in store."
      },
      {
        id: "vest-flc-molle",
        name: "USGI MOLLE II Fighting Load Carrier (FLC) Vest",
        nsn: "8465-01-525-0577",
        condition: "Unissued / Grade 1",
        price: 28,
        cifCharge: 74,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Lightweight mesh tactical vest with adjustable waist belt."
      }
    ]
  },
  {
    id: "ecwcs-sleep",
    code: "BAY 03",
    name: "ECWCS Cold Weather, Sleep Systems & Woobies",
    shortName: "Sleep & ECWCS",
    description: "Genuine USGI Poncho Liners (Woobies), 4-Piece Modular Sleep Systems, Gore-Tex Bivy Covers, and ECWCS Gen III fleece/wet-weather layers.",
    items: [
      {
        id: "woobie-poncho-liner",
        name: "Authentic USGI Ripstop Poncho Liner ('The Woobie')",
        nsn: "8405-00-889-3683",
        condition: "Unissued & Grade 1",
        price: 42,
        cifCharge: 68,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Available in Woodland, OCP/Multicam, Coyote, and UCP. Essential field comfort."
      },
      {
        id: "mss-4pc-complete",
        name: "USGI 4-Piece Modular Sleep System (MSS) w/ Gore-Tex Bivy",
        nsn: "8465-01-445-6274",
        condition: "Grade 1 Inspected",
        price: 185,
        cifCharge: 465,
        cifEssential: true,
        stockStatus: "LOW_STOCK",
        description: "Patrol green bag, intermediate black bag, Woodland/OCP Gore-Tex bivy & stuff sack."
      },
      {
        id: "bivy-goretex-only",
        name: "USGI Waterproof Gore-Tex Sleeping Bag Bivy Cover Only",
        nsn: "8465-01-416-8517",
        condition: "Grade 1 Seam-Intact",
        price: 78,
        cifCharge: 172,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Save $90+ vs CIF Statement of Charges if only your outer bivy cover is damaged or missing."
      },
      {
        id: "ecwcs-lvl6-goretex",
        name: "ECWCS Gen III Level 6 Extreme Cold/Wet Gore-Tex Jacket (OCP)",
        nsn: "8415-01-630-5008",
        condition: "Grade 1 Serviceable",
        price: 95,
        cifCharge: 215,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Ultralight 2-layer Gore-Tex Paclite shell with sealed seams. Matching trousers in stock."
      },
      {
        id: "ecwcs-lvl3-fleece",
        name: "ECWCS Gen III Level 3 Polartec Thermal Pro Fleece (Tan / Coyote)",
        nsn: "8415-01-623-5528",
        condition: "Grade 1 Serviceable",
        price: 45,
        cifCharge: 98,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "High-loft thermal layer with nylon-reinforced collar, shoulders, and elbows."
      },
      {
        id: "mat-sleeping-iso",
        name: "USGI Closed-Cell Foam Sleeping Mat (Iso-Mat / Folding Pad)",
        nsn: "8465-01-109-3369",
        condition: "Grade 1 Serviceable",
        price: 18,
        cifCharge: 34,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Standard issue thermal ground pad for ranger school, field exercises, and CIF."
      }
    ]
  },
  {
    id: "uniforms-flight",
    code: "BAY 04",
    name: "OCP Uniforms, Flight Suits & Field Jackets",
    shortName: "Uniforms & Jackets",
    description: "Racks of sized IHWCU Hot Weather OCPs, standard ACUs, Nomex aviation/CVC coveralls, and classic M-65 field jackets.",
    items: [
      {
        id: "ocp-ihwcu-set",
        name: "USGI IHWCU Hot Weather OCP Coat or Trousers (Sized Racks)",
        nsn: "8415-01-670-8912",
        condition: "Grade 1 / Unissued",
        price: 34,
        cifCharge: 62,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Breathable 57/43 nylon-cotton ripstop. Pair with our on-site sewing counter for instant setup."
      },
      {
        id: "ocp-standard-acu",
        name: "Standard USGI ACU OCP Coat or Trousers (Field Ready)",
        nsn: "8415-01-623-4160",
        condition: "Grade 1 Serviceable",
        price: 25,
        cifCharge: 54,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Ideal for field rotations, JRTC/NTC, obstacle courses, or airborne operations."
      },
      {
        id: "flight-suit-nomex",
        name: "USGI Nomex CWU-27/P Flight Suit & CVC Tanker Coveralls",
        nsn: "8415-01-043-8385",
        condition: "Grade 1 Fire-Resistant",
        price: 75,
        cifCharge: 220,
        cifEssential: false,
        stockStatus: "LOW_STOCK",
        description: "Authentic Aramid/Nomex one-piece suits in Sage Green, Desert Tan, and OCP."
      },
      {
        id: "jacket-m65-vintage",
        name: "Classic USGI M-65 Field Jacket w/ Quilted Button-In Liner",
        nsn: "8415-01-099-7836",
        condition: "Collector & Field Grade",
        price: 85,
        cifCharge: 150,
        cifEssential: false,
        stockStatus: "FRESH_DROP",
        description: "Iconic heavy sateen/nyco field coat in Woodland Camo and Olive Drab."
      }
    ]
  },
  {
    id: "boots-footwear",
    code: "BAY 05",
    name: "AR 670-1 Combat Boots, Jump Boots & Footwear",
    shortName: "Combat Boots",
    description: "Wall-to-wall sizing in Coyote Brown AR 670-1 boots, rucking footwear, Gore-Tex cold weather boots, and extreme cold vapor barrier boots.",
    items: [
      {
        id: "boots-coyote-hot",
        name: "AR 670-1 Coyote Brown Hot Weather Combat Boots (Belleville / Garmont / McRae)",
        nsn: "8430-01-647-6110",
        condition: "Unissued & Grade 1",
        price: 75,
        cifCharge: 165,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Save 50%+ off retail PX prices. Sizes 5 through 14 Wide in stock."
      },
      {
        id: "boots-coyote-goretex",
        name: "USGI Temperate / Cold-Wet Gore-Tex Combat Boots (Coyote Brown)",
        nsn: "8430-01-648-1142",
        condition: "Grade 1 Waterproof",
        price: 85,
        cifCharge: 195,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Vibram Sierra outsole with breathable waterproof Gore-Tex bootie liner."
      },
      {
        id: "boots-bunny-vb",
        name: "USGI Extreme Cold Vapor Barrier ('Mickey Mouse / Bunny') Boots",
        nsn: "8430-00-269-0100",
        condition: "Vintage USGI Issue",
        price: 110,
        cifCharge: 240,
        cifEssential: false,
        stockStatus: "LOW_STOCK",
        description: "Legendary sub-zero rubberized insulation boots for ice fishing, hunting, and collectors."
      }
    ]
  },
  {
    id: "ammo-cans-hardware",
    code: "BAY 06",
    name: "Steel Ammo Cans, Hardigg Cases & E-Tools",
    shortName: "Ammo Cans & Hardware",
    description: "Pallets of watertight .50 Cal and .30 Cal steel cans, 40mm crates, USGI tri-fold entrenching tools, and Hardigg/Pelican footlockers.",
    items: [
      {
        id: "can-50cal-m2a1",
        name: "USGI M2A1 .50 Cal Steel Ammo Can w/ Watertight Rubber Gasket",
        nsn: "8140-01-376-6674",
        condition: "Grade 1 Clean Seal",
        price: 18,
        cifCharge: 35,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "The gold standard for dry ammo storage, truck toolboxes, and garage organization."
      },
      {
        id: "can-30cal-m19a1",
        name: "USGI M19A1 .30 Cal / 7.62mm Steel Ammo Can",
        nsn: "8140-00-960-1699",
        condition: "Grade 1 Clean Seal",
        price: 15,
        cifCharge: 28,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Compact narrow-profile steel box with hinged lid and heavy latch."
      },
      {
        id: "etool-trifold-carrier",
        name: "USGI Ames Tri-Fold Entrenching Tool (E-Tool) w/ MOLLE Carrier",
        nsn: "5120-00-878-5932",
        condition: "Grade 1 Serviceable",
        price: 35,
        cifCharge: 84,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Folding steel shovel blade + OCP/UCP polymer or cordura carrier."
      },
      {
        id: "case-hardigg-pelican",
        name: "USGI Hardigg / Pelican Rotomolded Field Footlocker & Gear Case",
        nsn: "8145-01-434-7120",
        condition: "Heavy-Duty Surplus",
        price: 115,
        cifCharge: 340,
        cifEssential: false,
        stockStatus: "FRESH_DROP",
        description: "Airtight, stackable military deployment trunks for overlanding and range gear."
      }
    ]
  },
  {
    id: "helmets-field-gear",
    code: "BAY 07",
    name: "Helmet Hardware, APEL Eye Pro, Canteens & Survival",
    shortName: "Helmets & Survival",
    description: "ACH pads, chin straps, cat-eye bands, NVG baseplates, APEL ballistic eyewear, stainless canteen cups, and 550 paracord.",
    items: [
      {
        id: "ach-retrofit-kit",
        name: "ACH / MICH Helmet Overhaul Kit (OCP Cover, Chin Strap, 7-Pad Set & Cat-Eyes)",
        nsn: "8470-01-630-6932",
        condition: "New / Unissued Components",
        price: 45,
        cifCharge: 112,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Also sold piece-by-piece at the counter if you only need a 4-point chin strap or cover."
      },
      {
        id: "eyepro-apel-kit",
        name: "APEL-Approved Ballistic Eyewear Kit (Revision Sawfly / ESS Crossbow)",
        nsn: "4240-01-630-8327",
        condition: "Unissued / Scratch-Free",
        price: 32,
        cifCharge: 82,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Frame, clear lens, smoke lens, nosepiece, and protective case."
      },
      {
        id: "canteen-cup-set",
        name: "USGI 1-Qt Canteen + Heavy Stainless Steel Canteen Cup & Stove",
        nsn: "8465-00-165-6838",
        condition: "Unissued Plastic + Issue Cup",
        price: 22,
        cifCharge: 46,
        cifEssential: true,
        stockStatus: "IN_STOCK",
        description: "Butterfly folding handle stainless cup nests directly under standard 1-quart canteen."
      },
      {
        id: "paracord-550-spool",
        name: "MIL-C-5040H Type III 550lb 7-Strand Nylon Paracord (100ft Hank)",
        nsn: "4020-00-240-2146",
        condition: "Brand New US-Made",
        price: 12,
        cifCharge: 20,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "OD Green, Coyote Brown, Foliage, and Black — 100ft hanks & 1,000ft spools."
      }
    ]
  },
  {
    id: "sewing-alterations",
    code: "BAY 08",
    name: "On-Site Sewing, Name Tapes & Ruck Repair",
    shortName: "On-Site Sewing",
    description: "In-house industrial sewing machines at 240 S Bragg Blvd. AR 670-1 precision placement for uniforms plus heavy webbing/zipper repair.",
    items: [
      {
        id: "sew-ocp-full",
        name: "Full OCP Coat Sew-On Package (Name Tape, U.S. Army, Rank & 2 Badges)",
        nsn: "SEW-AR670-FULL",
        condition: "Walk-In / Same-Day Service",
        price: 22,
        cifCharge: 38,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Includes regulation placement for Airborne/Air Assault/CIB/EFMB/Pathfinder badges."
      },
      {
        id: "sew-nametape-pair",
        name: "Custom Embroidered OCP Name Tapes (Pair — With Hook Velcro or Sew-On)",
        nsn: "SEW-NAMETAPE-2X",
        condition: "Made on Site",
        price: 10,
        cifCharge: 18,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Crisp black spice-brown lettering on regulation Scorpion W2 / OCP ripstop tape."
      },
      {
        id: "sew-pc-beret-rank",
        name: "Patrol Cap (PC) Name Tape + Sew-On Rank OR Beret Flash & Crest Mount",
        nsn: "SEW-HEADGEAR-01",
        condition: "Walk-In Turnaround",
        price: 8,
        cifCharge: 16,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Clean centered stitching on patrol caps, sun boonies, and Maroon/Tan/Green berets."
      },
      {
        id: "sew-ruck-repair",
        name: "Heavy-Duty Rucksack Zipper, Blown Seam & Frame Strap Webbing Repair",
        nsn: "SEW-RUCK-HD",
        condition: "Industrial Walking-Foot Machine",
        price: 20,
        cifCharge: 165,
        cifEssential: false,
        stockStatus: "IN_STOCK",
        description: "Don't buy a whole new ruck for a torn strap—our heavy needles stitch right through Cordura."
      }
    ]
  }
];

export const STOCK_BADGE_MAP = {
  IN_STOCK: {
    label: "IN STOCK • DEEP CRATE",
    shortLabel: "In Stock",
    bg: "bg-emerald-950/90",
    border: "border-emerald-500/60",
    text: "text-emerald-300",
    dot: "bg-emerald-400"
  },
  LOW_STOCK: {
    label: "LOW STOCK • CALL TO HOLD",
    shortLabel: "Low Stock",
    bg: "bg-amber-950/90",
    border: "border-amber-500/60",
    text: "text-amber-300",
    dot: "bg-amber-400"
  },
  FRESH_DROP: {
    label: "🔥 FRESH CRATE ARRIVAL",
    shortLabel: "Fresh Drop",
    bg: "bg-yellow-950/90",
    border: "border-yellow-400/70",
    text: "text-yellow-300",
    dot: "bg-yellow-400"
  },
  SOLD_OUT: {
    label: "OUT OF STOCK • CHECK EBAY / CALL",
    shortLabel: "Out of Stock",
    bg: "bg-rose-950/90",
    border: "border-rose-500/60",
    text: "text-rose-300",
    dot: "bg-rose-400"
  }
};

export const SEWING_STUDIO_CATALOG = {
  ranks: [
    "PV2", "PFC", "SPC", "CPL", "SGT", "SSG", "SFC", "MSG", "1SG", "SGM", "CSM",
    "WO1", "CW2", "CW3", "CW4", "CW5",
    "2LT", "1LT", "CPT", "MAJ", "LTC", "COL"
  ],
  skillBadges: [
    { id: "airborne", name: "Basic Parachutist (Airborne)", short: "AIRBORNE WINGS", price: 4 },
    { id: "sr-airborne", name: "Senior Parachutist", short: "SR PARACHUTIST", price: 4 },
    { id: "jm-airborne", name: "Master Parachutist (Jumpmaster)", short: "MASTER WINGS", price: 4 },
    { id: "air-assault", name: "Air Assault Badge", short: "AIR ASSAULT", price: 4 },
    { id: "pathfinder", name: "Pathfinder Torch Badge", short: "PATHFINDER", price: 4 },
    { id: "cib", name: "Combat Infantryman Badge (CIB)", short: "CIB", price: 4 },
    { id: "eib", name: "Expert Infantryman Badge (EIB)", short: "EIB", price: 4 },
    { id: "cmb", name: "Combat Medical Badge (CMB)", short: "CMB", price: 4 },
    { id: "efmb", name: "Expert Field Medical Badge (EFMB)", short: "EFMB", price: 4 },
    { id: "esb", name: "Expert Soldier Badge (ESB)", short: "ESB", price: 4 },
    { id: "cab", name: "Combat Action Badge (CAB)", short: "CAB", price: 4 },
    { id: "rigger", name: "Parachute Rigger Badge", short: "RIGGER", price: 4 }
  ],
  tapePatterns: [
    {
      id: "ocp-scorpion",
      name: "OCP Scorpion W2 (AR 670-1 Standard)",
      bgClass: "bg-gradient-to-r from-[#5b5d44] via-[#7c7455] to-[#464935]",
      textClass: "text-[#141413]",
      borderClass: "border-[#3c3f2d]"
    },
    {
      id: "coyote-brown",
      name: "Coyote Brown 499 (Rucks / Bags / Helmets)",
      bgClass: "bg-[#81613e]",
      textClass: "text-[#121212]",
      borderClass: "border-[#5d4429]"
    },
    {
      id: "od-vintage",
      name: "Olive Drab 107 (ALICE / Vintage Field Gear)",
      bgClass: "bg-[#4a5335]",
      textClass: "text-[#0f110c]",
      borderClass: "border-[#313822]"
    },
    {
      id: "subdued-black",
      name: "Tactical Black w/ Gold or OD Thread",
      bgClass: "bg-[#18191c]",
      textClass: "text-[#d4af37]",
      borderClass: "border-zinc-700"
    }
  ],
  categories: [
    {
      id: "ocp-tapes",
      title: "OCP Uniform & Name Tapes",
      badge: "AR 670-1 DIRECT SEW",
      description: "Strip hook-and-loop velcro and sew down Name, U.S. Army, Rank, and Skill Badges with exact 1/4-inch regulation spacing.",
      services: [
        {
          id: "svc-ocp-full",
          name: "Full OCP Coat Strip-Velcro & Sew-Down Package",
          detail: "Includes stripping chest velcro + sewing Name Tape, U.S. Army, Center Rank & up to 2 Skill Badges",
          price: 22,
          turnaround: "Same-Day / 24-Hr",
          popular: true
        },
        {
          id: "svc-ocp-basic",
          name: "Basic OCP Coat Sew-Down (Name, U.S. Army & Rank)",
          detail: "Clean perimeter stitch on both chest tapes and center rank (no skill badges)",
          price: 14,
          turnaround: "Same-Day / 24-Hr",
          popular: true
        },
        {
          id: "svc-nametape-pair",
          name: "Custom Embroidered Name Tape Pair (2x Tapes)",
          detail: "Made on-site in regulation block stencil — choose Plain Sew-On or Hook Velcro Backed",
          price: 10,
          turnaround: "While-You-Wait / 15 Mins",
          popular: true
        },
        {
          id: "svc-nametape-6pack",
          name: "Deployment / Field Name Tape Bundle (6x Name + 2x U.S. Army)",
          detail: "Complete uniform + ruck + patrol cap tape pack in OCP Scorpion W2",
          price: 26,
          turnaround: "Same-Day",
          popular: false
        },
        {
          id: "svc-parka-tab",
          name: "ECWCS Gore-Tex Parka / Fleece Chest Rank & Name Setup",
          detail: "Velcro or sew-on chest rank slip + name tape for cold/wet weather tops",
          price: 12,
          turnaround: "Same-Day",
          popular: false
        }
      ]
    },
    {
      id: "headgear-beret",
      title: "Patrol Caps, Boonies & Berets",
      badge: "AIRBORNE / RANGER / SF",
      description: "Centered Patrol Cap rank & name tapes, luminous cat-eye strips, and Maroon/Tan/Green Beret flash & DUI crest preparation.",
      services: [
        {
          id: "svc-pc-combo",
          name: "Patrol Cap (PC) Name Tape + Front Sew-On Rank",
          detail: "Centered rear name tape + front subdued rank stitched cleanly through stiffener",
          price: 8,
          turnaround: "While-You-Wait / Same-Day",
          popular: true
        },
        {
          id: "svc-pc-cateyes",
          name: "Patrol Cap / Sun Boonie Name Tape + Luminous Cat-Eyes",
          detail: "Rear name tape plus regulation glow-in-the-dark cat-eye strips for airborne/field ops",
          price: 12,
          turnaround: "Same-Day",
          popular: true
        },
        {
          id: "svc-beret-flash",
          name: "Beret Flash Sew-On + Cardboard Backing Cut & Liner Trim",
          detail: "Precision stitch for Airborne Maroon, Ranger Tan, SF Green, or Standard Black berets",
          price: 16,
          turnaround: "Same-Day / 24-Hr",
          popular: true
        }
      ]
    },
    {
      id: "agsu-dress",
      title: "AGSU ('Pinks & Greens') & ASU Dress",
      badge: "INSPECTION / BOARD READY",
      description: "Promotion board, change-of-command, and Ball prep for Army Green Service Uniform (AGSU) and Blue ASU.",
      services: [
        {
          id: "svc-agsu-patches",
          name: "AGSU Coat Unit Patch (Left Sleeve) & Combat Patch (Right Sleeve)",
          detail: "Exact 1/2-inch shoulder seam regulation placement on Heritage Green wool coat",
          price: 14,
          turnaround: "24-Hr Turnaround",
          popular: true
        },
        {
          id: "svc-agsu-chevrons",
          name: "AGSU Sew-On Sleeve Rank Chevrons + Service Stripes / Overseas Bars",
          detail: "Both sleeves pressed and stitched to DA PAM 670-1 board inspection standards",
          price: 22,
          turnaround: "24-Hr Turnaround",
          popular: true
        },
        {
          id: "svc-agsu-hem",
          name: "AGSU / ASU Dress Trouser Hemming & Coat Waist Taper",
          detail: "Regulation front break on low-quarters with clean blind-stitch hem",
          price: 28,
          turnaround: "24–48 Hr Turnaround",
          popular: false
        }
      ]
    },
    {
      id: "ruck-cordura",
      title: "Heavy Ruck, Zipper & Cordura Repair",
      badge: "INDUSTRIAL WALKING-FOOT",
      description: "Save $200–$400 at Fort Bragg CIF by repairing blown #10 rucksack zippers, torn shoulder webbing, and plate carrier velcro.",
      services: [
        {
          id: "svc-ruck-zipper",
          name: "MOLLE II Large / Medium Ruck Heavy #10 Zipper Replacement",
          detail: "Replaces jammed or blown main clam-shell or sustainment pouch zipper with mil-spec #10 coil",
          price: 28,
          turnaround: "24-Hr Turnaround",
          popular: true
        },
        {
          id: "svc-ruck-strap",
          name: "Blown Ruck Shoulder Strap, Kidney Pad & Frame Webbing Bartack",
          detail: "Heavy nylon bonded thread stitched through multi-layer 1000D Cordura",
          price: 20,
          turnaround: "Same-Day / 24-Hr",
          popular: true
        },
        {
          id: "svc-iotv-velcro",
          name: "Plate Carrier / IOTV Cummerbund Hook & Loop Velcro Renewal",
          detail: "Replaces worn-out fuzz velcro so flaps hold tight under field load",
          price: 24,
          turnaround: "24-Hr Turnaround",
          popular: false
        }
      ]
    }
  ]
};

export const EBAY_STORE_CONFIG = {
  sellerHandle: "oldsargessurplus",
  storeUrl: "https://www.ebay.com/usr/oldsargessurplus",
  allListingsUrl: "https://www.ebay.com/sch/i.html?_ssn=oldsargessurplus",
  reputationBadge: "eBay Top-Rated Seller • Near 100% Positive Feedback • Thousands of Verified Shipments",
  syncModeLabel: "AUTO-SYNC ACTIVE (Every 15 Mins via Seller Feed)",
  topBrands: [
    "Mystery Ranch",
    "Tactical Tailor",
    "Specialty Defense Systems (SDS)",
    "Eagle Industries",
    "London Bridge Trading (LBT)",
    "USGI Issue / CIE"
  ]
};

export function getEbayItemSearchUrl(item) {
  const query = item?.ebayQuery || item?.name?.split('(')[0]?.trim() || item?.nsn || 'USGI';
  return `https://www.ebay.com/sch/i.html?_ssn=oldsargessurplus&_nkw=${encodeURIComponent(query)}`;
}

// Authentic eBay Seller Feed items ready for 1-click live sync into the 8-Bay Storefront
export const EBAY_FEED_SYNC_BATCH = [
  {
    id: "ebay-mystery-ranch-3dap",
    bayId: "rucks-packs",
    name: "Mystery Ranch 3-Day Assault Pack (3DAP) / BVS Coyote Brown (SOF Issue)",
    nsn: "8465-01-617-2690",
    condition: "eBay Top-Rated • Grade 1",
    price: 345,
    cifCharge: 580,
    cifEssential: false,
    stockStatus: "FRESH_DROP",
    ebaySynced: true,
    ebayItemNumber: "285940184920",
    ebayWatchers: 19,
    ebayQuery: "Mystery Ranch",
    description: "Synced directly from @oldsargessurplus eBay Seller Hub. Genuine Mystery Ranch Futura yoke + BVS bolsters. Buy online on eBay or pick up at 240 S Bragg Blvd."
  },
  {
    id: "ebay-tactical-tailor-malice",
    bayId: "rucks-packs",
    name: "Tactical Tailor Modified ALICE / MALICE Pack Complete w/ Super Straps & Kidney Pad",
    nsn: "TT-MALICE-V3",
    condition: "eBay Synced • Fort Bragg Favorite",
    price: 245,
    cifCharge: 420,
    cifEssential: false,
    stockStatus: "FRESH_DROP",
    ebaySynced: true,
    ebayItemNumber: "285940199312",
    ebayWatchers: 14,
    ebayQuery: "Tactical Tailor",
    description: "Synced from @oldsargessurplus eBay store. Heavy 1000D Cordura with exterior fast-access pockets and reinforced airborne jump frame."
  },
  {
    id: "ebay-sds-molle-kit",
    bayId: "molle-pouches",
    name: "Specialty Defense Systems (SDS) USGI Complete Rifleman Pouch & FLC Lot (8-Piece)",
    nsn: "8465-01-525-0577",
    condition: "eBay Synced • Unissued / NOS",
    price: 58,
    cifCharge: 148,
    cifEssential: true,
    stockStatus: "IN_STOCK",
    ebaySynced: true,
    ebayItemNumber: "285940210445",
    ebayWatchers: 9,
    ebayQuery: "Specialty Defense Systems",
    description: "Synced from @oldsargessurplus eBay store. Genuine SDS contract MOLLE II vest + canteen, mag, and sustainment pouches."
  },
  {
    id: "ebay-eagle-ind-soflcs",
    bayId: "molle-pouches",
    name: "Eagle Industries SOFLCS / RLCS Khaki & Multicam Admin + Medical Pouch Set",
    nsn: "8465-01-557-1092",
    condition: "eBay Synced • Authentic SOF Surplus",
    price: 64,
    cifCharge: 135,
    cifEssential: false,
    stockStatus: "LOW_STOCK",
    ebaySynced: true,
    ebayItemNumber: "285940228810",
    ebayWatchers: 11,
    ebayQuery: "Eagle Industries",
    description: "Synced from @oldsargessurplus eBay store. Rare Fort Bragg special operations turn-in lot."
  },
  {
    id: "ebay-ecwcs-level7-parka",
    bayId: "ecwcs-sleep",
    name: "USGI ECWCS Gen III Level 7 Extreme Cold Primaloft Parka ('Marshmallow Jacket')",
    nsn: "8415-01-538-6289",
    condition: "eBay Synced • Grade 1 Clean",
    price: 135,
    cifCharge: 318,
    cifEssential: true,
    stockStatus: "FRESH_DROP",
    ebaySynced: true,
    ebayItemNumber: "285940241109",
    ebayWatchers: 16,
    ebayQuery: "ECWCS Level 7",
    description: "Synced from @oldsargessurplus eBay store. Genuine Primaloft insulation—clear CIF or stay warm in sub-zero field ops."
  }
];


