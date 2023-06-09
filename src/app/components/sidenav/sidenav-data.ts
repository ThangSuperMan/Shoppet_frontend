export interface sideNavProps {
  routeLink: string;
  label: string;
}

export const sideNavData: sideNavProps[] = [
  {
    routeLink: 'parcel-panel',
    label: 'Track your order',
  },
  {
    routeLink: 'signin',
    label: 'Sign in',
  },
  {
    routeLink: 'signup',
    label: 'Sign up',
  },
  {
    routeLink: 'logout',
    label: 'Log out',
  },
];
