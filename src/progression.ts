export const PROGRAMME_URL =
  "https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/up/2026/01/IJF_colour_belts_programme_202-1768917920.xlsx";

/**
 * IJF colour-belt programme 2026: how a judoka progresses from one grade to the next.
 * Transcribed from the IJF coloured belt grading system spreadsheet, with spelling made consistent
 * with the rest of the site. Techniques are not repeated here: each step links to its grade on the main page.
 */

/** Belt shown on the step; also the colour of its swatch. */
export type StepBelt =
  | "white" | "white-yellow" | "yellow" | "yellow-orange" | "orange" | "orange-green" | "green" | "green-blue" | "blue" | "blue-brown"
  | "brown" | "black-1" | "black-2";

export interface Step {
  id: string;
  belt: StepBelt;
  /** "5th kyu", "1st dan" */
  grade: string;
  /** Belt name, e.g. "white belt, 1 star". */
  name: string;
  /** White-belt stages: stars earned (the IJF programme marks these with stripes on the belt). */
  stars?: number;
  /** Typical age for the children's track, e.g. "7 years". */
  age?: string;
  /** Minimum time, as the programme gives it. */
  minimum?: string;
  /** The stage's theme, e.g. "Discovery". */
  stage?: string;
  objectives: readonly string[];
  /** Throws and groundwork focus, e.g. "Learning up to 5 throws". */
  focus: readonly string[];
  exercises: readonly string[];
  examination: readonly string[];
  /** Grade on the main page whose techniques this step works on. */
  techniques: string;
}

export interface Track {
  id: "children" | "older";
  label: string;
  description: string;
  steps: readonly Step[];
}

const YOUNG_OBJECTIVES = ["Awakening to judo", "Discovering judo through play", "Judo as education", "Involving parents", "Safe practice"];
const WHITE_EXERCISES = ["Falling: mae-ukemi (kneeling), ushiro-ukemi and yoko-ukemi (sitting)"];

const ORANGE_YOUNG_OBJECTIVES = ["Technical improvement", "Confidence in ukemi", "Introduction to exercises (uchi-komi, kagari-geiko)", "Introduction to refereeing"];
const ORANGE_EXAM = ["Demonstration of 9 nage-no-kata type throws, linked together on the move", "Randori", "7 consecutive osaekomi with escapes, in sequence"];

const GREEN_EXERCISES = [
  "Ukemi on both sides", "Mae-mawari-ukemi over an obstacle", "Aiyotsu and kenka-yotsu", "Happo-no-kuzushi",
  "Kuzushi, tsukuri and kake", "Circular tsugi-ashi", "Randori", "Renraku-waza and renzoku-waza",
];
const SELF_DEFENCE_STRIKES = "Self-defence: tori answers uke's kicks, arm attacks and punches with judo techniques";

const BLUE_OBJECTIVES = ["Adapting to each child's goals: competition, refereeing, teaching or leisure", "In-depth self-defence"];
const BLUE_EXAM_THROWS = ["Self-defence against collar and sleeve grips, using judo techniques", "Nage-no-Kata, set 2", "12-throw sequence moving in suri-ashi"];

const BROWN: Omit<Step, "id" | "age" | "focus"> = {
  belt: "brown", grade: "1st kyu", name: "brown belt", minimum: "1 year",
  objectives: ["Preparing for 1st dan", "Proficiency in self-defence"],
  exercises: ["Refereeing", "Coaching", "Running a refereeing table", "Shiai"],
  examination: ["Self-defence against kicks, using judo techniques", "Nage-no-Kata, set 3", "12-throw sequence moving in suri-ashi", "Katame-no-Kata: osaekomi set"],
  techniques: "brown",
};

/** Dan grades: the programme lists only the techniques to demonstrate. */
const DANS: readonly Step[] = [
  { id: "black-1", belt: "black-1", grade: "1st dan", name: "black belt", objectives: [], focus: ["Demonstration of the 1st dan nage-waza and shime-waza"], exercises: [], examination: [], techniques: "black-1" },
  { id: "black-2", belt: "black-2", grade: "2nd dan", name: "black belt", objectives: [], focus: ["Demonstration of the 2nd dan nage-waza, shime-waza and kansetsu-waza"], exercises: [], examination: [], techniques: "black-2" },
];

export const TRACKS: readonly Track[] = [
  {
    id: "older",
    label: "From 12 years",
    description: "For judoka who start at 12 years or older: one step per grade.",
    steps: [
      {
        id: "yellow", belt: "yellow", grade: "5th kyu", name: "yellow belt", age: "from 12 years", minimum: "6 months from white", stage: "Learning",
        objectives: ["Safe practice", "Judo fundamentals", "Games with a partner", "Ne-waza and tachi-waza"],
        focus: ["Learning 6 nage-waza techniques on the move", "Learning osaekomi"],
        exercises: ["Falling with tori: mae, ushiro and yoko-ukemi", "Mae-mawari-ukemi (from low position)", "Tsugi-ashi in 4 directions", "Ne-waza practice: escaping osaekomi, returning, turning over, freeing a trapped leg"],
        examination: ["Demonstration of 6 nage-no-kata type throws, linked together on the move", "Ne-waza randori", "2 consecutive osaekomi with 3 escapes, in sequence"],
        techniques: "yellow",
      },
      {
        id: "orange", belt: "orange", grade: "4th kyu", name: "orange belt", age: "from 12 years", minimum: "1 year", stage: "Learning",
        objectives: ["Technical improvement", "Confidence in ukemi", "Randori, uchi-komi and kagari-geiko", "Introduction to refereeing"],
        focus: ["Learning 9 nage-waza techniques on the move", "Improving osaekomi"],
        exercises: ["Falling from standing: mae, ushiro and yoko-ukemi", "Confidence building", "Ne-waza randori", "Yakusoku-geiko", "Tachi-waza randori", "Ne-waza shiai"],
        examination: [...ORANGE_EXAM.slice(0, 1), "Club shiai with refereeing", "Ne-waza randori", "5 consecutive osaekomi with 7 escapes, in sequence"],
        techniques: "orange",
      },
      {
        id: "green", belt: "green", grade: "3rd kyu", name: "green belt", age: "from 12 years", minimum: "1 year", stage: "Personal expression",
        objectives: ["Working on one or more favourite techniques (tokui-waza)", "Start of the preparation for 1st dan", "Assisting the teacher", "Warm-up management", "Shiai, technique and culture", "Fundamentals of self-defence"],
        focus: ["Learning 8 techniques while moving", "Osaekomi improvement", "Initiation: shime and gatame-waza"],
        exercises: ["Ukemi both sides", "Mae-mawari-ukemi with obstacle", "Aiyotsu and kenka-yotsu", "Happo-no-kuzushi", "Kuzushi-tsukuri-kake", "Circular tsugi-ashi", "Randori", "Renraku and renzoku-waza"],
        examination: ["Self-defence: uke's attack (feet, arms, fists…), tori's counter with judo techniques", "Nage-no-Kata, set 1", "8-technique sequence moving in suri-ashi", "Shime and gatame-waza", "9 consecutive osaekomi with 11 escapes, in sequence"],
        techniques: "green",
      },
      {
        id: "blue", belt: "blue", grade: "2nd kyu", name: "blue belt", age: "from 13 years", minimum: "1 year",
        objectives: ["Tokui-waza sequence and action reaction", "Adjust to children's objectives (competition, refereeing, teaching, leisure)", "In-depth learning of self-defence"],
        focus: ["Learning the nage-waza techniques", "The 8 strangles of the grade"],
        exercises: ["Refereeing", "Physical preparation", "Tandoku-renshu (tokui-waza)", "Tachi-waza and ne-waza sequence"],
        examination: ["Self-defence with collar and sleeve grips, using judo techniques", "Nage-no-Kata, 2nd series", "12-technique sequence moving in suri-ashi", "6 shime-waza and 3 gatame-waza in a row"],
        techniques: "blue",
      },
      { belt: "brown", grade: "1st kyu", name: "brown belt", minimum: "1 year", id: "brown", age: "from 14 years", objectives: ["Preparation for 1st dan", "Proficiency in self-defence"], focus: ["Learning techniques", "The 10 groundwork techniques of the grade"], exercises: ["Support for judo training", "Refereeing", "Coaching", "Running a refereeing table", "Shiai"], examination: ["Self-defence from kicking, with judo techniques", "Nage-no-Kata, 3rd series", "12-technique sequence moving in suri-ashi", "Katame-no-Kata: osaekomi series"], techniques: "brown" },
      ...DANS,
    ],
  },
  {
    id: "children",
    label: "Children",
    description: "For children who start young: three white-belt stages, each earning a star, then a half belt for the first step of each new grade.",
    steps: [
      {
        id: "c-white-1", belt: "white", grade: "6th kyu", name: "white belt, 1 star", stars: 1, age: "5 years", minimum: "3 months from white", stage: "Discovery",
        objectives: YOUNG_OBJECTIVES, focus: ["First contact with 1 nage-waza technique", "First contact with osaekomi"],
        exercises: [...WHITE_EXERCISES, "Moving: ayumi-ashi forwards and backwards"],
        examination: ["Static demonstration of 1 nage-waza technique", "1 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-2", belt: "white", grade: "6th kyu", name: "white belt, 2 stars", stars: 2, minimum: "3 months", stage: "Discovery",
        objectives: YOUNG_OBJECTIVES, focus: ["Learning 3 nage-waza techniques", "Learning 2 osaekomi"],
        exercises: [...WHITE_EXERCISES, "Ne-waza randori", "Kagari-geiko"],
        examination: ["Static demonstration of 3 nage-waza techniques", "2 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-3", belt: "white", grade: "6th kyu", name: "white belt, 3 stars", stars: 3, minimum: "3 months", stage: "Improvement",
        objectives: YOUNG_OBJECTIVES, focus: ["Learning 5 nage-waza techniques", "Learning 2 osaekomi"],
        exercises: [...WHITE_EXERCISES, "Moving in pairs"],
        examination: ["Static demonstration of 5 nage-waza techniques", "2 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-yellow", belt: "white-yellow", grade: "6th kyu", name: "white-yellow belt", age: "6 years", minimum: "3 months", stage: "Improvement",
        objectives: ["Starting judo", "Games and technique", "Practice with a partner in safe conditions"], focus: ["Learning 6 nage-waza techniques", "Ne-waza practice, escaping osaekomi"],
        exercises: [...WHITE_EXERCISES, "From standing to the ground"],
        examination: ["Static demonstration of 6 nage-waza techniques", "2 consecutive osaekomi with 2 escapes, in sequence"], techniques: "yellow",
      },
      {
        id: "c-yellow", belt: "yellow", grade: "5th kyu", name: "yellow belt", age: "6 years", minimum: "6 months", stage: "Learning",
        objectives: ["Games and technique", "Combat with a partner in safe conditions"], focus: ["Further training: 6 tachi-waza in movement", "Osaekomi initiation"],
        exercises: ["Falling with tori: mae, ushiro and yoko-ukemi", "Preparation of the technical presentation for yellow belt", "Ne-waza practice: escaping osaekomi, returning"],
        examination: ["Demonstration of 6 nage-no-kata type throws, linked together on the move", "2 consecutive osaekomi with 3 escapes, in sequence"], techniques: "yellow",
      },
      {
        id: "c-orange-7", belt: "yellow-orange", grade: "4th kyu", name: "yellow-orange belt", age: "7 years", minimum: "1 year", stage: "Learning",
        objectives: ORANGE_YOUNG_OBJECTIVES, focus: ["Learning up to 5 nage-waza techniques", "Improving osaekomi"],
        exercises: ["Falling from standing: mae, ushiro and yoko-ukemi", "Tai-sabaki", "Tachi-waza while moving", "Sequences from escaping osaekomi"],
        examination: ["Demonstration of 5 nage-no-kata type throws, linked together on the move", "Randori", "3 consecutive osaekomi with 5 escapes, in sequence"], techniques: "orange",
      },
      {
        id: "c-orange-8", belt: "orange", grade: "4th kyu", name: "orange belt", age: "8 years", minimum: "1 year", stage: "Learning",
        objectives: ORANGE_YOUNG_OBJECTIVES, focus: ["Learning up to 5 nage-waza techniques", "Improving osaekomi, half the holds"],
        exercises: ["Falling from standing: mae, ushiro and yoko-ukemi", "Confidence building", "Moving sequences", "Tachi-waza and ne-waza", "Sequences from escaping osaekomi"],
        examination: ["Demonstration of 5 nage-no-kata type throws, linked together on the move", "Randori", "5 consecutive osaekomi with 7 escapes, in sequence"], techniques: "orange",
      },
      {
        id: "c-orange-green", belt: "orange-green", grade: "3rd kyu", name: "orange-green belt", stage: "Personal expression",
        objectives: ["Mobility and technical sequences", "Assisting the teacher", "Supporting less experienced judoka", "Introduction to self-defence"],
        focus: ["Learning 4 nage-waza techniques", "Improving osaekomi, half the holds"],
        exercises: GREEN_EXERCISES,
        examination: [SELF_DEFENCE_STRIKES, "Demonstration of 4 nage-no-kata type throws, linked together on the move", "7 consecutive osaekomi with 9 escapes, in sequence"], techniques: "green",
      },
      {
        id: "c-green", belt: "green", grade: "3rd kyu", name: "green belt", age: "9 years", minimum: "1 year", stage: "Personal expression",
        objectives: ["Working on favourite techniques (tokui-waza)", "Starting to prepare for 1st dan", "Shiai, technique and culture", "Self-defence fundamentals"],
        focus: ["Learning 8 nage-waza techniques", "Improving osaekomi, half the holds"],
        exercises: GREEN_EXERCISES,
        examination: [SELF_DEFENCE_STRIKES, "Nage-no-Kata, set 1", "4-throw sequence moving in suri-ashi", "9 consecutive osaekomi with 11 escapes, in sequence"], techniques: "green",
      },
      {
        id: "c-blue-10", belt: "green-blue", grade: "2nd kyu", name: "green-blue belt", age: "10½ years", minimum: "1 year",
        objectives: BLUE_OBJECTIVES, focus: ["Learning half of the nage-waza techniques", "Introduction to shime-waza and gatame-waza: technique only, not in randori"],
        exercises: ["Refereeing", "Physical preparation", "Tandoku-renshu", "Tachi-waza and ne-waza sequences"],
        examination: [...BLUE_EXAM_THROWS, "2 shime-waza and 2 gatame-waza in a row"], techniques: "blue",
      },
      {
        id: "c-blue-12", belt: "blue", grade: "2nd kyu", name: "blue belt", age: "12 years", minimum: "1 year",
        objectives: ["Tokui-waza sequences, action and reaction", BLUE_OBJECTIVES[0]!, "Supervised tasks delegated by the teacher", BLUE_OBJECTIVES[1]!],
        focus: ["Further training in all the nage-waza techniques", "Introduction to shime-waza and gatame-waza: technique only, not in randori"],
        exercises: ["Shiai", "Refereeing practice", "Explaining a technique", "Mondo (questions and answers)", "Tandoku-renshu (tokui-waza)"],
        examination: [...BLUE_EXAM_THROWS, "6 shime-waza and 3 gatame-waza in a row"], techniques: "blue",
      },
      { ...BROWN, id: "c-blue-brown", belt: "blue-brown", name: "blue-brown belt", age: "13 years", focus: ["Learning half of the nage-waza techniques", "The 10 groundwork techniques of the grade"] },
      // Then the full brown belt, with the programme's "over 13 years" content.
      { ...BROWN, id: "c-brown", age: "from 14 years", focus: ["Learning all the nage-waza techniques", "The 10 groundwork techniques of the grade"] },
      ...DANS.map((d) => ({ ...d, id: `c-${d.id}` })),
    ],
  },
];

/** The step for each grade on the main page, from the track that starts at 12 years. */
export const STEP_FOR_GRADE: ReadonlyMap<string, Step> = new Map(TRACKS[0]!.steps.map((s) => [s.techniques, s]));
