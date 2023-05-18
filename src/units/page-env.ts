
// заголовок страницы
export type PageTitle = string;

// навигация
export interface NavItem {
  url?: string,
  text: string,
}

export type NavStack = NavItem[];

// параметры окружения страницы
export interface PageEnv {
  title?: PageTitle,
  navStack?: NavStack,
  description?: string,
  keywords?: string,
}
