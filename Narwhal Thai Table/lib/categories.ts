export type CategoryId =
  | 'specials' | 'appetizers' | 'salad' | 'grill' | 'soup'
  | 'curry' | 'rice' | 'noodles' | 'alacarte' | 'seafood'
  | 'dessert' | 'drinks' | 'sides';

export type Category = { id: CategoryId; label: string };

export const CATEGORIES: Category[] = [
  { id: 'specials',   label: 'Specials' },
  { id: 'appetizers', label: 'Appetizers' },
  { id: 'salad',      label: 'Salad' },
  { id: 'grill',      label: 'Grill' },
  { id: 'soup',       label: 'Soup' },
  { id: 'curry',      label: 'Curry' },
  { id: 'rice',       label: 'Rice' },
  { id: 'noodles',    label: 'Noodles' },
  { id: 'alacarte',   label: 'À La Carte' },
  { id: 'seafood',    label: 'Seafood' },
  { id: 'dessert',    label: 'Dessert' },
  { id: 'drinks',     label: 'Drinks' },
  { id: 'sides',      label: 'Sides & Protein' },
];

export function getCategoryLabel(id: CategoryId): string {
  return CATEGORIES.find(c => c.id === id)?.label ?? id;
}
