import { Geist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { cookies } from "next/headers"
import { ThemeProvider } from "@/components/theme-provider"
import { ActiveThemeProvider } from "@/components/active-theme"
import { Toaster } from "@workspace/ui/components/sonner"
import { fontVariables } from "@/lib/fonts"
import { cn } from "@/lib/utils"


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get("active_theme")?.value
  const isScaled = activeThemeValue?.endsWith("-scaled")

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background overscroll-none font-sans antialiased",
          activeThemeValue ? `theme-${activeThemeValue}` : "",
          isScaled ? "theme-scaled" : "",
          fontVariables
        )}
      >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        {/* <Providers>{children}</Providers> */}
        {children}
        <Toaster />
      </ActiveThemeProvider>
      </ThemeProvider>
      </body>
    </html>
  )
}
