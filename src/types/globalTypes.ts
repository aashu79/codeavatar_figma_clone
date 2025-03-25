export interface CardProps {
  id: string | number;
  title: string;
  description: string;
  isHighlighted?: boolean;
}

export interface MenuItem {
  id: number;
  title: string;
  hasSubmenu: boolean;
  submenuItems?: SubmenuItem[];
}

export interface SubmenuItem {
  id: string;
  title: string;
}
