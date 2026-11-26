export type Category = "te" | "koshi" | "ashi" | "ma" | "yoko" | "osae" | "shime" | "kan";

/** [romaji, kanji, English, category, Kodokan YouTube video id] */
export type Technique = readonly [romaji: string, kanji: string, english: string, category: Category, videoId: string];

export interface Kata {
  numbers: string;
  title: string;
  description: string;
}

export interface Belt {
  id: string;
  name: string;
  grade: string;
  techniques: readonly Technique[];
  kata?: Kata;
  note?: string;
  /** Japanese name of a dan grade, e.g. 初段 Shodan. */
  japanese?: { kanji: string; romaji: string };
}

export interface Group {
  label: string;
  age: string;
  belts: readonly Belt[];
}

/** Kodokan term shown on each row, with a short English gloss. */
export const CATEGORY: Record<Category, { label: string; term: string }> = {
  te: { label: "hand", term: "Te-waza" },
  koshi: { label: "hip", term: "Koshi-waza" },
  ashi: { label: "foot", term: "Ashi-waza" },
  ma: { label: "rear sacrifice", term: "Ma-sutemi-waza" },
  yoko: { label: "side sacrifice", term: "Yoko-sutemi-waza" },
  osae: { label: "hold-down", term: "Osaekomi-waza" },
  shime: { label: "strangle", term: "Shime-waza" },
  kan: { label: "joint lock", term: "Kansetsu-waza" },
};

export type Family = "throws" | "holds" | "strangles" | "locks";

/** How a belt's list is split into sub-headings, in this order. */
export const FAMILIES: readonly { id: Family; title: string; term: string; kanji: string; cats: readonly Category[] }[] = [
  { id: "throws", title: "Throws", term: "Nage-waza", kanji: "投技", cats: ["te", "koshi", "ashi", "ma", "yoko"] },
  { id: "holds", title: "Holds", term: "Osaekomi-waza", kanji: "抑込技", cats: ["osae"] },
  { id: "strangles", title: "Strangles", term: "Shime-waza", kanji: "絞技", cats: ["shime"] },
  { id: "locks", title: "Joint locks", term: "Kansetsu-waza", kanji: "関節技", cats: ["kan"] },
];

/** Kodokan kinshi-waza: not allowed in randori or competition. */
export const PROHIBITED: ReadonlySet<string> = new Set(["Kani-basami", "Kawazu-gake", "Do-jime", "Ashi-garami"]);

export const KATA_URL = "https://www.kodokan.org/en/techniques/kata/textbook/";

export const GROUPS: readonly Group[] = [
  {
    label: "Fundamental judo", age: "Up to 10 years", belts: [
      {
        id: "yellow", name: "Yellow Belt", grade: "5th Kyu", techniques: [
          ["Tai-otoshi", "体落", "Body Drop", "te", "4x6S3Q-Ktv8"],
          ["Uki-goshi", "浮腰", "Floating Hip Throw", "koshi", "bPKwtB4lyOQ"],
          ["O-uchi-gari", "大内刈", "Large Inner Reap", "ashi", "0itJFhV9pDQ"],
          ["Ko-uchi-gari", "小内刈", "Small Inner Reap", "ashi", "3Jb3tZvr9Ng"],
          ["O-soto-otoshi", "大外落", "Large Outer Drop", "ashi", "2DsVvDw7b8g"],
          ["Hiza-guruma", "膝車", "Knee Wheel", "ashi", "JPJx9-oAVns"],
          ["Kuzure-kesa-gatame", "崩袈裟固", "Modified Scarf Hold", "osae", "Q2fb9jaoUFQ"],
          ["Yoko-shiho-gatame", "横四方固", "Side-locking Four-corner Hold", "osae", "TT7XJVSEQxA"],
        ],
      },
      {
        id: "orange", name: "Orange Belt", grade: "4th Kyu", techniques: [
          ["Seoi-nage", "背負投", "Shoulder Throw", "te", "zIq0xI0ogxk"],
          ["Ippon-seoi-nage", "一本背負投", "One-armed Shoulder Throw", "te", "FQnOlCxo4oI"],
          ["Koshi-guruma", "腰車", "Hip Wheel", "koshi", "SU7Id6uVJ44"],
          ["O-goshi", "大腰", "Large Hip Throw", "koshi", "yhu1mfy2vJ4"],
          ["De-ashi-harai", "出足払", "Forward Foot Sweep", "ashi", "4BUUvqxi_Kk"],
          ["Okuri-ashi-harai", "送足払", "Foot Sweep", "ashi", "nw1ZdRjrdRI"],
          ["O-soto-gari", "大外刈", "Large Outer Reap", "ashi", "c-A_nP7mKAc"],
          ["Ko-soto-gari", "小外刈", "Small Outer Reap", "ashi", "jeQ541ScLB4"],
          ["Ko-soto-gake", "小外掛", "Small Outer Hook", "ashi", "8b6kY4s4zH4"],
          ["Kesa-gatame", "袈裟固", "Scarf Hold", "osae", "NDaQuJOFBYk"],
          ["Kami-shiho-gatame", "上四方固", "Upper Four-corner Hold", "osae", "HFuMjOv0WN8"],
          ["Tate-shiho-gatame", "縦四方固", "Straight Four-corner Hold", "osae", "55-rFmBx53g"],
        ],
      },
      {
        id: "green", name: "Green Belt", grade: "3rd Kyu", techniques: [
          ["Uki-otoshi", "浮落", "Floating Drop", "te", "6H5tmncOY4Q"],
          ["Sumi-otoshi", "隅落", "Corner Drop", "te", "lLU9wv52ni0"],
          ["Harai-goshi", "払腰", "Hip Sweep", "koshi", "qTo8HlAAkOo"],
          ["Hane-goshi", "跳腰", "Hip Spring", "koshi", "M9_7De6A1kk"],
          ["Sasae-tsurikomi-ashi", "支釣込足", "Supporting-foot Lift-pull Throw", "ashi", "699i--pvYmE"],
          ["Uchi-mata", "内股", "Inner Thigh Reaping Throw", "ashi", "iUpSu5J-bgw"],
          ["Ashi-guruma", "足車", "Leg Wheel", "ashi", "ROeayhvom9U"],
          ["O-guruma", "大車", "Large Wheel", "ashi", "SnZciTAY9vc"],
          ["Kata-gatame", "肩固", "Shoulder Hold", "osae", "zQR3IOXxO_Q"],
          ["Kuzure-kami-shiho-gatame", "崩上四方固", "Modified Upper Four-corner Hold", "osae", "YUrogQWdwiY"],
          ["Ura-gatame", "裏固", "Back Pin", "osae", "eeAHZB0v3XY"],
          ["Ushiro-kesa-gatame", "後袈裟固", "Reverse Scarf Hold", "osae", "SBapox2M2dE"],
        ],
        kata: { numbers: "13–14", title: "Nage-no-Kata Set 1", description: "Te-waza introduction (uki-otoshi, seoi-nage). Complete set for judoka over 12 years old." },
      },
    ],
  },
  {
    label: "Competition judo", age: "11 to 14 years", belts: [
      {
        id: "blue", name: "Blue Belt", grade: "2nd Kyu", techniques: [
          ["Tsubame-gaeshi", "燕返", "Swallow Counter", "ashi", "GwweWqqFB5g"],
          ["O-uchi-gaeshi", "大内返", "Large Inner Reap Counter", "ashi", "dCyZTXyjIXE"],
          ["O-soto-gaeshi", "大外返", "Large Outer Reaping Throw Counter", "ashi", "8ZjM3X_EANo"],
          ["Ko-uchi-gaeshi", "小内返", "Small Inner Reaping Throw Counter", "te", "_MWAdYi_LC4"],
          ["Seoi-otoshi", "背負落", "Dropping Shoulder Throw", "te", "vu1TMVNnq34"],
          ["Tsurikomi-goshi", "釣込腰", "Lift-pull Hip Throw", "koshi", "McfzA0yRVt4"],
          ["Sode-tsurikomi-goshi", "袖釣込腰", "Sleeve Lift-pull Hip Throw", "koshi", "QsmAxpmYLOI"],
          ["Tsuri-goshi", "釣腰", "Lifting Hip Throw", "koshi", "51Htlp7xEvE"],
          ["Ushiro-goshi", "後腰", "Back Hip Throw", "koshi", "ORIYstuxYT8"],
          ["Utsuri-goshi", "移腰", "Hip Transfer", "koshi", "4pQd_bEnlf0"],
          ["Tomoe-nage", "巴投", "Circular Throw", "ma", "880WbHvHv6A"],
          ["Sumi-gaeshi", "隅返", "Corner Throw", "ma", "5VhduA5xkbA"],
          ["Nami-juji-jime", "並十字絞", "Normal Cross-handed Strangle", "shime", "k2cHry9HByQ"],
          ["Gyaku-juji-jime", "逆十字絞", "Reverse Cross Strangle", "shime", "t3tQriIPdlI"],
          ["Kata-juji-jime", "片十字絞", "Half Cross-handed Strangle", "shime", "3VZVUAmiMD8"],
          ["Hadaka-jime", "裸絞", "Naked Strangle", "shime", "9f0n8jez7iA"],
          ["Okuri-eri-jime", "送襟絞", "Sliding Collar Strangle", "shime", "EiqyoVcIAi8"],
          ["Kataha-jime", "片羽絞", "Single-wing Strangle", "shime", "yaTGgRjnwB8"],
          ["Sode-guruma-jime", "袖車絞", "Sleeve-wheel Strangle", "shime", "E3nvQzClcAU"],
          ["Sankaku-jime", "三角絞", "Triangular Strangle", "shime", "lq1CUBRAm7s"],
        ],
        kata: { numbers: "21–22", title: "Nage-no-Kata Set 2", description: "Koshi-waza introduction (uki-goshi, harai-goshi). Complete set for judoka over 12 years old." },
      },
      {
        id: "brown", name: "Brown Belt", grade: "1st Kyu", techniques: [
          ["Ko-uchi-makikomi", "小内巻込", "Small Inner Wrap-around Throw", "yoko", "_1eygIXLD_w"],
          ["Uchi-makikomi", "内巻込", "Inner Wrap-around", "yoko", "5BowcjduxVc"],
          ["Soto-makikomi", "外巻込", "Outer Wrap-around Throw", "yoko", "bWG9O1BVKtQ"],
          ["Harai-makikomi", "払巻込", "Hip Sweep Wrap-around Throw", "yoko", "VBaHzKaCXss"],
          ["Hane-makikomi", "跳巻込", "Springing Wrap-around Throw", "yoko", "6CRBGLGz9j8"],
          ["Uchi-mata-makikomi", "内股巻込", "Inner Thigh Wrap-around Throw", "yoko", "jZXENTLpJCI"],
          ["O-soto-makikomi", "大外巻込", "Large Outside Wrap-around Throw", "yoko", "DGDv2oMwmas"],
          ["Ura-nage", "裏投", "Back Throw", "ma", "Fgi9b8DJ5sQ"],
          ["Yoko-guruma", "横車", "Side Wheel", "yoko", "MehP6I5cY2c"],
          ["Tani-otoshi", "谷落", "Valley Drop", "yoko", "3b9Me3Fohpk"],
          ["Uki-waza", "浮技", "Floating Throw", "yoko", "weVOpJ63gII"],
          ["Yoko-gake", "横掛", "Side Body Drop", "yoko", "tP1Sj1uDfSo"],
          ["Uki-gatame", "浮固", "Floating Hold", "osae", "e_lAjik1SUM"],
          ["Ude-garami", "腕緘", "Entangled Arm Lock", "kan", "AIlTvZb4RlE"],
          ["Ude-hishigi-juji-gatame", "腕挫十字固", "Cross Armlock", "kan", "OWgSOlCuMXw"],
          ["Ude-hishigi-ude-gatame", "腕挫腕固", "Arm Armlock", "kan", "SBf0aTma1VI"],
          ["Ude-hishigi-te-gatame", "腕挫手固", "Hand Armlock", "kan", "6DnvhY0tQVM"],
          ["Ude-hishigi-hara-gatame", "腕挫腹固", "Stomach Armlock", "kan", "ZzEycg8R_9M"],
          ["Ude-hishigi-waki-gatame", "腕挫腋固", "Armpit Armlock", "kan", "8F5p1zuJRG0"],
          ["Ude-hishigi-hiza-gatame", "腕挫膝固", "Knee Armlock", "kan", "H2HtAJdiJcE"],
          ["Ude-hishigi-ashi-gatame", "腕挫脚固", "Leg Armlock", "kan", "ClY7g_pX-4s"],
          ["Ude-hishigi-sankaku-gatame", "腕挫三角固", "Triangular Armlock", "kan", "WefAmW4azhk"],
        ],
        kata: { numbers: "23–24", title: "Nage-no-Kata Set 3", description: "Ashi-waza introduction (okuri-ashi-harai, sasae-tsurikomi-ashi). Complete set for judoka over 12 years old." },
      },
    ],
  },
  {
    label: "Performance judo", age: "From 15 years", belts: [
      {
        id: "black-1", name: "Black Belt", grade: "1st Dan", japanese: { kanji: "初段", romaji: "Shodan" }, techniques: [
          ["Uchi-mata-sukashi", "内股すかし", "Inner Thigh Reaping Throw Slip", "te", "V-RS3uhtVWM"],
          ["Yama-arashi", "山嵐", "Mountain Storm", "te", "MGlyKmSuzdc"],
          ["Harai-tsurikomi-ashi", "払釣込足", "Lift-pull Foot Sweep", "ashi", "gGPXvWL8VbE"],
          ["O-soto-guruma", "大外車", "Large Outer Wheel", "ashi", "92KbCm6pQeI"],
          ["Uchi-mata-gaeshi", "内股返", "Inner Thigh Reaping Throw Counter", "ashi", "Sy6sLWxkWYw"],
          ["Harai-goshi-gaeshi", "払腰返", "Hip Sweep Counter", "ashi", "4U3It-7PPsc"],
          ["Hane-goshi-gaeshi", "跳腰返", "Hip Spring Counter", "ashi", "9bZAZSBtnGs"],
          ["Hikikomi-gaeshi", "引込返", "Pulling-down Sacrifice Throw", "ma", "92zUYWBp5N8"],
          ["Yoko-otoshi", "横落", "Side Drop", "yoko", "MnNG67pF_a0"],
          ["Yoko-wakare", "横分", "Side Separation", "yoko", "bp1tscHlePI"],
          ["Daki-wakare", "抱分", "Rear Trunk Turnover", "yoko", "Hr0cOMGBDYo"],
          ["Ryote-jime", "両手絞", "Two-handed Strangle", "shime", "-RHC4V7TQiY"],
          ["Katate-jime", "片手絞", "One-hand Strangle", "shime", "cHeIs-fSqwE"],
          ["Tsukkomi-jime", "突込絞", "Thrusting Strangle", "shime", "dKKpnD3eLcY"],
        ],
        kata: { numbers: "15–29", title: "Nage-no-Kata, Sets 1–5", description: "Demonstration as Tori & Uke." },
      },
      {
        id: "black-2", name: "Black Belt", grade: "2nd Dan", japanese: { kanji: "二段", romaji: "Nidan" }, techniques: [
          ["Morote-gari", "双手刈", "Two-handed Reap", "te", "BHLQS4K85bs"],
          ["Tawara-gaeshi", "俵返", "Bag of Rice Throw", "ma", "TmTWgrmViZc"],
          ["Kata-guruma", "肩車", "Shoulder Wheel", "te", "cnHRhSy8yi4"],
          ["Sukui-nage", "掬投", "Scooping Throw", "te", "vU6aJ2kFxoI"],
          ["Obi-otoshi", "帯落", "Belt Drop", "te", "ff8U2TVZIYI"],
          ["Obi-tori-gaeshi", "帯取返", "Belt-grab Throw", "te", "bpc82SrunUU"],
          ["Kuchiki-taoshi", "朽木倒", "One-handed Throw-down", "te", "ZNL47q1aJNY"],
          ["Kibisu-gaeshi", "踵返", "Heel Trip", "te", "tJylJYfBliA"],
          ["Kani-basami", "蟹挟", "Scissors Throw", "yoko", "OR-HGHnarYc"],
          ["Kawazu-gake", "河津掛", "Single-leg Entanglement", "yoko", "w6G57bWACi0"],
          ["Do-jime", "胴絞", "Trunk Strangle (Body Scissors)", "shime", "D_0fFcoIbvY"],
          ["Ashi-garami", "足緘", "Leg Entanglement", "kan", "BWWb0GoAtZw"],
        ],
        kata: { numbers: "13–27", title: "Katame-no-Kata, Sets 1–3", description: "Demonstration as Tori & Uke." },
        note: "Based on the 100 Kodokan classified judo techniques, Nage-no-Kata and Katame-no-Kata, including judo basic skills, structured according to Long Term Athlete Development principles.",
      },
    ],
  },
];
