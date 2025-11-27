export enum Category {
  NUMBER = 'Angka',
  PRONOUN = 'Kata Ganti',
  COMMON = 'Umum',
  VERB = 'Kata Kerja',
  ADJECTIVE = 'Kata Sifat',
  QUESTION = 'Kata Tanya',
  TIME = 'Waktu',
  FAMILY = 'Keluarga',
  NATURE = 'Alam',
  OTHER = 'Lainnya'
}

export interface DictionaryEntry {
  id: string;
  indonesian: string;
  mee: string;
  category: Category;
  notes?: string;
}
