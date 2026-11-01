/* CalcuPortal original JEE Main Inorganic Chemistry Exceptions practice bank.
   Reference basis: NCERT-aligned SATHEE notes & NTA 2026 inorganic syllabus.
   These are independent practice questions, not NTA past-paper reproductions. */
(function(root){
"use strict";
const questions=[
  {
    "id": "p01",
    "topic": "Periodicity",
    "question": "Why is the first ionization enthalpy of Be greater than that of B, despite B having a higher atomic number?",
    "options": [
      "Be has a stable filled 2s subshell; B loses a 2p electron",
      "B has fewer protons than Be",
      "Be has an unpaired 2p electron",
      "B has a filled 2p subshell"
    ],
    "answer": 0,
    "explanation": "Be has 1s²2s², while B has 1s²2s²2p¹. Removing B's higher-energy 2p electron is easier than removing Be's 2s electron."
  },
  {
    "id": "p02",
    "topic": "Periodicity",
    "question": "Which statement correctly explains the first ionization enthalpy comparison between N and O?",
    "options": [
      "O has higher IE because its atomic number is larger",
      "N has higher IE because its half-filled 2p³ subshell is relatively stable",
      "Both have the same IE because both are in period 2",
      "N has lower IE because it has fewer protons"
    ],
    "answer": 1,
    "explanation": "N has the stable half-filled 2p³ configuration. In O (2p⁴), a paired 2p electron experiences extra repulsion, so it is easier to remove."
  },
  {
    "id": "p03",
    "topic": "Periodicity",
    "question": "Between F and Cl, which has the more negative first electron gain enthalpy?",
    "options": [
      "F, because its atomic radius is the smallest",
      "Both have identical electron gain enthalpy",
      "Cl, because an added electron faces less repulsion in the larger 3p region",
      "F, because it is the most electronegative element"
    ],
    "answer": 2,
    "explanation": "Chlorine has a more negative first electron gain enthalpy than fluorine. Fluorine's compact 2p shell produces stronger repulsion for the incoming electron."
  },
  {
    "id": "p04",
    "topic": "Periodicity",
    "question": "Which comparison of first electron gain enthalpies is correct for oxygen and sulfur?",
    "options": [
      "O is more negative than S",
      "S is more negative than O",
      "O and S have exactly equal values",
      "Both are necessarily positive"
    ],
    "answer": 1,
    "explanation": "Sulfur's first electron gain enthalpy is more negative than oxygen's because the incoming electron occupies a roomier 3p orbital with less electron–electron repulsion."
  },
  {
    "id": "p05",
    "topic": "Periodicity",
    "question": "Which pair is another exception to the general rise in first ionization enthalpy across period 3?",
    "options": [
      "Na has higher IE than Mg",
      "Si has lower IE than Al",
      "Mg has higher IE than Al",
      "Cl has lower IE than S"
    ],
    "answer": 2,
    "explanation": "Mg ends in 3s² while Al ends in 3s²3p¹. Al's first 3p electron is easier to remove, making the first IE of Mg greater than Al."
  },
  {
    "id": "p06",
    "topic": "Periodicity",
    "question": "The ions Na⁺, Mg²⁺ and Al³⁺ are isoelectronic. Which ion has the smallest radius?",
    "options": [
      "Na⁺",
      "Mg²⁺",
      "All three have equal radii",
      "Al³⁺"
    ],
    "answer": 3,
    "explanation": "All have 10 electrons. Al³⁺ has the greatest nuclear charge (13 protons), so it pulls the same electron cloud most strongly."
  },
  {
    "id": "b01",
    "topic": "Chemical Bonding",
    "question": "Which molecule is an electron-deficient exception to the usual octet rule at its central atom?",
    "options": [
      "BF₃",
      "CH₄",
      "NH₃",
      "H₂O"
    ],
    "answer": 0,
    "explanation": "Boron in BF₃ has just six electrons around it in a simple Lewis structure. BF₃ can accept an electron pair and acts as a Lewis acid."
  },
  {
    "id": "b02",
    "topic": "Chemical Bonding",
    "question": "Which diatomic molecule is paramagnetic in its ground state despite a Lewis structure often drawn with paired electrons?",
    "options": [
      "N₂",
      "CO",
      "O₂",
      "F₂"
    ],
    "answer": 2,
    "explanation": "Molecular orbital theory predicts two unpaired electrons in antibonding π* orbitals of ground-state O₂, making it paramagnetic."
  },
  {
    "id": "b03",
    "topic": "Chemical Bonding",
    "question": "Which molecule has the smaller H–central-atom–H bond angle?",
    "options": [
      "NH₃ (about 107°)",
      "Both are about 109.5°",
      "CH₄ (about 109.5°)",
      "H₂O (about 104.5°)"
    ],
    "answer": 3,
    "explanation": "Water's two lone pairs compress the H–O–H bond angle to about 104.5°, compared with NH₃ at about 107° and CH₄ at 109.5°."
  },
  {
    "id": "b04",
    "topic": "Chemical Bonding",
    "question": "Why does HF have a much higher boiling point than HCl despite the lower molar mass of HF?",
    "options": [
      "HF is ionic at room temperature",
      "HF forms strong intermolecular hydrogen bonds",
      "HCl forms stronger hydrogen bonds than HF",
      "HF contains a metallic bond"
    ],
    "answer": 1,
    "explanation": "HF molecules associate through strong hydrogen bonding, raising the energy needed to separate them. HCl does not show comparably strong hydrogen bonding."
  },
  {
    "id": "b05",
    "topic": "Chemical Bonding",
    "question": "Which molecule is a common hypervalent (expanded-octet) example in introductory Lewis structures?",
    "options": [
      "BF₃",
      "NH₃",
      "SF₆",
      "BeCl₂"
    ],
    "answer": 2,
    "explanation": "SF₆ is commonly represented with six S–F bonds around sulfur, exceeding eight electrons in its standard introductory Lewis structure. Bonding is more nuanced in modern descriptions."
  },
  {
    "id": "b06",
    "topic": "Chemical Bonding",
    "question": "Which simple diatomic species is an odd-electron molecule and therefore has an unpaired electron?",
    "options": [
      "CO",
      "N₂",
      "NO",
      "CN⁻"
    ],
    "answer": 2,
    "explanation": "NO has 11 valence electrons and one unpaired electron in its ground state. It is a standard odd-electron exception to simple octet counting."
  },
  {
    "id": "pb01",
    "topic": "p-Block",
    "question": "What oxidation state does fluorine show in its compounds with other elements?",
    "options": [
      "+1",
      "−1",
      "+3",
      "+5"
    ],
    "answer": 1,
    "explanation": "Fluorine is the most electronegative element and shows −1 in its compounds with other elements; elemental F₂ has oxidation state zero."
  },
  {
    "id": "pb02",
    "topic": "p-Block",
    "question": "What is the molecular shape of XeF₄?",
    "options": [
      "Tetrahedral",
      "Seesaw",
      "Square planar",
      "Trigonal pyramidal"
    ],
    "answer": 2,
    "explanation": "XeF₄ has six electron domains around xenon: four bonding pairs and two opposite lone pairs. Its molecular shape is square planar."
  },
  {
    "id": "pb03",
    "topic": "p-Block",
    "question": "Why does NH₃ boil at a higher temperature than PH₃?",
    "options": [
      "NH₃ is heavier",
      "NH₃ forms appreciable intermolecular hydrogen bonds",
      "PH₃ is an ionic compound",
      "PH₃ has stronger hydrogen bonds"
    ],
    "answer": 1,
    "explanation": "NH₃ exhibits stronger intermolecular hydrogen bonding because of polar N–H bonds and the nitrogen lone pair. PH₃ does not form comparably strong hydrogen bonds."
  },
  {
    "id": "pb04",
    "topic": "p-Block",
    "question": "Which shape is predicted for XeF₂ by VSEPR theory?",
    "options": [
      "Bent",
      "Trigonal planar",
      "T-shaped",
      "Linear"
    ],
    "answer": 3,
    "explanation": "XeF₂ has two bonding domains and three lone pairs around xenon. The lone pairs occupy equatorial positions in the trigonal-bipyramidal electron arrangement, leaving a linear molecule."
  },
  {
    "id": "pb05",
    "topic": "p-Block",
    "question": "Which of these neutral nitrogen halides is not an ordinary stable molecular compound because nitrogen cannot exceed an octet?",
    "options": [
      "NF₃",
      "NCl₃",
      "NBr₃",
      "NCl₅"
    ],
    "answer": 3,
    "explanation": "Nitrogen is a second-period element and cannot have five covalent N–Cl bonds in an ordinary neutral NCl₅ molecule. NF₃ and NCl₃ are established compounds."
  },
  {
    "id": "d01",
    "topic": "d- and f-Block",
    "question": "Which is the ground-state electronic configuration of neutral chromium (Z = 24)?",
    "options": [
      "[Ar] 3d⁴ 4s²",
      "[Ar] 3d⁶",
      "[Ar] 3d⁵ 4s¹",
      "[Ar] 3d³ 4s³"
    ],
    "answer": 2,
    "explanation": "Cr has the exceptional [Ar] 3d⁵ 4s¹ ground-state configuration; a half-filled d subshell contributes to its relative stability."
  },
  {
    "id": "d02",
    "topic": "d- and f-Block",
    "question": "Which is the ground-state electronic configuration of neutral copper (Z = 29)?",
    "options": [
      "[Ar] 3d¹⁰ 4s¹",
      "[Ar] 3d⁹ 4s²",
      "[Ar] 3d⁸ 4s³",
      "[Ar] 3d¹⁰ 4s²"
    ],
    "answer": 0,
    "explanation": "Neutral Cu is [Ar] 3d¹⁰ 4s¹, an exception to the naive [Ar] 3d⁹ 4s² filling pattern."
  },
  {
    "id": "d03",
    "topic": "d- and f-Block",
    "question": "Why is Zn²⁺ generally diamagnetic?",
    "options": [
      "It has a 3d⁵ configuration",
      "It has a fully filled 3d¹⁰ configuration",
      "It has one unpaired 4s electron",
      "It has an empty 3d⁰ subshell"
    ],
    "answer": 1,
    "explanation": "Zn²⁺ is [Ar] 3d¹⁰, with no unpaired d electrons. A filled d shell explains its diamagnetism."
  },
  {
    "id": "d04",
    "topic": "d- and f-Block",
    "question": "Which ion is usually colourless because it has a d⁰ configuration?",
    "options": [
      "Ti³⁺",
      "Cr³⁺",
      "Mn²⁺",
      "Sc³⁺"
    ],
    "answer": 3,
    "explanation": "Sc³⁺ has an [Ar] configuration with no d electrons. Common d–d transitions are not possible, unlike in many partially filled d ions."
  },
  {
    "id": "d05",
    "topic": "d- and f-Block",
    "question": "Why are the atomic radii of Zr and Hf very similar even though Hf is lower in the group?",
    "options": [
      "Hf has no electrons in inner shells",
      "Zr and Hf have the same atomic number",
      "Lanthanoid contraction offsets the expected size increase",
      "Hf has fewer protons than Zr"
    ],
    "answer": 2,
    "explanation": "Poor shielding by 4f electrons across the lanthanoids causes lanthanoid contraction, leaving Hf and Zr with nearly equal atomic radii."
  },
  {
    "id": "c01",
    "topic": "Coordination",
    "question": "For [Ni(CN)₄]²⁻, what is the usual geometry and magnetic behaviour?",
    "options": [
      "Tetrahedral, paramagnetic",
      "Square planar, diamagnetic",
      "Octahedral, diamagnetic",
      "Square planar, paramagnetic"
    ],
    "answer": 1,
    "explanation": "Ni²⁺ is d⁸. Strong-field CN⁻ leads to a square-planar dsp² complex with paired electrons, so [Ni(CN)₄]²⁻ is diamagnetic."
  },
  {
    "id": "c02",
    "topic": "Coordination",
    "question": "For [NiCl₄]²⁻, what are the usual geometry and magnetic behaviour?",
    "options": [
      "Square planar, diamagnetic",
      "Octahedral, paramagnetic",
      "Tetrahedral, paramagnetic",
      "Linear, diamagnetic"
    ],
    "answer": 2,
    "explanation": "Cl⁻ is a weak-field ligand; [NiCl₄]²⁻ is tetrahedral with two unpaired electrons and is paramagnetic."
  },
  {
    "id": "c03",
    "topic": "Coordination",
    "question": "Which statement correctly describes [Co(NH₃)₆]³⁺?",
    "options": [
      "It is octahedral and diamagnetic",
      "It is tetrahedral and diamagnetic",
      "It is octahedral and has five unpaired electrons",
      "It is square planar and paramagnetic"
    ],
    "answer": 0,
    "explanation": "Co³⁺ is d⁶; in [Co(NH₃)₆]³⁺ it forms a low-spin octahedral arrangement (t₂g⁶) with no unpaired electrons."
  },
  {
    "id": "c04",
    "topic": "Coordination",
    "question": "Which statement correctly describes the [CoF₆]³⁻ complex?",
    "options": [
      "It is square planar and diamagnetic",
      "It is octahedral and low-spin diamagnetic",
      "It is tetrahedral with two unpaired electrons",
      "It is octahedral and high-spin paramagnetic"
    ],
    "answer": 3,
    "explanation": "Co³⁺ is d⁶. F⁻ is weak field; [CoF₆]³⁻ is a high-spin octahedral complex with unpaired electrons and is paramagnetic."
  }
];
if(typeof module!=="undefined"&&module.exports)module.exports=questions;
else root.CalcuInorganicExceptionsQuestions=questions;
})(typeof window!=="undefined"?window:globalThis);
