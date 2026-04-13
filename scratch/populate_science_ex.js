const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const science_ex = {
  'sci_food_1': {
    ...data['sci_food_1'],
    'examples': [
      { 'question': 'Test for presence of starch in a food item.', 'steps': ['Take a small quantity of food (e.g., boiled potato).', 'Add 2-3 drops of dilute iodine solution.', 'Result: If color turns blue-black, starch is present.'], 'illustration': 'Iodine + Potato = Blue-black color' },
      { 'question': 'Test for presence of proteins.', 'steps': ['Make a paste of food item.', 'Add 2 drops of Copper Sulphate and 10 drops of Caustic Soda.', 'Result: A violet color indicates proteins inside.'] }
    ]
  },
  'sci_food_2': {
    ...data['sci_food_2'],
    'examples': [
      { 'question': 'Why is eating junk food daily bad for a balanced diet?', 'steps': ['Junk food is high in fats and carbs but low in vitamins and minerals.', 'It leads to obesity and nutrient deficiency diseases over time.'], 'illustration': 'Healthy plate = Rainbow of colors; Junk plate = Beige' },
      { 'question': 'Suggest a meal that is balanced for a growing child.', 'steps': ['Add Roti/Rice (Carbs), Dal/Paneer (Proteins), Ghee (Fats), and Salad/Veggies (Vitamins/Minerals).'] }
    ]
  },
  'sci_plt_1': {
    ...data['sci_plt_1'],
    'examples': [
      { 'question': 'Identify a climber in your garden.', 'steps': ['Look for a plant with thin, weak stems that wraps around a pole.', 'Example: Money plant or Pea plant.'], 'illustration': '[Plant] ---coiling around---> [Support]' },
      { 'question': 'Difference between a Tree and a Shrub.', 'steps': ['Tree: Tall with single hard trunk (Neem).', 'Shrub: Medium size with branches near base (Rose).'] }
    ]
  },
  'sci_plt_2': {
    ...data['sci_plt_2'],
    'examples': [
      { 'question': 'Observe how water moves through a plant.', 'steps': ['Put a white carnation flower in red-colored water.', 'Wait for a few hours.', 'Result: The petals turn red, showing the stem carries water up.'], 'illustration': 'Stem acts like a drinking straw' },
      { 'question': 'Observe the leaf venation of a peepal leaf.', 'steps': ['Look at the network of veins.', 'Since it forms a net-like structure, it is "Reticulate Venation".'] }
    ]
  },
  'sci_plt_3': {
    ...data['sci_plt_3'],
    'examples': [
      { 'question': 'Prove that plants need sunlight for food.', 'steps': ['Cover a portion of a leaf with black paper.', 'Keep in sun for days.', 'Test the covered part for starch.', 'Result: No starch found in covered part; it needs sun!'], 'illustration': 'Sunlight + CO2 + Water -> Glucose + Oxygen' },
      { 'question': 'Where do plants get carbon dioxide from?', 'steps': ['They absorb it from the surrounding air through tiny pores called Stomata.'] }
    ]
  },
  'sci_body_1': {
    ...data['sci_body_1'],
    'examples': [
      { 'question': 'Why can you rotate your arm in a full circle but not your knee?', 'steps': ['Arm has a ball-and-socket joint which allows 360-deg movement.', 'Knee has a hinge joint which only allows back-and-forth movement.'], 'illustration': 'Ball-and-socket = 3D movement; Hinge = 2D movement' },
      { 'question': 'Identify fixed joints in your body.', 'steps': ['Try to move your upper jaw.', 'You can\'t! The joint between skull and upper jaw is fixed.'] }
    ]
  },
  'sci_body_2': {
    ...data['sci_body_2'],
    'examples': [
      { 'question': 'How do muscles help move your arm?', 'steps': ['Muscles work in pairs (Biceps and Triceps).', 'When you lift, biceps contract (get shorter) and triceps relax.', 'To straighten, the opposite happens.'], 'illustration': 'Muscle contracts -> Pulls bone -> Movement' },
      { 'question': 'Describe the function of the rib cage.', 'steps': ['It forms a cage of bones around our chest.', 'Protects delicate organs like heart and lungs from injury.'] }
    ]
  },
  'sci_liv_1': {
    ...data['sci_liv_1'],
    'examples': [
      { 'question': 'Identify biotic and abiotic components in a pond.', 'steps': ['Biotic (Living): Fish, Frogs, Water plants.', 'Abiotic (Non-living): Water, Sunlight, Mud, Stones.'], 'illustration': 'Biotic + Abiotic = Ecosystem' },
      { 'question': 'Why do trees in mountain regions have needle-like leaves?', 'steps': ['This shape helps snow to slide off easily.', 'Prevents branches from breaking under heavy snow.'] }
    ]
  },
  'sci_liv_2': {
    ...data['sci_liv_2'],
    'examples': [
      { 'question': 'How is a cactus adapted to live in a desert?', 'steps': ['Leaves are reduced to spines (save water).', 'Stem is green and fleshy (performs photosynthesis and stores water).', 'Deep roots to find groundwater.'], 'illustration': '[Cactus] -> Spines, Waxy skin' },
      { 'question': 'How do fish breathe in water?', 'steps': ['They use Gills.', 'Water enters through mouth and passes over gills.', 'Gills extract oxygen and release CO2 into water.'] }
    ]
  },
  'sci_mat_1': {
    ...data['sci_mat_1'],
    'examples': [
      { 'question': 'Test if oil is soluble in water.', 'steps': ['Take a glass of water, add 1 spoon of oil.', 'Stir it well.', 'Result: Oil forms a separate layer on top. It is insoluble (immiscible).'], 'illustration': 'Water + Oil = Two separate layers' },
      { 'question': 'Identify a material that is both hard and lustrous.', 'steps': ['Iron or Aluminum.', 'They are tough to compress (hard) and shine when polished (lustrous).'] }
    ]
  },
  'sci_sep_1': {
    ...data['sci_sep_1'],
    'examples': [
      { 'question': 'How to separate sand and iron filings from a mixture?', 'steps': ['Use a magnet.', 'Pass the magnet over the mixture.', 'Iron filings stick to it, leaving sand behind.'], 'illustration': 'Magnet pulls iron out of sand' },
      { 'question': 'Separate tea leaves from tea.', 'steps': ['Use a strainer (sieve).', 'The liquid tea passes through, leaves stay behind. This is filtration.'] }
    ]
  },
  'sci_sep_2': {
    ...data['sci_sep_2'],
    'examples': [
      { 'question': 'Obtain salt from salt-water solution.', 'steps': ['Heat the solution in a dish.', 'Water turns to vapor and disappears.', 'Salt crystals are left behind.'], 'illustration': 'Heat -> Evaporation -> Solid remains' },
      { 'question': 'Prove that air has water vapor.', 'steps': ['Take a metal glass with ice-cold water.', 'Wait for a few minutes.', 'Droplets form on the outside. This is condensation of vapor from air.'] }
    ]
  },
  'sci_chg_1': {
    ...data['sci_chg_1'],
    'examples': [
      { 'question': 'Is glowing of a bulb a reversible change?', 'steps': ['Turn on: It glows.', 'Turn off: It returns to original state.', 'Yes, it is reversible.'], 'illustration': 'On <-> Off (Reversible)' },
      { 'question': 'Change of raw egg to boiled egg.', 'steps': ['Heat changes the egg structure.', 'You cannot turn a boiled egg back to raw.', 'Therefore, it is Irreversible.'] }
    ]
  },
  'sci_mot_1': {
    ...data['sci_mot_1'],
    'examples': [
      { 'question': 'Measure the length of a curved line.', 'steps': ['Use a piece of thread.', 'Place thread along the curve carefully.', 'Stretch the thread along a ruler to get length.'], 'illustration': 'Curve -> Thread -> Ruler' },
      { 'question': 'Why use SI units?', 'steps': ['Different people have different hand sizes.', 'Using a fixed standard unit (metre) gives same result for everyone.'] }
    ]
  },
  'sci_mot_2': {
    ...data['sci_mot_2'],
    'examples': [
      { 'question': 'Identify motion of a clock\'s hands.', 'steps': ['The tips move around a center.', 'They repeat movement every hour/minute.', 'It is both Circular and Periodic motion.'], 'illustration': '[Clock] -> Periodic & Circular' },
      { 'question': 'Motion of a falling stone.', 'steps': ['It falls in a straight path towards ground.', 'It is Rectilinear motion.'] }
    ]
  },
  'sci_lgt_1': {
    ...data['sci_lgt_1'],
    'examples': [
      { 'question': 'How is a shadow formed?', 'steps': ['Place an opaque object in path of light.', 'Light cannot pass through it.', 'A dark patch (shadow) forms on the screen behind it.'], 'illustration': 'Light Source -> Object -> Shadow' },
      { 'question': 'Can we see a shadow in a completely dark room?', 'steps': ['No. We need a light source, an object, and a screen to see a shadow.'] }
    ]
  },
  'sci_lgt_2': {
    ...data['sci_lgt_2'],
    'examples': [
      { 'question': 'Write your name on paper and hold it to a mirror.', 'steps': ['The letters appear reversed (Left becomes Right).', 'This is called Lateral Inversion.'], 'illustration': 'CAT -> TAƆ' },
      { 'question': 'Prove light travels in a straight line.', 'steps': ['Look at a candle through a straight pipe: Visible.', 'Bend the pipe: Not visible.', 'Proof: Light travels in straight lines.'] }
    ]
  },
  'sci_elec_1': {
    ...data['sci_elec_1'],
    'examples': [
      { 'question': 'Why does a bulb not glow if one wire is broken?', 'steps': ['Electricity needs a continuous path to flow.', 'A broken wire creates a "gap" (open circuit).', 'Current cannot jump the gap, so bulb stays off.'], 'illustration': '[+] --[gap]-- [-] = No Light' },
      { 'question': 'Difference between a cell and a battery.', 'steps': ['Cell: Single unit producing electricity.', 'Battery: Group of cells connected together.'] }
    ]
  },
  'sci_elec_2': {
    ...data['sci_elec_2'],
    'examples': [
      { 'question': 'Why are testers handled with plastic handles?', 'steps': ['Plastic is an insulator.', 'It stops current from reaching your hand.', 'Prevents electric shocks.'], 'illustration': 'Safety handle = Insulator' },
      { 'question': 'Is salt water a conductor?', 'steps': ['Yes. Adding salt to water makes it conduct electricity very well.'] }
    ]
  },
  'sci_mag_1': {
    ...data['sci_mag_1'],
    'examples': [
      { 'question': 'Difference between Magnetic and Non-magnetic materials.', 'steps': ['Magnetic: Attracted to magnets (Iron, Nickel).', 'Non-magnetic: Not attracted (Plastic, Rubber, Wood).'], 'illustration': 'Magnet picks up paper clips, but not erasers.' },
      { 'question': 'How to find North direction using a bar magnet?', 'steps': ['Tie a thread at middle and hang it freely.', 'Wait for it to stop.', 'One end will point towards geographical North.'] }
    ]
  },
  'sci_wtr_1': {
    ...data['sci_wtr_1'],
    'examples': [
      { 'question': 'What causes drought?', 'steps': ['If it doesn\'t rain for a long time (year or more).', 'Soil dries up, wells go empty, and crops fail.'], 'illustration': 'No rain -> Cracked earth -> Drought' },
      { 'question': 'What is Rain Water Harvesting?', 'steps': ['Collecting rain water from rooftops into underground tanks for later use.'] }
    ]
  },
  'sci_wtr_2': {
    ...data['sci_wtr_2'],
    'examples': [
      { 'question': 'Explain formation of dew.', 'steps': ['At night, objects cool down.', 'Water vapor in air condenses on cold leaves/surfaces.', 'Forms tiny droplets called dew.'], 'illustration': 'Cool surface -> Vapor to liquid' },
      { 'question': 'Importance of Transpiration.', 'steps': ['Helps in cooling the plant and pulling water up from roots to leaves.'] }
    ]
  },
  'sci_air_1': {
    ...data['sci_air_1'],
    'examples': [
      { 'question': 'Prove that air occupies space.', 'steps': ['Blow air into a balloon.', 'The balloon swells and becomes bigger.', 'Conclusion: Air takes up space inside the balloon.'], 'illustration': 'Flat balloon -> Round balloon (filled with air)' },
      { 'question': 'Why do mountaineers carry oxygen cylinders?', 'steps': ['As we go higher, the air becomes thinner and oxygen becomes less.', 'Helps them breathe properly at high altitudes.'] }
    ]
  },
  'sci_grb_1': {
    ...data['sci_grb_1'],
    'examples': [
      { 'question': 'What items can we compost?', 'steps': ['Vegetable peels, fruit skins, leftover food, tea leaves.', 'Do not add plastic, metal, or glass as they don\'t rot.'], 'illustration': 'Organic waste -> Compost' },
      { 'question': 'Why is burning plastic bad?', 'steps': ['Burning plastic releases poisonous gases that pollute air and cause health problems.'] }
    ]
  }
};

Object.assign(data, science_ex);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Science with examples updated.');
