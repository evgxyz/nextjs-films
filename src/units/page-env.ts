
// заголовок страницы
export type PageTitle = string;

// навигация
export interface NavStackItem {
  url: string,
  text: string
}

export type NavStack = NavStackItem[];

// параметры окружения страницы
export interface PageEnv {
  title?: PageTitle,
  navStack?: NavStack,
  description?: string,
  keywords?: string,
}
