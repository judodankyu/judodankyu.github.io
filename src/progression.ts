export const PROGRAMME_URL =
  "https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/up/2026/01/IJF_colour_belts_programme_202-1768917920.xlsx";

/**
 * IJF colour-belt programme 2026: how a judoka progresses from one grade to the next.
 * Transcribed from the IJF coloured belt grading system spreadsheet, with spelling made consistent
 * with the rest of the site. Techniques are not repeated here: each step links to its grade on the main page.
 */

/** Belt shown on the step; also the colour of its swatch. */
export type StepBelt =
  | "white" | "white-yellow" | "yellow" | "orange" | "orange-green" | "green" | "blue" | "brown" | "black-1" | "black-2";

export interface Step {
  id: string;
  belt: StepBelt;
  /** "5th kyu", "1st dan" */
  grade: string;
  /** Belt as worded in the programme, e.g. "white belt, 1 stripe". */
  name: string;
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
  belt: "brown", grade: "1st kyu", name: "brown belt", minimum: "1 year", stage: "Supporting judo training",
  objectives: ["Preparing for 1st dan", "Proficiency in self-defence"],
  exercises: ["Refereeing", "Coaching", "Running a refereeing table", "Shiai"],
  examination: ["Self-defence against kicks, using judo techniques", "Nage-no-Kata, set 3", "12-throw sequence moving in suri-ashi", "Katame-no-Kata: osaekomi set"],
  techniques: "brown",
};

/** Dan grades: the programme lists only the techniques to demonstrate. */
const DANS: readonly Step[] = [
  { id: "black-1", belt: "black-1", grade: "1st dan", name: "black belt", objectives: [], focus: ["Demonstration of the 1st dan throws and strangles"], exercises: [], examination: [], techniques: "black-1" },
  { id: "black-2", belt: "black-2", grade: "2nd dan", name: "black belt", objectives: [], focus: ["Demonstration of the 2nd dan throws, Do-jime and Ashi-garami"], exercises: [], examination: [], techniques: "black-2" },
];

export const TRACKS: readonly Track[] = [
  {
    id: "older",
    label: "From 11 years",
    description: "For judoka who start at 11 years or older: one step per grade.",
    steps: [
      {
        id: "yellow", belt: "yellow", grade: "5th kyu", name: "yellow belt", minimum: "6 months", stage: "Learning",
        objectives: ["Safe practice", "Judo fundamentals", "Games of opposition", "Ne-waza and tachi-waza"],
        focus: ["Learning 6 throws on the move", "Learning osaekomi"],
        exercises: ["Falling with tori: mae, ushiro and yoko-ukemi", "Mae-mawari-ukemi from a low position", "Tsugi-ashi in 4 directions", "Ne-waza: escaping osaekomi, turning over, freeing a trapped leg"],
        examination: ["Demonstration of 6 nage-no-kata type throws, linked together on the move", "Randori", "3 consecutive osaekomi with escapes, freeing a trapped leg in sequence"],
        techniques: "yellow",
      },
      {
        id: "orange", belt: "orange", grade: "4th kyu", name: "orange belt", minimum: "1 year", stage: "Learning",
        objectives: ["Technical improvement", "Confidence in ukemi", "Randori and uchi-komi", "Introduction to refereeing"],
        focus: ["Learning 9 throws on the move", "Improving osaekomi"],
        exercises: ["Falling from standing", "Confidence building", "Ne-waza randori", "Yakusoku-geiko", "Tachi-waza randori", "Shiai"],
        examination: [...ORANGE_EXAM.slice(0, 1), "Club shiai with refereeing", ...ORANGE_EXAM.slice(1)],
        techniques: "orange",
      },
      {
        id: "green", belt: "green", grade: "3rd kyu", name: "green belt", minimum: "1 year", stage: "Personal expression",
        objectives: ["Working on favourite techniques (tokui-waza)", "Starting to prepare for 1st dan", "Assisting the teacher, leading warm-ups", "Shiai, technique and culture", "Self-defence fundamentals"],
        focus: ["Learning 8 throws on the move", "Improving osaekomi", "Introduction to shime-waza and gatame-waza"],
        exercises: GREEN_EXERCISES,
        examination: [SELF_DEFENCE_STRIKES, "Nage-no-Kata, set 1", "8-throw sequence moving in suri-ashi", "Shime-waza and gatame-waza", "11 consecutive osaekomi with escapes, in sequence"],
        techniques: "green",
      },
      {
        id: "blue", belt: "blue", grade: "2nd kyu", name: "blue belt", age: "from 12 years", minimum: "1 year", stage: "Refereeing",
        objectives: ["Tokui-waza sequences, action and reaction", ...BLUE_OBJECTIVES],
        focus: ["Learning the throws", "The 8 strangles of the grade"],
        exercises: ["Refereeing", "Physical preparation", "Tandoku-renshu (tokui-waza)", "Tachi-waza and ne-waza sequences"],
        examination: [...BLUE_EXAM_THROWS, "6 shime-waza and 3 gatame-waza in a row"],
        techniques: "blue",
      },
      { ...BROWN, id: "brown", age: "from 13 years", focus: ["Learning all the throws", "The 10 groundwork techniques of the grade"] },
      ...DANS,
    ],
  },
  {
    id: "children",
    label: "Children",
    description: "For children who start young: white-belt stages first, and smaller steps through each colour.",
    steps: [
      {
        id: "c-white-1", belt: "white", grade: "6th kyu", name: "white belt, 1 stripe", age: "5 years", minimum: "3 months", stage: "Discovery",
        objectives: YOUNG_OBJECTIVES, focus: ["First contact with 6 throws", "First contact with osaekomi"],
        exercises: [...WHITE_EXERCISES, "Moving: ayumi-ashi forwards and backwards"],
        examination: ["Static demonstration of 1 throw", "1 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-2", belt: "white", grade: "6th kyu", name: "white belt, 2 stripes", minimum: "3 months", stage: "Discovery",
        objectives: YOUNG_OBJECTIVES, focus: ["Learning 3 throws", "Learning 1 osaekomi"],
        exercises: [...WHITE_EXERCISES, "Ne-waza randori", "Kagari-geiko"],
        examination: ["Static demonstration of 3 throws", "2 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-3", belt: "white", grade: "6th kyu", name: "white belt, 3 stripes", minimum: "3 months", stage: "Improvement",
        objectives: YOUNG_OBJECTIVES, focus: ["Learning 5 throws", "Learning 2 osaekomi"],
        exercises: [...WHITE_EXERCISES, "Moving in pairs"],
        examination: ["Static demonstration of 5 throws", "2 static osaekomi"], techniques: "yellow",
      },
      {
        id: "c-white-yellow", belt: "white-yellow", grade: "6th kyu", name: "white-yellow belt", age: "6 years", minimum: "3 months", stage: "Improvement",
        objectives: ["Starting judo", "Games and technique", "Opposition in safe conditions"], focus: ["Learning 6 throws", "Ne-waza practice, escaping osaekomi"],
        exercises: [...WHITE_EXERCISES, "From standing to the ground"],
        examination: ["Static demonstration of 6 throws", "2 escapes from osaekomi", "2 osaekomi in sequence"], techniques: "yellow",
      },
      {
        id: "c-yellow", belt: "yellow", grade: "5th kyu", name: "yellow belt", age: "6 years", minimum: "6 months", stage: "Learning",
        objectives: ["Games and technique", "Opposition in safe conditions"], focus: ["6 throws on the move", "Introduction to osaekomi"],
        exercises: ["Falling with tori: mae, ushiro and yoko-ukemi", "Preparing the yellow-belt demonstration", "Ne-waza: escaping osaekomi, turning over"],
        examination: ["Demonstration of 6 nage-no-kata type throws, linked together on the move", "3 escapes from osaekomi", "3 osaekomi in sequence"], techniques: "yellow",
      },
      {
        id: "c-orange-7", belt: "orange", grade: "4th kyu", name: "orange belt", age: "7 years", minimum: "1 year", stage: "Learning",
        objectives: ORANGE_YOUNG_OBJECTIVES, focus: ["Learning up to 5 throws", "Improving osaekomi, half the holds"],
        exercises: ["Falling from standing: mae, ushiro and yoko-ukemi", "Tai-sabaki", "Throws on the move", "Sequences from escaping osaekomi"],
        examination: ["Demonstration of 5 nage-no-kata type throws, linked together on the move", ...ORANGE_EXAM.slice(1)], techniques: "orange",
      },
      {
        id: "c-orange-8", belt: "orange", grade: "4th kyu", name: "orange belt", age: "8 years", minimum: "1 year", stage: "Learning",
        objectives: ORANGE_YOUNG_OBJECTIVES, focus: ["Learning up to 9 throws", "Improving osaekomi, half the holds"],
        exercises: ["Falling from standing", "Confidence building", "Moving sequences", "Tachi-waza and ne-waza", "Sequences from escaping osaekomi"],
        examination: ORANGE_EXAM, techniques: "orange",
      },
      {
        id: "c-orange-green", belt: "orange-green", grade: "3rd kyu", name: "orange-green belt", stage: "Personal expression",
        objectives: ["Mobility and technical sequences", "Assisting the teacher", "Supporting less experienced judoka", "Introduction to self-defence"],
        focus: ["Learning 4 throws", "Improving osaekomi, half the holds"],
        exercises: GREEN_EXERCISES,
        examination: [SELF_DEFENCE_STRIKES, "Demonstration of 4 nage-no-kata type throws, linked together on the move", "9 consecutive osaekomi with escapes, in sequence"], techniques: "green",
      },
      {
        id: "c-green", belt: "green", grade: "3rd kyu", name: "green belt", age: "9 years", minimum: "1 year", stage: "Personal expression",
        objectives: ["Working on favourite techniques (tokui-waza)", "Starting to prepare for 1st dan", "Shiai, technique and culture", "Self-defence fundamentals"],
        focus: ["Learning 8 throws", "Improving osaekomi, half the holds"],
        exercises: GREEN_EXERCISES,
        examination: [SELF_DEFENCE_STRIKES, "Nage-no-Kata, set 1", "4-throw sequence moving in suri-ashi", "11 consecutive osaekomi with escapes, in sequence"], techniques: "green",
      },
      {
        id: "c-blue-10", belt: "blue", grade: "2nd kyu", name: "blue belt", age: "10½ years", minimum: "1 year", stage: "Refereeing",
        objectives: BLUE_OBJECTIVES, focus: ["Learning half of the throws", "Introduction to shime-waza and gatame-waza: technique only, not in randori"],
        exercises: ["Refereeing", "Physical preparation", "Tandoku-renshu", "Tachi-waza and ne-waza sequences"],
        examination: [...BLUE_EXAM_THROWS, "2 shime-waza and 2 gatame-waza in a row"], techniques: "blue",
      },
      {
        id: "c-blue-12", belt: "blue", grade: "2nd kyu", name: "blue belt", age: "12 years", minimum: "1 year", stage: "Shiai",
        objectives: ["Tokui-waza sequences, action and reaction", BLUE_OBJECTIVES[0]!, "Supervised tasks delegated by the teacher", BLUE_OBJECTIVES[1]!],
        focus: ["Further training in all the throws", "Introduction to shime-waza and gatame-waza: technique only, not in randori"],
        exercises: ["Shiai", "Refereeing practice", "Explaining a technique", "Mondo (questions and answers)", "Tandoku-renshu (tokui-waza)"],
        examination: [...BLUE_EXAM_THROWS, "6 shime-waza and 3 gatame-waza in a row"], techniques: "blue",
      },
      { ...BROWN, id: "c-brown", age: "13 years", focus: ["Learning half of the throws", "The 10 groundwork techniques of the grade"] },
      ...DANS.map((d) => ({ ...d, id: `c-${d.id}` })),
    ],
  },
];

/** The step for each grade on the main page, from the track that starts at 11 years. */
export const STEP_FOR_GRADE: ReadonlyMap<string, Step> = new Map(TRACKS[0]!.steps.map((s) => [s.techniques, s]));
