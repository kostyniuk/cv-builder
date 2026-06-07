"use client"

import * as React from "react"
import { ChevronDownIcon, WandSparklesIcon } from "lucide-react"

import { CopyButton } from "@/components/custom/copy-button"
import { type Badge } from "@/components/ui/badge"
import { PackageManagerIcon } from "@/components/ui/icons/package-manager-icons"
import { cn } from "@/lib/utils"
import type { PackageManager } from "@/lib/package-manager"

export type { PackageManager }
export { convertNpmCommand } from "@/lib/package-manager"

// ─── Context ─────────────────────────────────────────────────────────────────

type PackageManagerContextValue = {
  packageManager: PackageManager
  setPackageManager: (pm: PackageManager) => void
}

const PackageManagerContext = React.createContext<PackageManagerContextValue>({
  packageManager: "npm",
  setPackageManager: () => { },
})

export function PackageManagerProvider({
  children,
  defaultPackageManager = "npm",
}: {
  children: React.ReactNode
  defaultPackageManager?: PackageManager
}) {
  const [packageManager, setPackageManagerState] =
    React.useState<PackageManager>(() => {
      if (typeof window !== "undefined") {
        return (
          (localStorage.getItem("packageManager") as PackageManager) ??
          defaultPackageManager
        )
      }
      return defaultPackageManager
    })

  const setPackageManager = React.useCallback((pm: PackageManager) => {
    setPackageManagerState(pm)
    localStorage.setItem("packageManager", pm)
  }, [])

  return (
    <PackageManagerContext.Provider
      value={{ packageManager, setPackageManager }}
    >
      {children}
    </PackageManagerContext.Provider>
  )
}

export function usePackageManager() {
  return React.useContext(PackageManagerContext)
}

/** A custom, non-code tab (e.g. an explainer) rendered before the code tabs. */
export type CodeBlockTab = {
  value: string
  label: string
  content: React.ReactNode
}

export type CodeBlockCommandProps = {
  prompt?: string
  npm?: string
  pnpm?: string
  yarn?: string
  bun?: string
  /** Extra non-code tabs, shown before the prompt / package-manager tabs. */
  tabs?: CodeBlockTab[]
  /** Value of the tab selected initially (custom value, "prompt", or a PM). */
  defaultTab?: string
  /** Renders the body behind a chevron toggle in the header. */
  collapsible?: boolean
  /** Start collapsed (only meaningful with `collapsible`). */
  defaultCollapsed?: boolean
  /** Optional content shown above the tab header, inside the card border. */
  summary?: React.ReactNode
  onCopySuccess?: (text: string) => void
  onCopyError?: (error: Error) => void
  className?: string
  badgeComponent?: React.ComponentType<React.ComponentProps<typeof Badge>>
}

const PACKAGE_MANAGERS: PackageManager[] = ["pnpm", "yarn", "npm", "bun"]

export function CodeBlockCommand({
  prompt,
  npm,
  pnpm,
  yarn,
  bun,
  tabs,
  defaultTab,
  collapsible = false,
  defaultCollapsed = false,
  summary,
  onCopySuccess,
  onCopyError,
  className,
  badgeComponent: BadgeComponent,
}: CodeBlockCommandProps) {
  const { packageManager, setPackageManager } = usePackageManager()

  const commands: Record<PackageManager, string | undefined> = {
    npm,
    pnpm,
    yarn,
    bun,
  }

  const availablePMs = PACKAGE_MANAGERS.filter(
    (pm) => commands[pm] !== undefined
  )
  const customTabs = tabs ?? []

  // Local tab state. Custom tabs come first, then prompt, then package managers.
  const [activeTab, setActiveTab] = React.useState<string>(() => {
    if (defaultTab) return defaultTab
    if (customTabs[0]) return customTabs[0].value
    if (prompt) return "prompt"
    if (availablePMs.includes(packageManager)) return packageManager
    return availablePMs[0] ?? "npm"
  })

  const [collapsed, setCollapsed] = React.useState(
    collapsible && defaultCollapsed
  )

  // Follow the shared PM context when it changes — adjusted during render
  // (React's recommended alternative to syncing state in an effect).
  const [prevPackageManager, setPrevPackageManager] =
    React.useState(packageManager)
  if (packageManager !== prevPackageManager) {
    setPrevPackageManager(packageManager)
    if (availablePMs.includes(packageManager)) {
      setActiveTab(packageManager)
    }
  }

  function handleTabClick(tab: string) {
    setActiveTab(tab)
    if (collapsible) setCollapsed(false)
    if ((PACKAGE_MANAGERS as string[]).includes(tab)) {
      setPackageManager(tab as PackageManager)
    }
  }

  const activeCustomTab = customTabs.find((t) => t.value === activeTab)
  const isCodeTab = !activeCustomTab
  const codeContent =
    activeTab === "prompt"
      ? (prompt ?? "")
      : ((commands[activeTab as PackageManager] ?? "") as string)
  const [copied, setCopied] = React.useState(false)
  const copiedTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(
    null
  )

  React.useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current)
      }
    }
  }, [])

  // Custom tabs can still offer the prompt copy action when a prompt exists.
  const copyText = isCodeTab ? codeContent : (prompt ?? "")
  React.useEffect(() => {
    setCopied(false)
  }, [copyText])

  const idleCopyLabel =
    activeTab === "prompt" || (!isCodeTab && prompt)
      ? "Copy Prompt"
      : "Copy Command"
  const copyLabel = copied ? "Copied" : idleCopyLabel
  const canCopy = copyText.length > 0

  function handleCopySuccess(text: string) {
    setCopied(true)
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current)
    }
    copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    onCopySuccess?.(text)
  }

  return (
    <div
      data-slot="code-block-command"
      className={cn(
        "relative overflow-hidden rounded-xl border bg-muted",
        className
      )}
    >
      {summary ? (
        <div data-slot="code-block-command-summary" className="border-b px-4">
          {summary}
        </div>
      ) : null}

      <div
        data-slot="code-block-command-header"
        className="flex items-center border-b px-4"
      >
        {BadgeComponent ? (
          <BadgeComponent
            data-slot="code-block-command-active-icon"
            variant="outline"
            className="mr-3 size-6 shrink-0 rounded-full p-0"
          >
            {prompt ? (
              <WandSparklesIcon aria-hidden className="size-3.5" />
            ) : (
              <PackageManagerIcon
                packageManager={packageManager}
                className="size-3.5"
              />
            )}
          </BadgeComponent>
        ) : prompt ? (
          <WandSparklesIcon
            aria-hidden
            data-slot="code-block-command-active-icon"
            className="mr-3 size-5 shrink-0 text-muted-foreground"
          />
        ) : (
          <PackageManagerIcon
            packageManager={packageManager}
            data-slot="code-block-command-active-icon"
            className="mr-3 size-5 shrink-0 text-muted-foreground"
          />
        )}

        {customTabs.map((tab) => (
          <TabButton
            key={tab.value}
            active={activeTab === tab.value}
            onClick={() => handleTabClick(tab.value)}
          >
            {tab.label}
          </TabButton>
        ))}

        {prompt && (
          <TabButton
            active={activeTab === "prompt"}
            onClick={() => handleTabClick("prompt")}
          >
            Prompt
          </TabButton>
        )}

        {availablePMs.map((pm) => (
          <TabButton
            key={pm}
            active={activeTab === pm}
            onClick={() => handleTabClick(pm)}
          >
            {pm}
          </TabButton>
        ))}

        <div className="ml-auto flex items-center gap-1 pl-2">
          {canCopy && (
            <CopyButton
              data-slot="code-block-command-copy"
              size="sm"
              variant="outline"
              className="h-8 rounded-[3px] border-black/25 bg-transparent px-2.5 font-mono text-[10px] font-medium tracking-[0.16em] uppercase hover:border-black/45 hover:bg-[#f4f1e8]/50"
              text={copyText}
              onCopySuccess={handleCopySuccess}
              onCopyError={onCopyError}
            >
              <span className="inline-block min-w-[8.75em] text-left">
                {copyLabel}
              </span>
            </CopyButton>
          )}
          {collapsible && (
            <button
              type="button"
              data-slot="code-block-command-toggle"
              onClick={() => setCollapsed((c) => !c)}
              aria-label={collapsed ? "Expand" : "Collapse"}
              aria-expanded={!collapsed}
              className="inline-flex size-7 items-center justify-center rounded-[min(var(--radius-md),12px)] text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <ChevronDownIcon
                className={cn(
                  "size-4 transition-transform duration-300",
                  !collapsed && "rotate-180"
                )}
              />
            </button>
          )}
        </div>
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          collapsible && collapsed ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        )}
      >
        <div className="overflow-hidden">
          {activeCustomTab ? (
            <div
              data-slot="code-block-command-content"
              className="px-4 py-3"
            >
              {activeCustomTab.content}
            </div>
          ) : (
            <div
              data-slot="code-block-command-content"
              className="px-4 py-3"
            >
              <pre className="overflow-x-auto overscroll-x-contain">
                <code
                  data-slot="code-block-command-code"
                  className="font-mono text-sm leading-none text-foreground/80"
                >
                  {activeTab !== "prompt" && (
                    <span className="select-none">$ </span>
                  )}
                  {codeContent}
                </code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-slot="code-block-command-tab"
      data-active={active}
      className={cn(
        "h-10 border-b-2 border-transparent px-2 font-mono text-sm transition-colors",
        active
          ? "border-foreground text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  )
}
