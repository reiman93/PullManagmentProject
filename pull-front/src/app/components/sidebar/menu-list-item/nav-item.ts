export interface INavItem {
  displayName: string;
  disabled?: boolean;
  iconName?: string;
  route?: string;
  role?: string[];
  children?: INavItem[];
}
