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
,
{
  "id": "p07",
  "topic": "Periodicity",
  "question": "Which period-3 element has unexpectedly higher first ionization enthalpy than the element directly after it?",
  "options": [
    "Sulfur, compared with phosphorus",
    "Phosphorus, compared with sulfur",
    "Aluminium, compared with magnesium",
    "Sodium, compared with magnesium"
  ],
  "answer": 1,
  "explanation": "Phosphorus has a relatively stable half-filled 3p³ subshell. Sulfur has a paired 3p electron, making its first electron easier to remove."
},
{
  "id": "p08",
  "topic": "Periodicity",
  "question": "Why is the second ionization enthalpy of Na much higher than that of Mg?",
  "options": [
    "Na⁺ has a stable neon-like closed shell",
    "Mg⁺ has a noble-gas electron configuration",
    "Na⁺ retains a valence 3s electron",
    "Mg has fewer protons than Na"
  ],
  "answer": 0,
  "explanation": "After losing its 3s electron, Na⁺ has the [Ne] closed shell. A second ionization removes a core electron. Mg⁺ still has a 3s electron to remove."
},
{
  "id": "p09",
  "topic": "Periodicity",
  "question": "Why is adding an electron to an isolated noble-gas atom generally energetically unfavourable?",
  "options": [
    "The atom has an unfilled valence p subshell",
    "The atom has a filled valence shell and the extra electron must enter a higher-energy orbital",
    "The atom is always positively charged",
    "The added electron enters a lower-energy 1s orbital"
  ],
  "answer": 1,
  "explanation": "A noble gas has a closed valence shell. An incoming electron must occupy a higher-energy shell/orbital, so the electron-gain process is generally endothermic."
},
{
  "id": "p10",
  "topic": "Periodicity",
  "question": "Among the isoelectronic ions O²⁻, F⁻ and Na⁺, which has the largest ionic radius?",
  "options": [
    "O²⁻",
    "F⁻",
    "Na⁺",
    "They have equal radii"
  ],
  "answer": 0,
  "explanation": "All three have ten electrons. O²⁻ has the smallest nuclear charge (eight protons), attracting that electron cloud less strongly than F⁻ or Na⁺."
},
{
  "id": "p11",
  "topic": "Periodicity",
  "question": "Why can gallium have a slightly smaller atomic radius than aluminium despite lying below it in group 13?",
  "options": [
    "Ga has one fewer occupied shell than Al",
    "The intervening 3d electrons shield poorly, increasing effective nuclear attraction",
    "Ga has fewer protons than Al",
    "Al contains a filled 4f subshell"
  ],
  "answer": 1,
  "explanation": "The intervening 3d electrons shield nuclear charge imperfectly. This d-block contraction offsets the extra shell in Ga, making Ga's atomic radius comparable to or smaller than Al's."
},
{
  "id": "b07",
  "topic": "Chemical Bonding",
  "question": "According to VSEPR, what is the molecular shape of ClF₃?",
  "options": [
    "Trigonal planar",
    "T-shaped",
    "Tetrahedral",
    "Linear"
  ],
  "answer": 1,
  "explanation": "ClF₃ has five electron domains around Cl: three bonding pairs and two lone pairs. Lone pairs take equatorial positions, leaving a T-shaped molecule."
},
{
  "id": "b08",
  "topic": "Chemical Bonding",
  "question": "Why does linear CO₂ have zero permanent dipole moment even though each C=O bond is polar?",
  "options": [
    "Both C=O bonds are nonpolar",
    "The two equal C=O bond dipoles cancel in opposite directions",
    "Carbon carries a permanent +4 formal charge",
    "The molecule is bent with zero bond polarity"
  ],
  "answer": 1,
  "explanation": "CO₂ is linear with two equal, oppositely directed C=O bond dipoles; their vector sum is zero."
},
{
  "id": "b09",
  "topic": "Chemical Bonding",
  "question": "Why is the F–F bond generally weaker than the Cl–Cl bond?",
  "options": [
    "F₂ has a larger bond length than Cl₂",
    "Strong lone-pair repulsions in the very compact F–F bond reduce its strength",
    "Cl₂ is ionic while F₂ is covalent",
    "F₂ has a double bond while Cl₂ has a single bond"
  ],
  "answer": 1,
  "explanation": "Fluorine's small size puts three lone pairs on each atom close together across the short F–F bond, causing strong repulsion and a lower bond dissociation enthalpy than Cl–Cl."
},
{
  "id": "b10",
  "topic": "Chemical Bonding",
  "question": "In gaseous trigonal-bipyramidal PCl₅, which bonds are longer?",
  "options": [
    "The three equatorial P–Cl bonds",
    "The two axial P–Cl bonds",
    "All five bonds have identical lengths",
    "One equatorial bond is longest and the others are equal"
  ],
  "answer": 1,
  "explanation": "Axial bonds experience three 90° interactions with equatorial bonding pairs, greater repulsion than equatorial bonds. Axial P–Cl bonds are longer and weaker."
},
{
  "id": "b11",
  "topic": "Chemical Bonding",
  "question": "Why is ground-state B₂ paramagnetic according to molecular orbital theory?",
  "options": [
    "It contains two unpaired electrons in degenerate π(2p) bonding orbitals",
    "All its valence electrons occupy paired σ orbitals",
    "It has four unpaired electrons in antibonding orbitals",
    "The B–B bond is ionic"
  ],
  "answer": 0,
  "explanation": "For B₂, the π(2p) bonding orbitals are each singly occupied in the standard MO ordering for lighter second-period diatomics. Two unpaired electrons cause paramagnetism."
},
{
  "id": "pb06",
  "topic": "p-Block",
  "question": "Which hydrogen halide forms the strongest acid in water among HF, HCl, HBr and HI?",
  "options": [
    "HF",
    "HCl",
    "HBr",
    "HI"
  ],
  "answer": 3,
  "explanation": "H–I has the weakest H–X bond among these hydrogen halides and dissociates readily in water. Acid strength generally increases from HF to HI."
},
{
  "id": "pb07",
  "topic": "p-Block",
  "question": "Why is phosphorous acid (H₃PO₃) dibasic rather than tribasic?",
  "options": [
    "It contains only two ionizable O–H protons; the third H is bonded directly to P",
    "All three hydrogens are bonded to oxygen",
    "It contains no ionizable O–H bonds",
    "It releases only one proton because it is a strong acid"
  ],
  "answer": 0,
  "explanation": "The predominant structure is HPO(OH)₂: two O–H hydrogens can ionize, while the P–H hydrogen does not dissociate as an acidic proton in the usual acid-base context."
},
{
  "id": "pb08",
  "topic": "p-Block",
  "question": "How many ionizable acidic protons are present in hypophosphorous acid H₃PO₂?",
  "options": [
    "Three",
    "Two",
    "One",
    "Zero"
  ],
  "answer": 2,
  "explanation": "The structure is H₂PO(OH). Only one hydrogen is in an O–H bond; two are P–H, making H₃PO₂ monobasic."
},
{
  "id": "pb09",
  "topic": "p-Block",
  "question": "What is the common ionic description of solid PCl₅?",
  "options": [
    "[PCl₄]⁺ and [PCl₆]⁻",
    "P⁵⁺ and five free Cl⁻ ions",
    "[PCl₂]⁺ and [PCl₈]⁻",
    "[PCl₃]²⁺ and [PCl₇]²⁻"
  ],
  "answer": 0,
  "explanation": "Solid PCl₅ is commonly described as an ionic lattice containing [PCl₄]⁺ (tetrahedral) and [PCl₆]⁻ (octahedral), unlike the molecular trigonal-bipyramidal gas."
},
{
  "id": "pb10",
  "topic": "p-Block",
  "question": "Why does chlorine show bleaching action more effectively in moist conditions than in dry conditions?",
  "options": [
    "Moisture helps form hypochlorous acid (HOCl), an oxidizing species",
    "Water converts chlorine into molecular nitrogen",
    "Dry Cl₂ acts as a stronger oxidant than aqueous chlorine",
    "Water removes all chlorine from the material without reaction"
  ],
  "answer": 0,
  "explanation": "Chlorine reacts with water to form HCl and HOCl. Hypochlorous acid and related oxidizing species oxidize coloured substances, so moisture helps bleaching."
},
{
  "id": "d06",
  "topic": "d- and f-Block",
  "question": "Which electronic configuration explains the relative stability of Mn²⁺?",
  "options": [
    "[Ar] 3d³",
    "[Ar] 3d⁴",
    "[Ar] 3d⁵",
    "[Ar] 3d⁷"
  ],
  "answer": 2,
  "explanation": "Mn²⁺ loses the two 4s electrons of Mn and has the especially stable half-filled 3d⁵ configuration."
},
{
  "id": "d07",
  "topic": "d- and f-Block",
  "question": "What is the 3d electron count of Fe³⁺, often associated with relative half-filled-shell stability?",
  "options": [
    "3d⁴",
    "3d⁵",
    "3d⁶",
    "3d⁷"
  ],
  "answer": 1,
  "explanation": "Neutral Fe has [Ar]3d⁶4s². Formation of Fe³⁺ removes two 4s electrons and one 3d electron, producing [Ar]3d⁵."
},
{
  "id": "d08",
  "topic": "d- and f-Block",
  "question": "Why are many Cu(I) complexes colourless with respect to d–d transitions, unlike many Cu(II) complexes?",
  "options": [
    "Cu(I) is 3d¹⁰, so d–d transitions are unavailable",
    "Cu(I) is 3d⁹ and has one unpaired electron",
    "Cu(I) is 3d⁵ and high-spin",
    "Cu(II) is always colourless because its d shell is full"
  ],
  "answer": 0,
  "explanation": "Cu⁺ has a filled 3d¹⁰ shell, so ordinary d–d excitations cannot occur. Some Cu(I) compounds may still be coloured by charge-transfer effects."
},
{
  "id": "d09",
  "topic": "d- and f-Block",
  "question": "Why does Ce⁴⁺ commonly behave as a strong oxidizing agent in aqueous chemistry?",
  "options": [
    "It readily gains an electron to form the relatively stable Ce³⁺ state",
    "It readily loses an electron to form Ce⁵⁺",
    "It has no available electron-accepting states",
    "It converts directly to Ce²⁻ in water"
  ],
  "answer": 0,
  "explanation": "Cerium(IV) is readily reduced to Ce(III), a common lanthanoid oxidation state. Thus Ce⁴⁺ can oxidize other substances while accepting electrons."
},
{
  "id": "d10",
  "topic": "d- and f-Block",
  "question": "Which configuration contributes to the unusual stability of Eu²⁺ among lanthanoids?",
  "options": [
    "4f⁶",
    "4f⁷",
    "4f¹³",
    "4f¹⁴"
  ],
  "answer": 1,
  "explanation": "Eu²⁺ has a half-filled 4f⁷ configuration, an important reason the +2 state is relatively stable for europium."
},
{
  "id": "c05",
  "topic": "Coordination",
  "question": "What is the magnetic behaviour of [Fe(CN)₆]⁴⁻ under the usual crystal-field description?",
  "options": [
    "High-spin paramagnetic with four unpaired electrons",
    "Low-spin diamagnetic with no unpaired electrons",
    "Tetrahedral with two unpaired electrons",
    "Square planar with one unpaired electron"
  ],
  "answer": 1,
  "explanation": "Fe²⁺ is d⁶ and CN⁻ is a strong-field ligand. In the octahedral complex the t₂g set is fully paired (t₂g⁶), making it diamagnetic."
},
{
  "id": "c06",
  "topic": "Coordination",
  "question": "In the usual high-spin octahedral description, how many unpaired electrons are in [FeF₆]⁴⁻?",
  "options": [
    "Zero",
    "Two",
    "Four",
    "Six"
  ],
  "answer": 2,
  "explanation": "Fe²⁺ is d⁶ and F⁻ is a weak-field ligand. Its high-spin octahedral arrangement t₂g⁴e_g² has four unpaired electrons."
},
{
  "id": "c07",
  "topic": "Coordination",
  "question": "Which square-planar Pt(II) complex is a classic example of cis/trans geometrical isomerism?",
  "options": [
    "[Pt(NH₃)₂Cl₂]",
    "[Co(NH₃)₆]³⁺",
    "[Ni(CO)₄]",
    "[Ag(NH₃)₂]⁺"
  ],
  "answer": 0,
  "explanation": "Square-planar [Pt(NH₃)₂Cl₂] can place the two chlorido ligands next to one another (cis) or opposite (trans), giving two geometrical isomers."
},
{
  "id": "c08",
  "topic": "Coordination",
  "question": "Which ligand can form nitro- and nitrito-linked complexes as linkage isomers?",
  "options": [
    "NH₃",
    "Cl⁻",
    "NO₂⁻",
    "H₂O"
  ],
  "answer": 2,
  "explanation": "NO₂⁻ is ambidentate: it can bind through nitrogen (nitro) or oxygen (nitrito), giving linkage isomers."
},
{
  "id": "c09",
  "topic": "Coordination",
  "question": "Why can a complex with ethylenediamine (en) be more thermodynamically stable than a comparable ammine complex?",
  "options": [
    "Ethylenediamine binds through two donor atoms, favouring chelate formation",
    "Ethylenediamine has no nitrogen donor atoms",
    "Ammine ligands always form covalent bonds to carbon",
    "Ethylenediamine must bind through just one hydrogen atom"
  ],
  "answer": 0,
  "explanation": "Ethylenediamine is bidentate and forms chelate rings; the chelate effect, often aided by favourable entropy, can make such complexes more stable than comparable monodentate-ligand complexes."
}
];
if(typeof module!=="undefined"&&module.exports)module.exports=questions;
else root.CalcuInorganicExceptionsQuestions=questions;
})(typeof window!=="undefined"?window:globalThis);
