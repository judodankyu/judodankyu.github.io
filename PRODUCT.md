# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Judoka (students)** preparing for their next grading: they need to see exactly which techniques and kata their target grade requires, and watch each one demonstrated.
- **Coaches** teaching the syllabus: they use it as a quick, shareable reference for what each grade asks for.

Audience is worldwide, not only the publishing club's members.

## Product Purpose

A public, English-language reference to the IJF Belt Grades Guide 2026 (yellow belt, 5th kyu, through black belt, 2nd dan). Every required technique links to the Kodokan's own demonstration video, so a judoka can go from "what do I need for my next grade?" to watching the technique in one step.

Success: a student or coach anywhere finds the requirements for a grade, and the right demonstration, within seconds on any device.

## Positioning

The IJF published the guide as a PDF. This site turns it into a searchable, linked reference: each of the 100 Kodokan-classified techniques in the guide opens its official Kodokan video, with the guide's own grade order and item numbering kept intact.

## Operating Context

- Source document: IJF *Belt Grades Guide – 2026 – ENG* (version 12), from the IJF Grades and Dan Commission, listed on ijf.org/ijf/documents. File: https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/up/2026/03/BeltGradesGuide_2026v12-177270-1772700594.pdf
- Grading context: from 2026 the IJF validates all dan grades awarded by national federations, and federations must follow the IJF programme for dan grades. The colour-belt (kyu) programme is published by the IJF, but how strictly national federations apply it for kyu grades varies. Do not describe kyu requirements as mandatory everywhere.
- Demonstrations: Kodokan "Names of Judo Techniques" and the KODOKAN × IJF ACADEMY 100 Techniques playlist (official KODOKAN YouTube channel). Kata reference: Kodokan kata textbook.

## Capabilities and Constraints

- Seven grades: yellow (5th kyu), orange (4th kyu), green (3rd kyu), blue (2nd kyu), brown (1st kyu), black (1st dan), black (2nd dan); grouped by the guide's age stages (Fundamental judo up to 10, Competition judo 11 to 14, Performance judo from 15).
- 100 techniques total, plus the Nage-no-Kata and Katame-no-Kata sets each grade requires.
- Search by romaji, kanji, or English meaning; jump straight to any grade.
- Techniques linked out to YouTube; nothing is embedded or re-hosted.
- Language: English only. Technique names stay in Japanese (romaji and kanji); Kodokan terminology is used throughout.
- Techniques the Kodokan prohibits in randori and contest (Kani-basami, Kawazu-gake, Do-jime, Ashi-garami) are flagged.
- The site mirrors the guide's content. Two kanji typos in the PDF were corrected (送足払, 支釣込足); the 6th kyu 1-star white belt reads "First contact with 1 throw" (was 6, per the guide); the 6th kyu 2-star white belt reads "Learning 2 osaekomi" (was 1, per the guide); the first kids' step minimum reads "3 months from white"; the adult yellow step minimum reads "6 months from white" and its exam is "Randori" and "2 osaekomi with 3 escapes, freeing a trapped leg in a sequence"; the kids' yellow-orange exam has 5 consecutive osaekomi (was 7), and so does the adult orange exam; kids' ages simplified to whole years: yellow 6, yellow-orange 7, brown from 14 (was 6½, 7½, from 13); adult ages: yellow, orange and green from 12 years, blue from 13, brown from 14 (blue was 12, brown was 13), adult track labelled "From 12 years" (was 11); kids' orange step has 5 throws (was 9) in focus and exam, osaekomi unchanged at 7; adult orange objective reads "Randori, uchi-komi and kagari-geiko"; adult orange exam is 5 consecutive osaekomi with 7 escapes, and so is the kids' orange exam; adult green focus, self-defence and exam follow the guide (9 osaekomi with 11 escapes, 8-technique sequence); falling from standing in the kids' and adult orange steps lists mae, ushiro and yoko-ukemi; adult yellow exercises add returning (technique names are left out of the focus, since each grade links to its techniques); kids' yellow step follows the guide list (tachi-waza and osaekomi initiation in focus without technique names, technical presentation exercise, exam 3 techniques to escape osaekomi and 2 osaekomi in sequence); the yellow kids' step age reads "6½ years" (was 6) and its objective reads "Opposition in combat in safe conditions"; the kids' yellow exam reads "2 osaekomi in sequence" (the belt has 2 osaekomi techniques); the kids' yellow-orange step is 7½ years, with "Improving osaekomi" as focus ("half the holds" removed) and "Tachi-waza while moving" as an exercise; any further deviation from the source must be deliberate and noted.
- Existing implementation: TypeScript compiled with Bun into a static site (see README.md).

## Brand Commitments

- Published by the user's club and open to everyone.
- **Decided:** the site states that it follows the IJF Belt Grades Guide 2026, worded as "Follows the IJF Belt Grades Guide 2026" and linked to the source PDF. Do not use IJF or Kodokan logos or imply endorsement.
- **Japanese title:** 柔道 段級位 (jūdō dankyūi), the standard term for the judo grade system (dan and kyū grades), shown as a quiet secondary line under the English title.
- **Open decision:** the club's name and whether it is credited on the site.

## Evidence on Hand

- Source PDF (the single source of truth for grade content): https://78884ca60822a34fb0e6-082b8fd5551e97bc65e327988b444396.ssl.cf3.rackcdn.com/up/2026/03/BeltGradesGuide_2026v12-177270-1772700594.pdf
- Kodokan official video links for all 100 techniques (verified against the KODOKAN × IJF ACADEMY playlist).
- No testimonials, usage figures, or endorsements exist. Do not fabricate any.

## Product Principles

1. **The guide is the authority.** Keep the IJF guide's grades, order and numbering. Correct only evident errors, and record each one.
2. **Japanese terms lead, English explains.** Use Kodokan terminology first, with a plain-English gloss for a worldwide audience.
3. **One tap to the real demonstration.** Every technique goes straight to the Kodokan's own video.
4. **Find your grade in seconds.** Lookup speed on a phone matters more than ornament.
5. **Safety stays visible.** Point to qualified instruction and flag techniques prohibited in contest.

## Accessibility & Inclusion

Plain, international English for readers whose first language is not English. Hold WCAG 2.2 AA (the level the current build meets).
