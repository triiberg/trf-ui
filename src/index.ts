export { default as SideMenu } from "./SideMenu";
export { menuStructure } from "./menu";
export { DEFAULT_DISCOVERY_MENU_GROUP, DEFAULT_DISCOVERY_MENU_URL } from "./config";
export { fetchDiscoveryMenu, fetchDiscoveryMenuItems, mapDiscoveryMenuToMenuItems, mapDiscoveryMenuResponse } from "./discoveryClient";
export type { DiscoveryMenuResult } from "./discoveryClient";
export type { AppBaseUrls, AppId, DiscoveryMenuConfig, MenuItem } from "./types";
export { TRF_UI_VERSION } from "./version";
export { logout } from "./logout";
export { TranslationClient } from "./translationClient";

// Layout shells
export { AppShell } from "./components/AppShell";
export type { AppShellProps } from "./components/AppShell";
export { Page } from "./components/Page";
export type { PageProps, PageSize } from "./components/Page";

// Layout primitives
export { Stack } from "./components/Stack";
export type { StackProps } from "./components/Stack";
export { Row, Grow } from "./components/Row";
export type { RowProps } from "./components/Row";

// Typography
export { H1 } from "./components/H1";
export type { H1Props } from "./components/H1";
export { H2 } from "./components/H2";
export type { H2Props } from "./components/H2";
export { Text } from "./components/Text";
export type { TextProps, TextVariant, TextSize } from "./components/Text";

// Data display
export { InfoGrid, InfoField } from "./components/InfoGrid";
export type { InfoGridProps, InfoFieldProps } from "./components/InfoGrid";
export { InfoPanel } from "./components/InfoPanel";
export type { InfoPanelProps } from "./components/InfoPanel";
export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeColor } from "./components/Badge";

// Actions
export { ActionPill, ActionPillBadge } from "./components/ActionPill";
export type { ActionPillProps, ActionPillBadgeProps, ActionPillVariant } from "./components/ActionPill";
export { Button } from "./components/Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button";
export { LinkButton } from "./components/LinkButton";
export type { LinkButtonProps } from "./components/LinkButton";

// Forms
export { Input } from "./components/Input";
export type { InputProps, InputSize } from "./components/Input";
export { Select } from "./components/Select";
export type { SelectProps } from "./components/Select";
export { Textarea } from "./components/Textarea";
export { Field } from "./components/Field";
export type { FieldProps } from "./components/Field";

// Containers
export { Card } from "./components/Card";
export type { CardProps } from "./components/Card";
export { TableCard } from "./components/TableCard";
export type { TableCardProps } from "./components/TableCard";
export { StepCard } from "./components/StepCard";
export type { StepCardProps } from "./components/StepCard";
export { RadioCard } from "./components/RadioCard";
export type { RadioCardProps } from "./components/RadioCard";

// Feedback
export { ErrorBox } from "./components/ErrorBox";
export type { ErrorBoxProps } from "./components/ErrorBox";
export { EmptyState } from "./components/EmptyState";
export type { EmptyStateProps } from "./components/EmptyState";
export { LoadingState } from "./components/LoadingState";
export type { LoadingStateProps } from "./components/LoadingState";
export { Spinner } from "./components/Spinner";
export type { SpinnerProps, SpinnerSize } from "./components/Spinner";

// Legacy (kept for compat)
export { PageContainer } from "./components/PageContainer";
export type { PageContainerProps, PageContainerSize } from "./components/PageContainer";
export { PageHeader } from "./components/PageHeader";
export type { PageHeaderProps } from "./components/PageHeader";
