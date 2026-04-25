const fs = require('fs');
const lessonsPath = 'src/data/lessons.json';
const lessons = JSON.parse(fs.readFileSync(lessonsPath, 'utf8'));

const kanExpansion = {
  'kan_lit_4': {
    what: "ಕುವೆಂಪು (Kuvempu) - ಕನ್ನಡದ ಅಗ್ರಗಣ್ಯ ಕವಿ ಮತ್ತು ರಾಷ್ಟ್ರಕವಿ.",
    example: "ಅವರ ಪ್ರಸಿದ್ಧ ಕವನ 'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ'.",
    points: [
      "ಕುವೆಂಪು ಅವರ ಪೂರ್ಣ ಹೆಸರು ಕುಪ್ಪಳಿ ವೆಂಕಟಪ್ಪ ಪುಟ್ಟಪ್ಪ.",
      "ಇವರು ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಪಡೆದ ಮೊದಲ ಕನ್ನಡಿಗ.",
      "ಮಲೆಗಳಲ್ಲಿ ಮದುಮಗಳು ಮತ್ತು ಕಾನೂರು ಹೆಗ್ಗಡಿತಿ ಇವರ ಪ್ರಸಿದ್ಧ ಕಾದಂಬರಿಗಳು.",
      "ವಿಶ್ವಮಾನವ ಸಂದೇಶವನ್ನು ಜಗತ್ತಿಗೆ ನೀಡಿದ್ದಾರೆ.",
      "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಲೋಕದ ದೈತ್ಯ ಪ್ರತಿಭೆ ಇವರು."
    ],
    tip: "ಕುವೆಂಪು ಅವರ ಕವಿತೆಗಳನ್ನು ಓದುವುದು ಕನ್ನಡದ ಹಿರಿಮೆಯನ್ನು ತಿಳಿಸುತ್ತದೆ.",
    qa: [
      { q: "ಕುವೆಂಪು ಅವರ ಪೂರ್ಣ ಹೆಸರು ಏನು?", a: "ಕುಪ್ಪಳಿ ವೆಂಕಟಪ್ಪ ಪುಟ್ಟಪ್ಪ." },
      { q: "ಕುವೆಂಪು ಅವರಿಗೆ ಯಾವ ಪ್ರಶಸ್ತಿ ಮೊದಲು ಸಿಕ್ಕಿತು?", a: "ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ." },
      { q: "ಅವರು ಯಾವ ಜಿಲ್ಲೆಯಲ್ಲಿ ಹುಟ್ಟಿದರು?", a: "ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ಕುಪ್ಪಳಿ." },
      { q: "ಅವರು ನೀಡಿದ ಮುಖ್ಯ ಸಂದೇಶ ಯಾವುದು?", a: "ವಿಶ್ವಮಾನವ ಸಂದೇಶ." },
      { q: "ಅವರ ಒಂದು ಪ್ರಸಿದ್ಧ ಕವನದ ಹೆಸರು ತಿಳಿಸಿ.", a: "ಓ ನನ್ನ ಚೇತನ ಆಗು ನೀ ಅನಿಕೇತನ." },
      { q: "ರಾಷ್ಟ್ರಕವಿ ಬಿರುದು ಪಡೆದವರು ಯಾರು?", a: "ಕುವೆಂಪು." },
      { q: "ಅವರ ಕಾದಂಬರಿಯ ಹೆಸರೇನು?", a: "ಮಲೆಗಳಲ್ಲಿ ಮದುಮಗಳು." },
      { q: "ಅವರು ಯಾವ ವರ್ಷ ಜ್ಞಾನಪೀಠ ಪಡೆದರು?", a: "೧೯೬೭." },
      { q: "ಅವರು ಯಾವ ವಿಶ್ವವಿದ್ಯಾಲಯದಲ್ಲಿ ಕುಲಪತಿಗಳಾಗಿದ್ದರು?", a: "ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ." },
      { q: "ಕುವೆಂಪು ಅವರ ಜನ್ಮದಿನವನ್ನು ಏನಂತ ಆಚರಿಸುತ್ತಾರೆ?", a: "ವಿಶ್ವಮಾನವ ದಿನ." }
    ],
    scenarios: [
      { q: "ನೀವು ಕುವೆಂಪು ಅವರ ಮನೆಗೆ ಭೇಟಿ ನೀಡಿದರೆ ಏನು ನೋಡುತ್ತೀರಿ?", a: "ಅವರ ಹಳೆಯ ವಸ್ತುಗಳು ಮತ್ತು ಕವಿಶೈಲ." },
      { q: "ಕುವೆಂಪು ಅವರ ಪುಸ್ತಕಗಳನ್ನು ಎಲ್ಲಿ ಓದಬಹುದು?", a: "ಗ್ರಂಥಾಲಯಗಳಲ್ಲಿ." },
      { q: "ನಾವೇಕೆ ಕುವೆಂಪು ಅವರನ್ನು ನೆನಪಿಸಿಕೊಳ್ಳಬೇಕು?", a: "ಅವರು ಕನ್ನಡ ಭಾಷೆ ಮತ್ತು ಸಾಹಿತ್ಯಕ್ಕೆ ನೀಡಿದ ಕೊಡುಗೆಗಾಗಿ." },
      { q: "ವಿಶ್ವಮಾನವ ಎಂದರೆ ಯಾರು?", a: "ಜಾತಿ, ಮತ ಮೀರಿ ಎಲ್ಲರನ್ನೂ ಪ್ರೀತಿಸುವವನು." },
      { q: "ಕುವೆಂಪು ಅವರ ಕವಿತೆಗಳಲ್ಲಿ ಪ್ರಕೃತಿಯ ವರ್ಣನೆ ಹೇಗಿರುತ್ತದೆ?", a: "ತುಂಬಾ ಸುಂದರವಾಗಿ ಮತ್ತು ಜೀವಂತವಾಗಿ." },
      { q: "ಶಾಲೆಗಳಲ್ಲಿ ಅವರ ಯಾವ ಗೀತೆಯನ್ನು ಹಾಡುತ್ತಾರೆ?", a: "ನಾಡಗೀತೆ." },
      { q: "ಕವಿತೆ ಬರೆಯಲು ನಮಗೆ ಏನು ಬೇಕು?", a: "ಕಲ್ಪನೆ ಮತ್ತು ಭಾಷೆಯ ಜ್ಞಾನ." },
      { q: "ಕುವೆಂಪು ಅವರ ತಂದೆಯ ಹೆಸರೇನು?", a: "ವೆಂಕಟಪ್ಪ." },
      { q: "ಅವರು ಬರೆದ ಮಕ್ಕಳ ಪುಸ್ತಕ ಯಾವುದು?", a: "ಬೊಮ್ಮನಹಳ್ಳಿಯ ಕಿಂದರಿಜೋಗಿ." },
      { q: "ಸಾಹಿತ್ಯ ಎಂದರೆ ಏನು?", a: "ಸಮಾಜದ ಕನ್ನಡಿ." }
    ]
  }
};

const gkExpansion = {
  'gk_civ_1': {
    what: "Road Safety consists of the rules and measures used to prevent road accidents and protect road users.",
    example: "Wearing a helmet while riding a bike.",
    points: [
      "Always cross the road at the Zebra Crossing.",
      "Wear seatbelts in cars and helmets on bikes.",
      "Obey traffic lights: Red means Stop, Yellow means Wait, Green means Go.",
      "Look Left, Right, and then Left again before crossing.",
      "Do not use mobile phones while driving or walking on the road."
    ],
    tip: "Safe driving saves lives!",
    qa: [
      { q: "What does the Red light signify?", a: "Stop." },
      { q: "Where should pedestrians cross the road?", a: "Zebra Crossing." },
      { q: "What is the use of a helmet?", a: "To protect the head during accidents." },
      { q: "Should we run on the road?", a: "No, it is dangerous." },
      { q: "What does the Yellow light mean?", a: "Slow down and prepare to stop." },
      { q: "On which side of the road should we walk in India?", a: "Left side (but facing traffic on narrow roads)." },
      { q: "What is a sidewalk used for?", a: "Walking." },
      { q: "Is it safe to play near the road?", a: "No, always play in parks." },
      { q: "What should you do before crossing?", a: "Look both ways." },
      { q: "Why are traffic signs important?", a: "They guide us and keep us safe." }
    ],
    scenarios: [
      { q: "You see a blind person trying to cross the road. What do you do?", a: "Offer to help them cross safely." },
      { q: "The light is yellow but your car is far. Should you speed up?", a: "No, you should slow down." },
      { q: "Why should you never stick your head out of a moving bus?", a: "You could hit a pole or another vehicle." },
      { q: "What if there is no zebra crossing?", a: "Find a clear spot with good visibility and cross carefully." },
      { q: "Why is drinking and driving illegal?", a: "It impairs judgment and causes accidents." },
      { q: "What is the emergency number in India?", a: "112 (General) or 102 (Ambulance)." },
      { q: "Why do we use indicators on a bike?", a: "To tell others which way we are turning." },
      { q: "Is it okay to cross when the 'Don't Walk' sign is on?", a: "No, wait for the green signal." },
      { q: "What is the danger of using earphones while walking on the road?", a: "You won't hear horns or sirens." },
      { q: "What is a flyover used for?", a: "To cross over busy traffic or intersections." }
    ]
  }
};

Object.assign(lessons, kanExpansion, gkExpansion);
fs.writeFileSync(lessonsPath, JSON.stringify(lessons, null, 2));
console.log('Kannada and GK expansion complete.');
