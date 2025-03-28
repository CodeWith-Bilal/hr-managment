export interface InputProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EMPLOYEE";
  profilePicture?: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationsState {
  notifications: Notification[];
  loading: boolean;
}

export interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  updateDate: string;
  percentage: number;
}
export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Notification {
  id: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface SidebarProps {
  activePath: string | null;
  onClose: () => void;
}

export interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabKey: string) => void;
  orientation?: "horizontal" | "vertical";
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
}

export interface InputFieldProps {
  label?: string;
  type?: "text" | "email" | "password" | "date" | "number" | "select" | "time";
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  isEditMode?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  showLabel?: boolean;
  className?: string;
  disabled?: boolean;
}
export interface HeaderProps {
  onMenuClick: () => void;
}
export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  className?: string;
}
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  designation: string;
  department: string;
  joiningDate: string;
  employmentType: string;
  salarySlip?: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  nationality: string;
  officeLocation: string;
  employeeId: string;
  slackId?: string;
  maritalStatus?: string;
  userName?: string;
  githubId?: string;
  workingDays?: string;
  skypeId?: string;
  appointmentLetter?: string;
  experienceLetter?: string;
  relivingLetter?: string;
  photoURL?: string;
  leaves?: string;
  attendance?: string;
  status?: string;
  checkOut?: string;
  photoPublicId?: string;
}
