import { useState } from 'react';
import { mainNav } from '../../data/navigation';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="lg:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 p-2"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2 bg-charcoal' : 'bg-white'
            }`}
            style={
              !isOpen
                ? undefined
                : { backgroundColor: 'var(--color-charcoal, #1A1C20)' }
            }
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isOpen ? 'opacity-0' : 'bg-white'
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2 bg-charcoal' : 'bg-white'
            }`}
            style={
              !isOpen
                ? undefined
                : { backgroundColor: 'var(--color-charcoal, #1A1C20)' }
            }
          />
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-40 transform transition-transform duration-300 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="pt-24 px-6 pb-8 overflow-y-auto h-full">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => (
              <div key={item.href}>
                <div className="flex items-center justify-between">
                  <a
                    href={item.href}
                    className="flex-1 py-3 text-base font-medium"
                    style={{ color: 'var(--color-charcoal, #1A1C20)' }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <button
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.href ? null : item.href
                        )
                      }
                      className="p-2"
                      aria-label={`Toggle ${item.label} submenu`}
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === item.href ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {item.children && openDropdown === item.href && (
                  <div className="pl-4 pb-2">
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm"
                        style={{ color: 'var(--color-pool-medium, #1A6FA8)' }}
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col gap-3">
            <a
              href="tel:0842520520"
              className="text-center py-3 text-base font-medium"
              style={{ color: 'var(--color-charcoal, #1A1C20)' }}
            >
              0842 520 520
            </a>
            <a
              href="/configurateur/"
              className="text-center py-3 rounded-lg font-heading font-semibold text-base"
              style={{
                backgroundColor: 'var(--color-gold, #C8A951)',
                color: 'var(--color-charcoal, #1A1C20)',
              }}
              onClick={() => setIsOpen(false)}
            >
              Devis gratuit
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
