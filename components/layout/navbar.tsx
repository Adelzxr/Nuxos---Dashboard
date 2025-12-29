'use client'

import { Menu, Bell, Search, LogOut, User, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/theme-toggle'
import { logoutAction } from '@/app/actions/logout'

interface NavbarProps {
  onMenuClick: () => void
  userEmail?: string
}

export function Navbar({ onMenuClick, userEmail }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 h-20 border-b border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        {/* Left: Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden hover:bg-violet-500/10"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center: Search (desktop) */}
        <div className="hidden flex-1 items-center justify-start lg:flex lg:max-w-lg lg:ml-4">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-violet-500" />
            <Input
              type="search"
              placeholder="Search anything..."
              className="w-full pl-11 pr-4 bg-gray-100/50 dark:bg-gray-800/50 border-transparent hover:border-violet-500/30 focus:border-violet-500/50"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-6 items-center gap-1 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-2 text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Search (mobile) */}
          <Button variant="ghost" size="icon" className="lg:hidden hover:bg-violet-500/10">
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative hover:bg-violet-500/10">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 ring-2 ring-white dark:ring-gray-900" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden sm:block" />

          {/* User menu */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-xl bg-gray-100/50 dark:bg-gray-800/50">
              <div className="relative">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-violet-500/20">
                  {userEmail?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {userEmail?.split('@')[0] || 'User'}
                </span>
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-violet-500" /> Pro Member
                </span>
              </div>
            </div>
            
            <form action={logoutAction}>
              <Button 
                variant="ghost" 
                size="icon" 
                type="submit" 
                title="Sign out"
                className="hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Sign out</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

