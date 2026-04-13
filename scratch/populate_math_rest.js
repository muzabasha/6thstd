const fs = require('fs');
const path = 'src/data/lessons.json';
const data = JSON.parse(fs.readFileSync(path));

const math_rest = {
  'math_pn_1': {
    ...data['math_pn_1'],
    'examples': [
      { 'question': 'Find all factors of 24.', 'steps': ['Find pairs that multiply to 24: 1x24, 2x12, 3x8, 4x6.', 'List them: 1, 2, 3, 4, 6, 8, 12, 24.'], 'illustration': 'Factors are the building blocks: 1, 2, 3, 4, 6, 8, 12, 24' },
      { 'question': 'List the first five multiples of 7.', 'steps': ['7x1=7, 7x2=14, 7x3=21, 7x4=28, 7x5=35.'], 'illustration': 'Counting by 7s: 7, 14, 21, 28, 35' }
    ]
  },
  'math_pn_2': {
    ...data['math_pn_2'],
    'examples': [
      { 'question': 'Are all odd numbers prime? Explain with an example.', 'steps': ['Look at 9. 9 is an odd number.', 'Its factors are 1, 3, 9.', 'Since it has more than two factors, it is composite. So, the answer is No.'], 'illustration': '9 is odd but not prime (3 x 3 = 9)' },
      { 'question': 'Find prime numbers between 1 and 10.', 'steps': ['Factors of 2: 1,2 (Prime)', 'Factors of 3: 1,3 (Prime)', 'Factors of 4: 1,2,4 (Composite)', 'List: 2, 3, 5, 7.'], 'illustration': 'Primes: 2, 3, 5, 7' }
    ]
  },
  'math_pn_3': {
    ...data['math_pn_3'],
    'examples': [
      { 'question': 'Find HCF of 12 and 16.', 'steps': ['Factors of 12: 1, 2, 3, 4, 6, 12.', 'Factors of 16: 1, 2, 4, 8, 16.', 'Common factors: 1, 2, 4. Largest is 4.'], 'illustration': 'HCF(12, 16) = 4' },
      { 'question': 'Find LCM of 12 and 18.', 'steps': ['Multiples of 12: 12, 24, 36, 48.', 'Multiples of 18: 18, 36, 54.', 'Smallest common multiple is 36.'], 'illustration': 'LCM(12, 18) = 36' }
    ]
  },
  'math_pn_4': {
    ...data['math_pn_4'],
    'examples': [
      { 'question': 'Is 1584 divisible by 6?', 'steps': ['Check 2: Ends in 4 (Even), so Yes.', 'Check 3: Sum of digits 1+5+8+4 = 18. 18 is divisible by 3, so Yes.', 'Since divisible by both 2 and 3, it is divisible by 6.'], 'illustration': '1+5+8+4=18 (ok for 3), ends in 4 (ok for 2) -> Divisible by 6!' },
      { 'question': 'Is 128 divisible by 4?', 'steps': ['Check the last two digits: 28.', '28 is divisible by 4 (4x7=28).', 'So, 128 is divisible by 4.'] }
    ]
  },
  'math_geo_1': {
    ...data['math_geo_1'],
    'examples': [
      { 'question': 'Difference between a Ray and a Line Segment.', 'steps': ['Ray has one endpoint and goes forever in one direction.', 'Line Segment has two fixed endpoints and a fixed length.'], 'illustration': 'Ray: .-----> ; Segment: .-----.' },
      { 'question': 'Identify type of angle for 95 degrees.', 'steps': ['90 < 95 < 180.', 'Therefore, it is an Obtuse angle.'] }
    ]
  },
  'math_geo_2': {
    ...data['math_geo_2'],
    'examples': [
      { 'question': 'Is a square a simple closed curve?', 'steps': ['It is closed: Yes.', 'It does not cross itself: Yes.', 'Therefore, it is a simple closed curve.'], 'illustration': '[Square] -> Simple closed curve' },
      { 'question': 'Why is a circle not a polygon?', 'steps': ['A polygon is made of straight line segments.', 'A circle is a curved line.', 'Therefore, it is not a polygon.'] }
    ]
  },
  'math_geo_3': {
    ...data['math_geo_3'],
    'examples': [
      { 'question': 'How many diagonals does a triangle have?', 'steps': ['Try connecting non-adjacent vertices.', 'In a triangle, all vertices are adjacent to each other.', 'Therefore, a triangle has 0 diagonals.'], 'illustration': 'Triangle has 0 diagonals!' },
      { 'question': 'Name a quadrilateral with all sides equal.', 'steps': ['A Square has all sides equal.', 'A Rhombus also has all sides equal.'] }
    ]
  },
  'math_shp_1': {
    ...data['math_shp_1'],
    'examples': [
      { 'question': 'If a line is 5.3 cm long, how many millimeters is it?', 'steps': ['1 cm = 10 mm.', '5.3 x 10 = 53 mm.'], 'illustration': '5.3cm x 10 = 53mm' },
      { 'question': 'How to measure a line accurately using a divider?', 'steps': ['Place one point of divider on start, other on end.', 'Lift divider without changing spread.', 'Place on ruler to read length.'] }
    ]
  },
  'math_shp_2': {
    ...data['math_shp_2'],
    'examples': [
      { 'question': 'What kind of angle is 210 degrees?', 'steps': ['180 < 210 < 360.', 'Therefore, it is a Reflex angle.'], 'illustration': 'Reflex angle (>180)' },
      { 'question': 'If an angle is 1/4 of a full rotation, how many degrees is it?', 'steps': ['Full rotation = 360.', '1/4 x 360 = 90 degrees.', 'It is a Right angle.'] }
    ]
  },
  'math_shp_3': {
    ...data['math_shp_3'],
    'examples': [
      { 'question': 'How many faces and vertices does a cube have?', 'steps': ['Faces: 6 square faces.', 'Vertices: 8 corners.'], 'illustration': '[Cube] -> 6 Faces, 8 Vertices, 12 Edges' },
      { 'question': 'Give an example of look-alikes for a sphere and a cylinder.', 'steps': ['Sphere: Football, Orange.', 'Cylinder: Pen, Gas Cylinder, Candle.'] }
    ]
  },
  'math_int_1': {
    ...data['math_int_1'],
    'examples': [
      { 'question': 'Represent -3 on a number line.', 'steps': ['Start at 0.', 'Move 3 steps to the left.', 'Mark it as -3.'], 'illustration': '(-3)---(-2)---(-1)---(0)---(+1)' },
      { 'question': 'Which is smaller: -20 or -10?', 'steps': ['On a negative scale, the larger digit is smaller value.', '-20 is further left than -10.', 'Result: -20 is smaller.'], 'illustration': '-20 < -10' }
    ]
  },
  'math_int_2': {
    ...data['math_int_2'],
    'examples': [
      { 'question': 'Calculate: (+5) + (-8)', 'steps': ['Start at 5.', 'Minus 8 means move 8 steps left.', 'You arrive at -3.'], 'illustration': '5 - 8 = -3' },
      { 'question': 'Calculate: (-10) - (-2)', 'steps': ['Minus of minus becomes plus.', '-10 + 2.', 'Move 2 steps right from -10 to -8.'], 'illustration': '-10 - (-2) = -8' }
    ]
  },
  'math_frac_1': {
    ...data['math_frac_1'],
    'examples': [
      { 'question': 'Identify numerator and denominator in 3/7.', 'steps': ['Top number is 3 (Numerator).', 'Bottom number is 7 (Denominator).'], 'illustration': '3(Num) / 7(Den)' },
      { 'question': 'What fraction of an hour is 20 minutes?', 'steps': ['1 hour = 60 minutes.', 'Fraction = 20/60.', 'Divide both by 20 to simplify -> 1/3.'], 'illustration': '20/60 = 1/3' }
    ]
  },
  'math_frac_2': {
    ...data['math_frac_2'],
    'examples': [
      { 'question': 'Convert 11/4 into a mixed fraction.', 'steps': ['Divide 11 by 4.', 'Quotient = 2, Remainder = 3.', 'Mixed form = 2 3/4.'], 'illustration': '11/4 = 2 whole and 3/4' },
      { 'question': 'Convert 2 1/3 into an improper fraction.', 'steps': ['Multiply whole (2) by denominator (3) = 6.', 'Add numerator (1) = 7.', 'Keep denominator (3) -> 7/3.'], 'illustration': '(2x3)+1 / 3 = 7/3' }
    ]
  },
  'math_frac_3': {
    ...data['math_frac_3'],
    'examples': [
      { 'question': 'Find an equivalent fraction of 2/5 with denominator 20.', 'steps': ['Compare 5 to 20: 5 x 4 = 20.', 'Multiply numerator by 4: 2 x 4 = 8.', 'Result: 8/20.'], 'illustration': '2/5 x 4/4 = 8/20' },
      { 'question': 'Simplify 12/18 to lowest terms.', 'steps': ['HCF of 12 and 18 is 6.', 'Divide both by 6.', '12/6 = 2; 18/6 = 3. Result: 2/3.'], 'illustration': '12/18 = 2/3' }
    ]
  },
  'math_frac_4': {
    ...data['math_frac_4'],
    'examples': [
      { 'question': 'Which is larger: 2/3 or 3/4?', 'steps': ['Cross multiply: (2x4) and (3x3).', '8 vs 9.', 'Since 9 is larger, 3/4 is larger.'], 'illustration': '2/3 [?] 3/4 -> 2x4=8, 3x3=9. 3/4 is bigger.' },
      { 'question': 'Compare 1/5 and 2/5.', 'steps': ['Denominators are same.', 'Numerator 2 > 1.', 'Result: 2/5 is larger.'] }
    ]
  },
  'math_frac_5': {
    ...data['math_frac_5'],
    'examples': [
      { 'question': 'Calculate 1/3 + 1/4.', 'steps': ['Find LCM of 3 and 4: 12.', 'Make like fractions: (4/12) + (3/12).', 'Add: 7/12.'], 'illustration': '1/3 + 1/4 = 4/12 + 3/12 = 7/12' },
      { 'question': 'Calculate 3/4 - 1/8.', 'steps': ['LCM of 4 and 8 is 8.', 'Convert 3/4 to 6/8.', 'Subtract: 6/8 - 1/8 = 5/8.'], 'illustration': '6/8 - 1/8 = 5/8' }
    ]
  },
  'math_dec_1': {
    ...data['math_dec_1'],
    'examples': [
      { 'question': 'Write 2/10 as a decimal.', 'steps': ['Tenths place is first after dot.', 'Result: 0.2.'], 'illustration': '2/10 = 0.2' },
      { 'question': 'Write 0.25 as a fraction in simplest form.', 'steps': ['Fraction = 25/100.', 'Divide both by 25.', 'Result: 1/4.'], 'illustration': '0.25 = 25/100 = 1/4' }
    ]
  },
  'math_dec_2': {
    ...data['math_dec_2'],
    'examples': [
      { 'question': 'Which is smaller: 1.07 or 1.7?', 'steps': ['Compare at same length: 1.07 vs 1.70.', '1.07 is smaller than 1.70.', 'Result: 1.07 is smaller.'], 'illustration': '1.07 < 1.70' },
      { 'question': 'Compare 0.5 and 0.500.', 'steps': ['Adding zeroes at end doesn\'t change value.', 'Therefore, 0.5 = 0.500.'] }
    ]
  },
  'math_dec_3': {
    ...data['math_dec_3'],
    'examples': [
      { 'question': 'Add: 12.35 + 4.9', 'steps': ['Align: 12.35 + 04.90.', 'Add: 17.25.'], 'illustration': '12.35 + 4.90 = 17.25' },
      { 'question': 'Subtract: 5 - 2.8', 'steps': ['Align: 5.0 - 2.8.', 'Subtract: 2.2.'], 'illustration': '5.0 - 2.8 = 2.2' }
    ]
  },
  'math_dh_1': {
    ...data['math_dh_1'],
    'examples': [
      { 'question': 'Represent 13 using tally marks.', 'steps': ['Group of 5: ||||/', 'Group of 5: ||||/', 'Three left: |||.', 'Total: ||||/ ||||/ |||.'], 'illustration': '[5] [5] [3] = 13' },
      { 'question': 'If a data set is: 2, 3, 2, 4, 3, 2, make a frequency table.', 'steps': ['Number 2: ||| (3)', 'Number 3: || (2)', 'Number 4: | (1).'] }
    ]
  },
  'math_dh_2': {
    ...data['math_dh_2'],
    'examples': [
      { 'question': 'Read pictograph: If 1 car icon = 5 cars, and row has 4 icons, how many cars?', 'steps': ['Multiply Icons by Scale.', '4 x 5 = 20 cars.'], 'illustration': '[Car] [Car] [Car] [Car] = 20' },
      { 'question': 'Read bar graph: If bar for "Apples" reaches level 15 on Y-axis, how many apples?', 'steps': ['Look at the top of the bar.', 'It aligns with 15.', 'Result: 15 apples.'] }
    ]
  },
  'math_men_1': {
    ...data['math_men_1'],
    'examples': [
      { 'question': 'Find perimeter of a rectangle with length 10cm and breadth 5cm.', 'steps': ['Formula: 2 x (L + B).', '2 x (10 + 5) = 2 x 15 = 30 cm.'], 'illustration': '2(10+5) = 30cm' },
      { 'question': 'Find side of a square whose perimeter is 40m.', 'steps': ['Formula: Perimeter = 4 x Side.', 'Side = Perimeter / 4.', '40 / 4 = 10m.'], 'illustration': 'Square Side = 40/4 = 10m' }
    ]
  },
  'math_men_2': {
    ...data['math_men_2'],
    'examples': [
      { 'question': 'Find area of a square plot of side 8m.', 'steps': ['Formula: Side x Side.', '8 x 8 = 64 sq.m.'], 'illustration': '8 x 8 = 64m²' },
      { 'question': 'Area of rectangle is 50 sq.cm. If length is 10cm, find breadth.', 'steps': ['Formula: Area = L x B.', 'B = Area / L.', '50 / 10 = 5 cm.'], 'illustration': 'Breadth = 50 / 10 = 5cm' }
    ]
  },
  'math_alg_1': {
    ...data['math_alg_1'],
    'examples': [
      { 'question': 'Write expression: 7 subtracted from twice of x.', 'steps': ['Twice of x is 2x.', 'Subtract 7 from it.', 'Result: 2x - 7.'], 'illustration': '2x - 7' },
      { 'question': 'If a matchbox cost x rupees, what is the cost of 10 matchboxes?', 'steps': ['Multiply units by price per unit.', '10 x x = 10x rupees.'] }
    ]
  },
  'math_alg_2': {
    ...data['math_alg_2'],
    'examples': [
      { 'question': 'What value of p satisfies p + 5 = 12?', 'steps': ['Use trial or subtract 5 from both sides.', 'p = 12 - 5.', 'p = 7.'], 'illustration': 'p = 7 satisfies the equation' },
      { 'question': 'Is x = 2 a solution for 3x - 1 = 5?', 'steps': ['Put x = 2 in LHS.', '3(2) - 1 = 6 - 1 = 5.', 'LHS = RHS. Yes, it is a solution.'] }
    ]
  },
  'math_rp_1': {
    ...data['math_rp_1'],
    'examples': [
      { 'question': 'Simplify ratio 15 : 25.', 'steps': ['HCF of 15 and 25 is 5.', '15/5 = 3; 25/5 = 5.', 'Simplified Ratio: 3 : 5.'], 'illustration': '15:25 = 3:5' },
      { 'question': 'Find ratio of 30cm to 1m.', 'steps': ['Convert to same unit: 1m = 100cm.', 'Ratio = 30 : 100.', 'Divide by 10 to simplify -> 3 : 10.'], 'illustration': '30cm : 100cm = 3:10' }
    ]
  },
  'math_rp_2': {
    ...data['math_rp_2'],
    'examples': [
      { 'question': 'Find missing term in 3 : 5 :: x : 10', 'steps': ['Product of Means = Product of Extremes.', '5 * x = 3 * 10.', '5x = 30. x = 6.'], 'illustration': 'x=6' },
      { 'question': 'Check if 2, 4, 10, 20 are in proportion.', 'steps': ['Ratio 1: 2/4 = 1/2.', 'Ratio 2: 10/20 = 1/2.', 'Since ratios are equal, Yes they are in proportion.'], 'illustration': '1/2 = 1/2 -> Yes!' }
    ]
  },
  'math_rp_3': {
    ...data['math_rp_3'],
    'examples': [
      { 'question': 'Cost of 1 dozen bananas is 36. Find cost of 7 bananas.', 'steps': ['1 dozen = 12 units.', 'Cost of 1 = 36 / 12 = 3.', 'Cost of 7 = 3 * 7 = 21.'], 'illustration': '7 bananas cost 21' },
      { 'question': 'A car travels 90 km in 2 hours. How far in 5 hours at same speed?', 'steps': ['Distance in 1 hour = 90 / 2 = 45 km.', 'Distance in 5 hours = 45 * 5 = 225 km.'], 'illustration': '225 km' }
    ]
  },
  'math_sym_1': {
    ...data['math_sym_1'],
    'examples': [
      { 'question': 'Identify number of lines of symmetry in an isosceles triangle.', 'steps': ['An isosceles triangle has 2 sides equal.', 'It has only 1 line of symmetry (vertical).'], 'illustration': 'A [Triangle] with 1 symmetry line.' },
      { 'question': 'How many lines of symmetry does a circle have?', 'steps': ['A circle can be folded along any diameter.', 'Therefore, it has infinite lines of symmetry.'], 'illustration': 'Circle has infinite lines of symmetry!' }
    ]
  },
  'math_sym_2': {
    ...data['math_sym_2'],
    'examples': [
      { 'question': 'Draw the reflection of the letter "P".', 'steps': ['Hold a mirror on the right of P.', 'The bubble of P points left in reflection.', 'Result: 𐑧 (mirrored P).'], 'illustration': 'P | q ' },
      { 'question': 'Example of reflection symmetry in nature.', 'steps': ['A butterfly with wings spread.', 'Each wing is a mirror image of the other.'] }
    ]
  },
  'math_pg_1': {
    ...data['math_pg_1'],
    'examples': [
      { 'question': 'Draw a circle of radius 3cm.', 'steps': ['Set compass distance to 3cm using ruler.', 'Place needle on paper.', 'Rotate 360 degrees.'], 'illustration': 'Radius = 3cm' },
      { 'question': 'Draw two concentric circles of radii 2cm and 4cm.', 'steps': ['Concentric means same center.', 'Fix center, draw 2cm circle.', 'Keep same center, draw 4cm circle.'] }
    ]
  },
  'math_pg_2': {
    ...data['math_pg_2'],
    'examples': [
      { 'question': 'Construct a line segment of 5cm using compass.', 'steps': ['Draw a line L, mark point A.', 'Set compass to 5cm distance.', 'Place at A, mark arc at B. AB is 5cm.'], 'illustration': 'A ---[5cm]--- B' },
      { 'question': 'Construct perpendicular bisector of a 6cm segment.', 'steps': ['Set compass > 3cm.', 'Draw arcs above/below from both ends.', 'Connect the meeting points of arcs.'] }
    ]
  },
  'math_pg_3': {
    ...data['math_pg_3'],
    'examples': [
      { 'question': 'Construct a 60-degree angle using compass.', 'steps': ['Draw ray OA. Take center O, draw arc.', 'Using same radius, center at intersection, draw arc.', 'Connect O to new point.'], 'illustration': '60 degrees' },
      { 'question': 'Bisect a 90-degree angle.', 'steps': ['Set compass on 90-deg marks.', 'Draw intersecting arcs in middle.', 'Resulting angle is 45 degrees.'] }
    ]
  }
};

Object.assign(data, math_rest);
fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Mathematics (all) with examples updated.');
