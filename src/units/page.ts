
// заголовок страницы
export type PageTitle = string;

// навигация
export interface NavStackItem {
  url: string,
  text: string
}

export type NavStack = NavStackItem[];
