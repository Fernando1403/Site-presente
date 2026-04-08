export type User = 'Fernando' | 'Giovanna';

export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

export interface Gift {
  id: string;
  name: string;
  type: string;
  price: string;
  priority: PriorityLevel;
  owner: User;
  createdAt: number;
}

export const PRIORITY_LABELS: Record<PriorityLevel, string> = {
  1: 'Baixa',
  2: 'Média',
  3: 'Alta',
  4: 'Muito Alta',
  5: 'Primeira Opção (Must-Have)',
};

export const GIFT_TYPES = [
  'Roupas e Acessórios',
  'Eletrônicos',
  'Livros e Papelaria',
  'Casa e Decoração',
  'Beleza e Cuidado',
  'Experiências',
  'Outros'
];
