import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/company/decemilia', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/decemilia', label: 'GitHub' },
    { icon: Mail, href: 'mailto:contact@decemilia.cloud', label: 'Contact' },
  ];

  return (
    <footer className="bg-black border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-gray-600 text-sm">
          © {currentYear} Decemilia Cloud. AI-powered solutions.
        </div>
        <div className="flex gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors"
                aria-label={link.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}