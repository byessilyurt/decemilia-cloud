import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/byessilyurt', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/yessilyurt', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:y.yesilyurt14@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Yusuf Yesilyurt. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}