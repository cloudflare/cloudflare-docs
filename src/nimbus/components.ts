/**
 * MDX globals registry — components available inside MDX without `import`.
 * Wired via `<Content components={components} />` in `[...slug].astro`.
 * Add new components here as you build (or install) them.
 *
 * Also serves as the import target for `~/components` resolution
 * (e.g. `import { APIRequest } from "~/components"`). Every component
 * imported this way must have a named export here.
 */

import { Aside } from "./components/ui/aside";
import RenderImpl from "./components/Render.astro";
import { Card } from "./components/ui/card";
import { CardGrid as CardGridImpl } from "./components/ui/card-grid";
import { PackageManagers as PackageManagersImpl } from "./components/ui/package-managers";
import { Step, Steps as StepsImpl } from "./components/ui/steps";
import { Tabs as TabsImpl, TabItem as TabItemImpl } from "./components/ui/tabs";
import { Badge as BadgeImpl } from "./components/ui/badge";
import { Code as CodeImpl } from "./components/ui/code";
import { FileTree as FileTreeImpl } from "./components/ui/file-tree";
// CF-domain components.
import APIRequestImpl from "./components/cf/APIRequest.astro";
import DashButtonImpl from "./components/cf/DashButton.astro";
import DirectoryListingImpl from "./components/cf/DirectoryListing.astro";
import DescriptionImpl from "./components/cf/Description.astro";
import DetailsImpl from "./components/cf/Details.astro";
import MetaInfoImpl from "./components/cf/MetaInfo.astro";
import TypeImpl from "./components/cf/Type.astro";
import WranglerConfigImpl from "./components/cf/WranglerConfig.astro";
import WranglerNamespaceImpl from "./components/cf/WranglerNamespace.astro";
import FeatureImpl from "./components/cf/Feature.astro";
import GlossaryImpl from "./components/cf/Glossary.astro";
import GlossaryTooltipImpl from "./components/cf/GlossaryTooltip.astro";
import LinkButtonImpl from "./components/ui/link-button/LinkButton.astro";
import LinkCardImpl from "./components/cf/LinkCard.astro";
import LinkTitleCardImpl from "./components/cf/LinkTitleCard.astro";
import ListTutorialsImpl from "./components/cf/ListTutorials.astro";
import PlanImpl from "./components/cf/Plan.astro";
import ProductReleaseNotesImpl from "./components/cf/ProductReleaseNotes.astro";
import ProductChangelogImpl from "./components/cf/ProductChangelog.astro";
import RelatedProductImpl from "./components/cf/RelatedProduct.astro";
import TypeScriptExampleImpl from "./components/cf/TypeScriptExample.astro";
import TunnelCalculatorImpl from "./components/cf/TunnelCalculator.astro";
import InlineBadgeImpl from "./components/cf/InlineBadge.astro";
import YouTubeImpl from "./components/cf/YouTube.astro";
import ExampleImpl from "./components/cf/Example.astro";
import MarkdownImpl from "./components/cf/Markdown.astro";
import CURLImpl from "./components/cf/CURL.astro";
import GitHubCodeImpl from "./components/cf/GitHubCode.astro";
import FlexImpl from "./components/cf/Flex.astro";
import WidthImpl from "./components/cf/Width.astro";
import RuleIDImpl from "./components/cf/RuleID.astro";
import PublicStatsImpl from "./components/cf/PublicStats.astro";
import RSSButtonImpl from "./components/cf/RSSButton.astro";
import GlossaryDefinitionImpl from "./components/cf/GlossaryDefinition.astro";
import WranglerCommandImpl from "./components/cf/WranglerCommand.astro";
import AnchorHeadingImpl from "./components/cf/AnchorHeading.astro";
import FeatureTableImpl from "./components/cf/FeatureTable.astro";
import ProductFeaturesImpl from "./components/cf/ProductFeatures.astro";
import PagesBuildPresetImpl from "./components/cf/PagesBuildPreset.astro";
import PagesBuildPresetsTableImpl from "./components/cf/PagesBuildPresetsTable.astro";
import ComponentsUsageImpl from "./components/cf/ComponentsUsage.astro";
import GranularControlApplicationsListImpl from "./components/cf/GranularControlApplicationsList.astro";
import ProductAvailabilityTextImpl from "./components/cf/ProductAvailabilityText.astro";
import WorkersTemplatesImpl from "./components/cf/WorkersTemplates.astro";
import AvailableNotificationsImpl from "./components/cf/AvailableNotifications.astro";
import ExtraFlagDetailsImpl from "./components/cf/ExtraFlagDetails.astro";
import FourCardGridImpl from "./components/cf/FourCardGrid.astro";
import ListCardImpl from "./components/cf/ListCard.astro";
import StreamImpl from "./components/cf/Stream.astro";
import PagesBuildEnvironmentImpl from "./components/cf/PagesBuildEnvironment.astro";
import PagesBuildEnvironmentLanguagesImpl from "./components/cf/PagesBuildEnvironmentLanguages.astro";
import PagesBuildEnvironmentToolsImpl from "./components/cf/PagesBuildEnvironmentTools.astro";
import WARPReleasesImpl from "./components/cf/WARPReleases.astro";
import WARPReleaseImpl from "./components/cf/WARPRelease.astro";
import CompatibilityFlagsImpl from "./components/cf/CompatibilityFlags.astro";
import AutoconfigDiagramImpl from "./components/cf/AutoconfigDiagram.astro";
import WorkersArchitectureDiagramImpl from "./components/cf/WorkersArchitectureDiagram.astro";
import WorkersIsolateDiagramImpl from "./components/cf/WorkersIsolateDiagram.astro";
import AnimatedWorkflowDiagramImpl from "./components/cf/AnimatedWorkflowDiagram.astro";
import AgentsPlatformDiagramImpl from "./components/cf/AgentsPlatformDiagram.astro";
import R2LocalUploadsDiagramImpl from "./components/cf/R2LocalUploadsDiagram.astro";
import WorkersVPCEgressDiagramImpl from "./components/cf/WorkersVPCEgressDiagram.astro";
import WorkersVPCOverviewDiagramImpl from "./components/cf/WorkersVPCOverviewDiagram.astro";
import { AgentPrimitivesDiagram } from "./components/react/diagram-showcase/AgentPrimitivesDiagram";
import ResourcesBySelectorImpl from "./components/cf/ResourcesBySelector.astro";
import SubtractIPCalculatorImpl from "./components/react/SubtractIPCalculator";

// --- Nimbus components (re-exported by name so `~/components` imports resolve) ---
export const Render = RenderImpl;
export const PackageManagers = PackageManagersImpl;
export const Steps = StepsImpl;
export const Tabs = TabsImpl;
export const TabItem = TabItemImpl;
export const CardGrid = CardGridImpl;
export { Aside, Card };

// --- CF-domain components --------------------------------------------------
export const DashButton = DashButtonImpl;
export const DirectoryListing = DirectoryListingImpl;
export const Description = DescriptionImpl;
export const Details = DetailsImpl;
export const MetaInfo = MetaInfoImpl;
export const Type = TypeImpl;
export const WranglerConfig = WranglerConfigImpl;
export const WranglerNamespace = WranglerNamespaceImpl;
export const Feature = FeatureImpl;
export const Glossary = GlossaryImpl;
export const GlossaryTooltip = GlossaryTooltipImpl;
export const LinkButton = LinkButtonImpl;
export const LinkCard = LinkCardImpl;
export const LinkTitleCard = LinkTitleCardImpl;
export const ListTutorials = ListTutorialsImpl;
export const Plan = PlanImpl;
export const ProductReleaseNotes = ProductReleaseNotesImpl;
export const ProductChangelog = ProductChangelogImpl;
export const RelatedProduct = RelatedProductImpl;
export const TypeScriptExample = TypeScriptExampleImpl;
export const TunnelCalculator = TunnelCalculatorImpl;
export const InlineBadge = InlineBadgeImpl;
export const YouTube = YouTubeImpl;
export const Example = ExampleImpl;
export const Markdown = MarkdownImpl;
export const CURL = CURLImpl;
export const GitHubCode = GitHubCodeImpl;
export const Flex = FlexImpl;
export const Width = WidthImpl;
export const RuleID = RuleIDImpl;
export const PublicStats = PublicStatsImpl;
export const RSSButton = RSSButtonImpl;
export const GlossaryDefinition = GlossaryDefinitionImpl;
export const WranglerCommand = WranglerCommandImpl;
export const AnchorHeading = AnchorHeadingImpl;
export const FeatureTable = FeatureTableImpl;
export const ProductFeatures = ProductFeaturesImpl;
export const PagesBuildPreset = PagesBuildPresetImpl;
export const PagesBuildPresetsTable = PagesBuildPresetsTableImpl;
export const ComponentsUsage = ComponentsUsageImpl;
export const GranularControlApplicationsList = GranularControlApplicationsListImpl;
export const ProductAvailabilityText = ProductAvailabilityTextImpl;
export const WorkersTemplates = WorkersTemplatesImpl;
export const AvailableNotifications = AvailableNotificationsImpl;
export const ExtraFlagDetails = ExtraFlagDetailsImpl;
export const FourCardGrid = FourCardGridImpl;
export const ListCard = ListCardImpl;
export const Stream = StreamImpl;
export const PagesBuildEnvironment = PagesBuildEnvironmentImpl;
export const PagesBuildEnvironmentLanguages = PagesBuildEnvironmentLanguagesImpl;
export const PagesBuildEnvironmentTools = PagesBuildEnvironmentToolsImpl;
export const WARPReleases = WARPReleasesImpl;
export const WARPRelease = WARPReleaseImpl;
export const CompatibilityFlags = CompatibilityFlagsImpl;
export const AutoconfigDiagram = AutoconfigDiagramImpl;
export const WorkersArchitectureDiagram = WorkersArchitectureDiagramImpl;
export const WorkersIsolateDiagram = WorkersIsolateDiagramImpl;
export const AnimatedWorkflowDiagram = AnimatedWorkflowDiagramImpl;
export const AgentsPlatformDiagram = AgentsPlatformDiagramImpl;
export const R2LocalUploadsDiagram = R2LocalUploadsDiagramImpl;
export const WorkersVPCEgressDiagram = WorkersVPCEgressDiagramImpl;
export const WorkersVPCOverviewDiagram = WorkersVPCOverviewDiagramImpl;

// SubtractIPCalculator — real port (Phase B / W12, D9). React island
// (`cidr-tools`); analytics `track()` is stubbed to a no-op via
// `~/util/zaraz`. Used by 2 cloudflare-one partials (warp split tunnels /
// tunnel route IPs), which import it directly from
// `~/components/SubtractIPCalculator.tsx` (re-export shim → react/ impl).
export const SubtractIPCalculator = SubtractIPCalculatorImpl;

// Registry UI aliased under the upstream (Starlight) names so MDX imports
// like `import { Badge } from "~/components"` resolve unchanged.
export const Badge = BadgeImpl;
export const Code = CodeImpl;
export const FileTree = FileTreeImpl;

// APIRequest — real port (D1). Build-time OpenAPI fetch (`~/util/api.ts`,
// pinned commit, swagger-parser deref) + dot-prop lookup, rendered via
// CURL/Details. Registry-global: this single flip un-stubs all 60 invocations
// across the 26 already-migrated pages — validated against the pinned schema.
// CF-domain; destined for the `cf-api-request` registry slug (deferred).
export const APIRequest = APIRequestImpl;

// ResourcesBySelector — real port (Phase A / W3). Aggregates docs + videos +
// learning-paths into a filterable card grid. NOTE: this is registry-global,
// so flipping it un-stubs ALL MDX usages. The 3 RA "demos" pages
// (kv/demos, queues/demos, workers-ai/.../demos-architectures) filter on
// content types cf-nimbus has zero of and would hit the zero-match throw at
// build — they intentionally keep their own per-page Deferred wrapping and
// are NOT touched here (see D8).
export const ResourcesBySelector = ResourcesBySelectorImpl;

// --- MDX globals registry (parsed by `nimbus-docs` integration) ----------
export const components = {
  // Nimbus built-ins
  Aside,
  Card,
  CardGrid,
  Step,
  // Re-exports (also available via `~/components` imports)
  PackageManagers,
  Render,
  Steps,
  TabItem,
  Tabs,
  // CF-domain components (mix of real ports + remaining stubs)
  APIRequest,
  DashButton,
  Markdown,
  Details,
  DirectoryListing,
  Example,
  FileTree,
  GitHubCode,
  Glossary,
  GlossaryTooltip,
  ListTutorials,
  MetaInfo,
  ProductReleaseNotes,
  ProductChangelog,
  ResourcesBySelector,
  Type,
  TypeScriptExample,
  TunnelCalculator,
  WranglerConfig,
  WranglerNamespace,
  // CF-domain real ports
  Description,
  Feature,
  LinkButton,
  LinkCard,
  LinkTitleCard,
  Plan,
  RelatedProduct,
  InlineBadge,
  YouTube,
  CURL,
  Flex,
  Width,
  RuleID,
  PublicStats,
  RSSButton,
  GlossaryDefinition,
  WranglerCommand,
  AnchorHeading,
  FeatureTable,
  ProductFeatures,
  PagesBuildPreset,
  PagesBuildPresetsTable,
  ComponentsUsage,
  GranularControlApplicationsList,
  ProductAvailabilityText,
  WorkersTemplates,
  AvailableNotifications,
  ExtraFlagDetails,
  FourCardGrid,
  ListCard,
  Stream,
  PagesBuildEnvironment,
  PagesBuildEnvironmentLanguages,
  PagesBuildEnvironmentTools,
  WARPReleases,
  WARPRelease,
  CompatibilityFlags,
  AutoconfigDiagram,
  WorkersVPCEgressDiagram,
  WorkersVPCOverviewDiagram,
  WorkersArchitectureDiagram,
  WorkersIsolateDiagram,
  AnimatedWorkflowDiagram,
  AgentsPlatformDiagram,
  R2LocalUploadsDiagram,
  SubtractIPCalculator,
  // Registry UI aliased to upstream Starlight names
  Badge,
  Code,
  AgentPrimitivesDiagram
};
