export interface NavItem {
  id: string;
  label: string;
  labelSi: string; // Sinhala
  labelTa: string; // Tamil
  href: string;
  iconName:
  | 'dashboard'
  | 'submit'
  | 'my-requests'
  | 'assignments'
  | 'view-all'
  | 'reports'
  | 'settings';
  badge?: number;
  badgeVariant?: 'urgent' | 'primary' | 'neutral';
  section?: string;
}

export interface NavSection {
  title: string;
  titleSi: string;
  titleTa: string;
  items: NavItem[];
}

export const NAVIGATION_SECTIONS: NavSection[] = [
  {
    title: 'Overview',
    titleSi: 'දළ විශ්ලේෂණය',
    titleTa: 'கண்ணோட்டம்',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        labelSi: 'ප්‍රධාන පුවරුව',
        labelTa: 'முகப்பு பலகை',
        href: '/dashboard',
        iconName: 'dashboard',
      },
    ],
  },
  {
    title: 'Request Management',
    titleSi: 'ඉල්ලීම් කළමනාකරණය',
    titleTa: 'கோரிக்கை மேலாண்மை',
    items: [
      {
        id: 'submit-request',
        label: 'Submit New Request',
        labelSi: 'නව ඉල්ලීමක් ඉදිරිපත් කිරීම',
        labelTa: 'புதிய கோரிக்கை சமர்ப்பிக்கவும்',
        href: '/request-management/submit-request',
        iconName: 'submit',
      },
      {
        id: 'my-requests',
        label: 'My Requests',
        labelSi: 'මගේ ඉල්ලීම්',
        labelTa: 'எனது கோரிக்கைகள்',
        href: '/requests/mine',
        iconName: 'my-requests',
        badge: 5,
        badgeVariant: 'primary',
      },
      {
        id: 'my-assignments',
        label: 'My Assignments',
        labelSi: 'මගේ පැවරුම්',
        labelTa: 'எனது பணிகள்',
        href: '/assignments',
        iconName: 'assignments',
        badge: 12,
        badgeVariant: 'urgent',
      },
      {
        id: 'view-requests',
        label: 'View All Requests',
        labelSi: 'සියලු ඉල්ලීම් බැලීම',
        labelTa: 'அனைத்து கோரிக்கைகளையும் பார்க்கவும்',
        href: '/requests/all',
        iconName: 'view-all',
      },
    ],
  },
  {
    title: 'System & Reports',
    titleSi: 'පද්ධතිය සහ වාර්තා',
    titleTa: 'அமைப்பும் அறிக்கைகளும்',
    items: [
      {
        id: 'reports',
        label: 'Audit & Reports',
        labelSi: 'විගණන සහ වාර්තා',
        labelTa: 'தணிக்கை மற்றும் அறிக்கைகள்',
        href: '/reports',
        iconName: 'reports',
      },
      {
        id: 'settings',
        label: 'Settings',
        labelSi: 'සැකසුම්',
        labelTa: 'அமைப்புகள்',
        href: '/settings',
        iconName: 'settings',
      },
    ],
  },
];
