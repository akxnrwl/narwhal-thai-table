import type { CategoryId } from './categories';

export type Allergen =
  | 'peanut' | 'tree-nut' | 'shellfish' | 'fish'
  | 'gluten' | 'soy' | 'dairy' | 'egg' | 'sesame';

export type Pairing = {
  drink?: string;
  sides?: string[];
};

export type DishStory = {
  /** Short one-paragraph "lede" shown right under the title */
  lede: string;
  /** Where the dish comes from — region, tradition, family memory */
  history?: string;
  /** How Chef Rainny wants the diner to experience it */
  howToEat?: string;
  /** Chef Rainny's voice — first-person quote */
  chefNote?: string;
};

export type Dish = {
  slug: string;
  name: string;
  thai: string;
  category: CategoryId;
  signature?: boolean;
  spicy?: boolean;
  /** Short menu blurb (≤120 chars) — shown on the menu list */
  description: string;
  /** Indicative price; "MKT" when seasonal/market */
  price?: string;
  /** Variants e.g. "Som Tum Thai (dried shrimp)" */
  variants?: string[];
  /** Key ingredients shown on the detail page */
  ingredients?: string[];
  allergens?: Allergen[];
  pairing?: Pairing;
  story?: DishStory;
  /** Future: real photography. When set, the dish detail page renders an image. */
  image?: { src: string; alt: string };
};

/* ============================================================
   ALL DISHES — ported from the original menu.
   3 signature dishes have full story content (Pad Thai, Tom Kha,
   Crying Tiger). The rest are placeholders with menu-list data
   only — story panels gracefully fall back to "story coming soon".
   ============================================================ */

export const DISHES: Dish[] = [
  /* ---------- SPECIALS ---------- */
  { slug: 'ceviche', name: 'Ceviche', thai: 'เซวิเช', category: 'specials', signature: true,
    description: "Chef Rainny's signature seafood ceviche.", price: 'MKT' },
  { slug: 'lobster', name: 'Lobster', thai: 'ล็อบสเตอร์', category: 'specials', signature: true,
    description: "Pacific lobster prepared in the chef's house style.", price: 'MKT' },
  { slug: 'dungeness-crab', name: 'Dungeness Crab', thai: 'ปูดันเจนเนส', category: 'specials', signature: true,
    description: 'Whole dungeness crab, seasonally selected.', price: 'MKT' },
  { slug: 'sea-bass-steamed', name: 'Sea Bass Steamed in Seafood Sauce', thai: 'ปลากะพงนึ่งซีฟู้ด', category: 'specials', signature: true,
    description: 'Whole steamed sea bass with a vibrant Thai seafood dressing.', price: '$42' },
  { slug: 'fried-chicken-lime-sauce', name: 'Fried Chicken with Lime Sauce', thai: 'ไก่ทอดน้ำปลามะนาว', category: 'specials', signature: true,
    description: 'Crispy chicken finished with a bright Thai lime sauce.', price: '$22' },
  { slug: 'narwhal-salad', name: 'Narwhal Salad', thai: 'ยำซีฟู้ดนาร์วาล', category: 'specials', signature: true,
    description: 'House salad of seafood ceviche, lemongrass and Thai herbs.', price: '$24' },
  { slug: 'american-fried-rice', name: 'American Fried Rice', thai: 'ข้าวผัดอเมริกัน', category: 'specials', signature: true,
    description: 'House favorite — red rice, fried egg, chicken, sausage.', price: '$18' },
  { slug: 'og-pad-thai', name: 'OG Pad Thai', thai: 'ผัดไทยต้นตำรับ', category: 'specials', signature: true,
    description: 'Hand-cut rice noodles, the original way.', price: '$19',
    ingredients: [
      'Hand-cut chantaboon rice noodles (jantaboon)',
      'House tamarind concentrate, palm sugar, fish sauce',
      'Pressed tofu, dried shrimp, salted radish (chai poh)',
      'Fresh garlic chives, bean sprouts, banana blossom',
      'Toasted peanuts, lime wedge, dried chili flakes',
      'Choice of chicken, shrimp, tofu, or no protein',
    ],
    allergens: ['peanut','fish','soy','egg','shellfish'],
    pairing: {
      drink: 'Thai iced tea (pictured) or a clean lager — both cut the tamarind sugar without fighting the dish.',
      sides: ['House Iced Tea', 'Fresh Cucumber Cooler', 'Crispy Spring Rolls'],
    },
    story: {
      lede: 'The pad thai that started in the kitchens of 1940s Bangkok, not the Americanized one with ketchup. Sweet from palm sugar, sour from tamarind, salty from fish sauce, smoky from a properly hot wok — and that\'s it.',
      history: 'Pad thai is younger than people think. It was popularized in the 1940s by Field Marshal Plaek Phibunsongkhram as part of a national identity campaign — rice was scarce in wartime, noodles ate less of the harvest, and the recipe spread from government cookbooks into every neighborhood. Chef Rainny learned it from her grandmother in Bangkok, who learned it from a noodle vendor in Chantaburi province (the home of chantaboon noodles) in the 1960s. The "OG" in the name is the chef\'s wink at how far the dish has drifted from this original — no ketchup, no peanut butter, no sweet pink sauce. Just the four-flavor balance Thai cooks chase: เปรี้ยว หวาน เค็ม เผ็ด — sour, sweet, salty, hot.',
      howToEat: 'A proper pad thai arrives with a lime wedge, raw bean sprouts, a small pile of dried chili flakes, and sometimes raw banana blossom on the side. Squeeze the lime over everything first. Then taste — if it needs more punch, sprinkle chili; if it needs more crunch, pile on the bean sprouts. The herbs and garnishes aren\'t decoration; they\'re your seat at the cook\'s table. The whole point is that you finish the seasoning to your own tongue.',
      chefNote: 'My grandmother told me: if your pad thai tastes like ketchup, you bought a tourist plate. Real pad thai is sour first, then sweet, then salty, then the chili sneaks in last. The smoke from the wok is the fifth flavor — and you can only get that with real heat. We cook every plate on a 200,000-BTU burner because anything less is a stir-fry, not pad thai.',
    },
  },
  { slug: 'cabbage-fish-sauce', name: 'Cabbage with Premium Fish Sauce', thai: 'กะหล่ำผัดน้ำปลา', category: 'specials', signature: true,
    description: "Stir-fried fresh cabbage with the chef's premium fish sauce.", price: '$14' },

  /* ---------- APPETIZERS ---------- */
  { slug: 'narwhal-chicken-wings', name: 'Narwhal Chicken Wings', thai: 'ปีกไก่ทอดนาร์วาล', category: 'appetizers', signature: true,
    description: 'Crispy fried chicken wings with Thai seasoning.', price: '$14' },
  { slug: 'clams-pop', name: 'Clams Pop', thai: 'หอยลายทอดกรอบ', category: 'appetizers', signature: true,
    description: 'Crispy fried clams served with the house Thai dip.', price: '$16' },
  { slug: 'thai-fish-cake', name: 'Thai Fish Cake', thai: 'ทอดมันปลา', category: 'appetizers',
    description: 'Fried fish cakes served with cucumber chili sauce and crushed peanuts.', price: '$12' },
  { slug: 'crispy-spring-rolls', name: 'Crispy Spring Rolls', thai: 'ปอเปี๊ยะทอด', category: 'appetizers',
    description: 'Hand-rolled, stuffed with ground pork and vegetables.', price: '$10' },
  { slug: 'vegetable-spring-rolls', name: 'Vegetable Spring Rolls', thai: 'ปอเปี๊ยะผัก', category: 'appetizers',
    description: 'A vegetarian rendition of the classic.', price: '$10' },
  { slug: 'fresh-spring-rolls', name: 'Fresh Spring Rolls', thai: 'ปอเปี๊ยะสด', category: 'appetizers',
    description: 'Soft rice paper wraps with herbs and fresh garnish.', price: '$11' },
  { slug: 'calamari', name: 'Calamari', thai: 'ปลาหมึกทอด', category: 'appetizers',
    description: 'Lightly battered, golden, served with Thai condiments.', price: '$13' },
  { slug: 'fried-thai-meatballs', name: 'Fried Thai Meatballs', thai: 'ลูกชิ้นทอด', category: 'appetizers',
    description: 'House-rolled meatballs, deep-fried and crisped.', price: '$10' },
  { slug: 'nam-sod-crispy-rice', name: 'Nam Sod with Crispy Rice', thai: 'แหนมซดข้าวตัง', category: 'appetizers',
    description: 'Nam sod blended with crumbly, fried crispy rice. Served with lettuce.', price: '$13' },

  /* ---------- SALAD ---------- */
  { slug: 'narwhal-salad-ceviche', name: 'Narwhal Salad — Ceviche', thai: 'ยำซีฟู้ดนาร์วาล', category: 'salad', signature: true,
    description: 'Seafood with mixed greens, lemongrass, mint, cucumber and house seafood dressing.', price: '$24' },
  { slug: 'rib-eye-salad', name: 'Rib-Eye Salad', thai: 'ยำเนื้อย่าง', category: 'salad',
    description: 'BBQ rib-eye over mixed greens, cucumber, radish, green onion and fresh mint with Thai herb dressing.', price: '$22' },
  { slug: 'fresh-fruit-salad', name: 'Fresh Fruit Salad', thai: 'สลัดผลไม้', category: 'salad', signature: true,
    description: 'Pineapple, apple, tomato and seasonal fruits.', price: '$11' },
  { slug: 'papaya-salad-som-tum', name: 'Papaya Salad — Som Tum', thai: 'ส้มตำ', category: 'salad', spicy: true,
    description: 'Hand-pounded to order. Choose your tradition.', price: '$13',
    variants: ['Som Tum Thai (dried shrimp)', 'Som Tum Thai (salty black crab)', 'Som Tum Lao (fermented fish sauce)'] },
  { slug: 'larb', name: 'Larb', thai: 'ลาบ', category: 'salad', spicy: true,
    description: 'Minced meat salad with red onion, toasted rice flour, chili flakes and fish sauce in a tangy dressing.', price: '$16' },
  { slug: 'nam-tok-salad', name: 'Nam-Tok Salad', thai: 'น้ำตกเนื้อ', category: 'salad', spicy: true,
    description: 'Grilled rib-eye, fresh Thai herbs, lime, chili, fish sauce and toasted rice powder, with cabbage wedges.', price: '$19' },

  /* ---------- GRILL ---------- */
  { slug: 'thai-sausage', name: 'Thai Sausage (3)', thai: 'ไส้กรอกไทย', category: 'grill',
    description: 'House Thai sausage grilled, garnished with fresh ginger, chili, cabbage, lime and peanut.', price: '$12' },
  { slug: 'satay-skewers', name: 'Sa-Tay Skewers (5)', thai: 'สะเต๊ะ', category: 'grill',
    description: 'Choice of chicken or beef — marinated, skewered, grilled. Served with peanut sauce and cucumber relish.', price: '$14' },
  { slug: 'crying-tiger', name: 'Crying Tiger', thai: 'เสือร้องไห้', category: 'grill', signature: true,
    description: 'Grilled rib-eye with toasted rice–mint–lime sauce and house chimichurri.', price: '$26',
    ingredients: [
      'Prime rib-eye, grilled over open flame to a hard sear',
      'Jaew dipping sauce: toasted sticky-rice powder (khao kua), fish sauce, lime, chili flakes',
      'Fresh mint, cilantro, sliced shallot',
      'House chimichurri (a coastal-California riff)',
      'Grilled cabbage wedges and sticky rice on the side',
    ],
    allergens: ['fish'],
    pairing: {
      drink: 'A bold Thai iced coffee or a smoky mezcal — both pick up the char from the grill.',
      sides: ['Sticky Rice', 'Som Tum Thai', 'Pink Milk for the kids'],
    },
    story: {
      lede: 'A grilled steak with a name that gets a lot of theories. The real story is older and quieter than the legend — Northeastern (Isaan) farmers grilled tougher cuts of beef hard, sliced them paper-thin, and chased the smoke with a sour-fire dip called jaew.',
      history: 'Suea Rong Hai (เสือร้องไห้) literally means "crying tiger." Most people repeat the romantic version: the steak is so good it would make a tiger cry. The older Isaan story is the opposite — the cut used was traditionally a tough piece of brisket, called the "tiger cry" cut because even a tiger would weep trying to chew it. Pounding it tender, grilling it hard, then slicing thin across the grain was the village fix. Northeastern Thai cooks paired it with jaew — a dipping sauce of toasted rice powder, lime, fish sauce, and a serious amount of chili — and ate it with sticky rice and a bottle of lao khao. Chef Rainny learned it from her uncle, who ran a roadside grill outside Khon Kaen and refused to use anything but rib-eye after he moved to California. "If you can afford the rib-eye," he told her, "the tiger doesn\'t cry anymore." We use his rule.',
      howToEat: "Eat it the Isaan way: roll a small ball of sticky rice between your fingertips, dip it lightly in the jaew, then pick up a slice of beef with the sticky-rice ball and eat the whole thing in one bite. Don't soak the rice in the sauce — the rice should be a spoon, not a sponge. A bite of cabbage between mouthfuls resets your palate. The chimichurri is for our California neighbors who grew up dipping steak in something green; you can use either, or both at the same time. The Thai uncles will not judge you.",
      chefNote: 'My uncle said the test of a real crying tiger is the moment after the first bite — the sticky rice, the smoke, the lime, the chili — they should hit one after the other, like a small parade. If they all hit at once, the cook rushed it. If only one hits, the cook was scared of the grill. We are not scared of the grill.',
    },
  },
  { slug: 'grilled-beef-meatballs', name: 'Grilled Beef Meatballs', thai: 'ลูกชิ้นเนื้อย่าง', category: 'grill',
    description: 'Skewered and charred over open flame.', price: '$11' },
  { slug: 'bbq-chicken', name: 'BBQ Chicken', thai: 'ไก่ย่าง', category: 'grill',
    description: 'Marinated Thai-style grilled chicken.', price: '$18' },

  /* ---------- SOUP ---------- */
  { slug: 'tom-yum', name: 'Tom Yum', thai: 'ต้มยำ', category: 'soup', spicy: true,
    description: 'Hot & sour broth with red chili paste, straw mushrooms, lemongrass, kaffir lime leaves, galangal and Thai herbs.', price: '$16' },
  { slug: 'tom-kha', name: 'Tom Kha', thai: 'ต้มข่า', category: 'soup', signature: true,
    description: 'Creamy hot & sour soup of coconut milk and red chili paste.', price: '$15',
    ingredients: [
      'Fresh coconut milk and coconut cream',
      'Galangal (kha) — sliced thick, the soup is named after it',
      'Lemongrass, kaffir lime leaves, Thai chili',
      'Straw mushrooms, cherry tomato',
      'Lime juice, fish sauce, palm sugar',
      'Choice of chicken, shrimp, or mushroom',
    ],
    allergens: ['fish','shellfish'],
    pairing: {
      drink: 'Pink milk or a chilled coconut water — both keep the heat friendly without numbing the herbs.',
      sides: ['Jasmine Rice', 'Fresh Spring Rolls', 'Sticky Rice'],
    },
    story: {
      lede: 'The gentler cousin of tom yum. Coconut milk softens the chili; galangal — not ginger, never ginger — gives it the perfume that makes Thai kitchens smell like home.',
      history: 'Tom kha gai (ต้มข่าไก่) is a Central-Thai everyday soup that became globally famous through Thai restaurants abroad. Its name is literal: tom = boil, kha = galangal, gai = chicken. The defining ingredient is the galangal — a rhizome that looks like ginger\'s cousin but tastes like nothing else: piney, citrusy, slightly soapy in the best way. Chef Rainny\'s family makes it every time someone in the house catches a cold. "Coconut milk for comfort," her mother used to say, "galangal for the medicine, lime for the soul." Most Western menus over-sweeten it and under-spice it. Ours stays closer to the home version: bright, hot enough to wake you up, fragrant enough to be a hug.',
      howToEat: "Tom kha is meant to be eaten with rice — not as a starter on its own. Spoon some of the broth and a few pieces of chicken or shrimp over a small mound of jasmine, mix gently, eat in a single bite. The slices of galangal in the bowl are not for chewing — they're flavor delivery, like a bay leaf. Push them to the side. If it's too spicy, add a small splash of coconut milk from a side dish (just ask); if it's too mild, ask for our nam prik pao chili oil. The lime wedge on top is yours to deploy when it lands.",
      chefNote: "When my mother was sick, she asked for tom kha before she asked for medicine. I think it's because every spoon tastes like the kitchen we grew up in — the same coconut, the same galangal, the same lime hitting the bowl right at the end. I cook it the same way now, in California. The galangal is harder to get here, but I won't substitute. It has to be kha.",
    },
  },
  { slug: 'po-tak-seafood', name: 'Po-Tak Seafood', thai: 'โป๊ะแตก', category: 'soup', spicy: true,
    description: 'Clear hot & sour broth with mixed seafood.', price: '$19' },
  { slug: 'wonton-soup', name: 'Wonton Soup', thai: 'เกี๊ยวน้ำ', category: 'soup',
    description: 'Pork wontons, bean sprouts and green onion in chicken broth.', price: '$13' },

  /* ---------- CURRY ---------- */
  { slug: 'green-curry', name: 'Green Curry', thai: 'แกงเขียวหวาน', category: 'curry', spicy: true,
    description: 'Green chili paste, herbs and spices with eggplant, bamboo shoots, bell pepper and holy basil in coconut milk.', price: '$17' },
  { slug: 'panang-curry', name: 'Panang Curry', thai: 'พะแนง', category: 'curry', signature: true,
    description: 'Sweet, thick curry with short rib or sliced beef, red panang paste, coconut cream, red bell peppers and holy basil.', price: '$19' },
  { slug: 'yellow-curry', name: 'Yellow Curry', thai: 'แกงกะหรี่', category: 'curry',
    description: 'Creamy yellow curry with slow-cooked chicken and potato.', price: '$17' },
  { slug: 'massaman-curry', name: 'Massaman Curry', thai: 'มัสมั่น', category: 'curry',
    description: 'Chili paste, beef, peanuts, spices and Thai herbs.', price: '$19' },
  { slug: 'pineapple-curry', name: 'Pineapple Curry', thai: 'แกงคั่วสับปะรด', category: 'curry',
    description: 'Creamy red curry with pineapple, coconut cream and your protein of choice.', price: '$18' },

  /* ---------- RICE ---------- */
  { slug: 'narwhal-garlic-beef', name: 'Narwhal Garlic Beef', thai: 'ข้าวผัดกระเทียมเนื้อ', category: 'rice', signature: true,
    description: 'Garlic stir-fried rice with beef, served with fresh cucumber.', price: '$18' },
  { slug: 'crab-fried-rice', name: 'Crab Fried Rice', thai: 'ข้าวผัดปู', category: 'rice',
    description: 'Crab meat, egg and green onion.', price: '$22' },
  { slug: 'house-fried-rice', name: 'House Fried Rice', thai: 'ข้าวผัด', category: 'rice',
    description: 'Red rice, protein of choice, egg, greens, served with cucumber.', price: '$14' },
  { slug: 'pineapple-fried-rice', name: 'Pineapple Fried Rice', thai: 'ข้าวผัดสับปะรด', category: 'rice',
    description: 'Pineapple, egg, raisins, green onion, tomato, cashew nut and your protein of choice.', price: '$16' },
  { slug: 'garlic-pepper-over-rice', name: 'Garlic & Pepper Over Rice', thai: 'ราดข้าวกระเทียมพริกไทย', category: 'rice',
    description: 'Stir-fried garlic and pepper over rice.', price: '$14' },
  { slug: 'teriyaki-chicken-over-rice', name: 'Teriyaki Chicken Over Rice', thai: 'ราดข้าวไก่เทอริยากิ', category: 'rice',
    description: 'Tender chicken stir-fried in a savory-sweet sauce.', price: '$14' },
  { slug: 'krapow-over-rice', name: 'Krapow Over Rice', thai: 'ราดข้าวกะเพรา', category: 'rice', spicy: true,
    description: 'Spicy basil stir-fry of chili and holy basil.', price: '$14' },

  /* ---------- NOODLES ---------- */
  { slug: 'pad-see-ew', name: 'Pad See Ew', thai: 'ผัดซีอิ๊ว', category: 'noodles',
    description: 'Flat rice noodles, protein of choice, Chinese broccoli, egg.', price: '$15' },
  { slug: 'pad-kee-mao', name: 'Pad Kee Mao — Drunken Noodles', thai: 'ผัดขี้เมา', category: 'noodles', spicy: true,
    description: 'Hot & spicy stir-fried flat rice noodles with bell pepper, holy basil and Thai chili.', price: '$16' },
  { slug: 'thai-boat-noodles', name: 'Thai Boat Noodles', thai: 'ก๋วยเตี๋ยวเรือ', category: 'noodles',
    description: 'Rice noodles with slow-cooked beef, meatballs, rich beef broth, ong choy and bean sprouts.', price: '$17' },
  { slug: 'rad-na', name: 'Rad Na', thai: 'ราดหน้า', category: 'noodles',
    description: 'Flat rice noodles with Chinese broccoli, finished with gravy.', price: '$15' },
  { slug: 'sukhothai-tom-yum-noodles', name: 'Sukhothai Tom Yum Noodles', thai: 'สุโขทัยต้มยำ', category: 'noodles', spicy: true,
    description: 'Rice noodles with ground pork, dried shrimp, crushed peanuts, chili powder, green beans, bean sprouts and green onion in chicken broth.', price: '$17' },
  { slug: 'stir-fried-glass-noodles', name: 'Stir-Fried Glass Noodles', thai: 'ผัดวุ้นเส้น', category: 'noodles',
    description: 'Glass noodles stir-fried with egg, cabbage, green onion, celery and protein of choice.', price: '$15' },
  { slug: 'chow-mein', name: 'Chow Mein', thai: 'บะหมี่ผัด', category: 'noodles',
    description: 'Egg noodles with protein of choice, egg, cabbage, celery, carrot and green onion.', price: '$15' },

  /* ---------- A LA CARTE ---------- */
  { slug: 'crispy-chicken-cashew', name: 'Crispy Chicken with Cashew Nut', thai: 'ไก่ผัดเม็ดมะม่วง', category: 'alacarte',
    description: 'Stir-fried cashews with chili, white onion, green onion and chili paste.', price: '$17' },
  { slug: 'crispy-pork-garlic-chili', name: 'Crispy Pork — Garlic & Chili', thai: 'หมูกรอบพริกกระเทียม', category: 'alacarte', spicy: true,
    description: 'Crispy pork stir-fried with chili and garlic.', price: '$18' },
  { slug: 'garlic-pepper', name: 'Garlic & Pepper', thai: 'ผัดกระเทียมพริกไทย', category: 'alacarte',
    description: 'Stir-fried garlic and pepper, protein of choice.', price: '$16' },
  { slug: 'stir-fried-crab-curry', name: 'Stir-Fried Crab with Curry Powder', thai: 'ปูผัดผงกะหรี่', category: 'alacarte',
    description: 'Chunky crab meat, fragrant curry powder, egg and fresh vegetables.', price: '$26' },
  { slug: 'spicy-green-bean', name: 'Spicy Green Bean', thai: 'ผัดถั่วฝักยาว', category: 'alacarte', spicy: true,
    description: 'Green beans stir-fried in a spicy chili paste sauce.', price: '$15' },
  { slug: 'spicy-basil-krapow', name: 'Spicy Basil — Krapow', thai: 'ผัดกะเพรา', category: 'alacarte', spicy: true,
    description: 'Stir-fried chili and holy basil.', price: '$15' },
  { slug: 'sweet-sour', name: 'Sweet & Sour', thai: 'ผัดเปรี้ยวหวาน', category: 'alacarte',
    description: 'Pineapple, onion and bell peppers with your protein in a sweet and sour sauce.', price: '$16' },
  { slug: 'ong-choy', name: 'Ong Choy', thai: 'ผัดผักบุ้ง', category: 'alacarte',
    description: 'Stir-fried Chinese watercress with bean sauce, garlic and chili.', price: '$14' },
  { slug: 'chinese-broccoli', name: 'Chinese Broccoli', thai: 'ผัดคะน้า', category: 'alacarte',
    description: 'Stir-fried Chinese broccoli with garlic and oyster sauce.', price: '$14' },
  { slug: 'american-broccoli', name: 'American Broccoli', thai: 'ผัดบรอกโคลี', category: 'alacarte',
    description: 'Stir-fried American broccoli with gravy sauce, protein of choice.', price: '$15' },
  { slug: 'mixed-vegetables', name: 'Mixed Vegetables', thai: 'ผัดผักรวม', category: 'alacarte',
    description: 'Seasonal stir-fried mixed vegetables, protein of choice.', price: '$15' },

  /* ---------- SEAFOOD ---------- */
  { slug: 'whole-pompano-sweet-chili', name: 'Whole Pompano with Sweet Chili', thai: 'ปลาจะละเม็ดทอด', category: 'seafood', signature: true,
    description: 'Whole pompano fried until crisp, glazed with sweet chili.', price: '$36' },
  { slug: 'white-fish-mango-salad', name: 'White Fish Fillet with Mango Salad', thai: 'ปลาทอดยำมะม่วง', category: 'seafood', signature: true,
    description: 'Lightly battered fish fillet, served with a fresh mango salad.', price: '$28' },
  { slug: 'spicy-clams-basil', name: 'Spicy Clams with Basil', thai: 'หอยลายผัดกะเพรา', category: 'seafood', signature: true, spicy: true,
    description: 'Clams in sweet chili paste and holy basil.', price: '$22' },
  { slug: 'steamed-clams-mussels', name: 'Steamed Clams & Green Mussels', thai: 'หอยนึ่งตะไคร้', category: 'seafood', signature: true,
    description: 'Steamed with lemongrass and holy basil, served with spicy seafood sauce.', price: '$24' },
  { slug: 'kung-ob-wun-sen', name: 'Kung Ob Wun Sen', thai: 'กุ้งอบวุ้นเส้น', category: 'seafood', signature: true,
    description: 'Whole shrimp baked over glass noodles.', price: '$28' },

  /* ---------- DESSERT ---------- */
  { slug: 'narwhal-sundae', name: 'Narwhal Sundae', thai: 'นาร์วาลซันเดย์', category: 'dessert',
    description: 'Ice cream — vanilla, chocolate or strawberry — cone, whipped cream.', price: '$8' },
  { slug: 'mango-sticky-rice', name: 'Mango with Sweet Sticky Rice', thai: 'ข้าวเหนียวมะม่วง', category: 'dessert',
    description: 'Finished with sweet coconut cream.', price: '$12' },
  { slug: 'coconut-ice-cream-bread', name: 'Coconut Ice Cream with Bread', thai: 'ไอติมกะทิขนมปัง', category: 'dessert', signature: true,
    description: 'House-churned coconut ice cream, warm bread, classic Thai toppings.', price: '$10' },

  /* ---------- DRINKS ---------- */
  { slug: 'thai-tea', name: 'Thai Tea', thai: 'ชาไทย', category: 'drinks',
    description: 'Sweet, rich and creamy.', price: '$5' },
  { slug: 'thai-green-tea', name: 'Thai Green Tea', thai: 'ชาเขียวไทย', category: 'drinks',
    description: 'Green jasmine tea, sweet and creamy.', price: '$5' },
  { slug: 'thai-coffee', name: 'Thai Coffee', thai: 'กาแฟไทย', category: 'drinks',
    description: 'Robust Thai-style iced coffee.', price: '$5' },
  { slug: 'house-iced-tea', name: 'House Iced Tea', thai: 'ชาดำเย็น', category: 'drinks',
    description: 'Refreshing brewed daily.', price: '$4' },
  { slug: 'pink-milk', name: 'Pink Milk', thai: 'นมเย็น', category: 'drinks',
    description: 'A Thai childhood classic.', price: '$5' },
  { slug: 'passion-fruit', name: 'Passion Fruit', thai: 'เสาวรส', category: 'drinks',
    description: 'Fresh, tropical, bright.', price: '$6' },
  { slug: 'fresh-cucumber', name: 'Fresh Cucumber', thai: 'น้ำแตงกวา', category: 'drinks',
    description: 'Cooling cucumber refresher.', price: '$5' },
  { slug: 'pineapple-soda', name: 'Pineapple Soda', thai: 'โซดาสับปะรด', category: 'drinks',
    description: 'House pineapple, sparkling.', price: '$6' },
  { slug: 'soda', name: 'Soda', thai: '', category: 'drinks',
    description: 'Coke · Diet Coke · Dr. Pepper · Sprite.', price: '$3' },
];

/* ============================================================
   Helpers
   ============================================================ */

export function getDishBySlug(slug: string): Dish | undefined {
  return DISHES.find(d => d.slug === slug);
}

export function getDishesByCategory(category: string): Dish[] {
  return DISHES.filter(d => d.category === category);
}

export function getAllSlugs(): string[] {
  return DISHES.map(d => d.slug);
}
