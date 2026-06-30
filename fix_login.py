import re

with open('src/app/login/page.tsx', 'r') as f:
    content = f.read()

# Container and background
content = re.sub(r'bg-\[\#f4f5f7\] dark:bg-\[\#16181d\]', 'app-shell-bg', content)
content = re.sub(r'<div\s+className="pointer-events-none absolute inset-x-0 top-0 h-\[350px\] bg-\[radial-gradient[^>]+>\s*</div>\s*', '', content)
content = re.sub(r'<div\s+className="pointer-events-none absolute inset-x-0 top-0 h-\[350px\] bg-\[radial-gradient[^>]+/>\s*', '', content)

# Link "Home"
content = re.sub(r'text-\[\#5a6070\] dark:text-\[\#4a5168\]', 'text-app-muted', content)
content = re.sub(r'hover:text-\[\#111318\] dark:hover:text-\[\#e8eaf0\]', 'hover:text-app-text', content)
content = re.sub(r'hover:bg-\[\#e4e6ed\]/40 dark:hover:bg-\[\#1c1f26\]', 'hover:bg-app-surface', content)

# Card
content = re.sub(r'border-\[\#2a2e3a\] bg-\[\#1c1f26\] shadow-\[0_4px_24px_rgba\(0,0,0,0.07\)\]', 'border-app-border bg-app-surface shadow-card', content)

# Loading overlay
content = re.sub(r'bg-\[\#1c1f26\]/80', 'bg-app-surface/80', content)
content = re.sub(r'text-\[\#00a67e\]', 'text-app-accent', content)
content = re.sub(r'text-\[\#111318\] dark:text-\[\#e8eaf0\]', 'text-app-text', content)

# Logo (remove it)
content = re.sub(r'\{\/\* Logo \*\/\}.*?\{\/\* Header \*\/\}', '{/* Header */}', content, flags=re.DOTALL)

# Header
content = re.sub(r'text-\[\#00a67e\] dark:text-\[\#00c896\]', 'text-app-accent', content)
content = re.sub(r'text-\[\#9aa0b0\] dark:text-\[\#4a5168\]', 'text-app-muted', content)

# Divider
content = re.sub(r'bg-\[\#f0f1f4\] dark:bg-\[\#21242d\]', 'bg-app-border', content)

# Google SignIn container
content = re.sub(r'border-\[\#e4e6ed\] dark:border-\[\#2a2e3a\] bg-\[\#f8f9fb\] dark:bg-\[\#21242d\]', 'border-app-border bg-app-bg', content)
content = re.sub(r'hover:border-\[\#00a67e\]/40 dark:hover:border-\[\#00c896\]/50', 'hover:border-app-accent/40', content)
content = re.sub(r'hover:bg-\[\#f0fdf8\] dark:hover:bg-\[\#21242d\]/80', 'hover:bg-app-card-hover', content)

# Lock icon text
content = re.sub(r'text-\[\#9aa0b0\] dark:text-\[\#3d4455\]', 'text-app-muted', content)

# Beta notice
content = re.sub(r'border-\[\#fde68a\] dark:border-\[rgba\(245,166,35,0.2\)\] bg-\[\#fffbeb\] dark:bg-\[\#1a1400\]', 'border-app-warning/30 bg-app-warning/10', content)
content = re.sub(r'text-\[\#d97706\] dark:text-\[\#f5a623\]', 'text-app-warning', content)
content = re.sub(r'text-\[\#92400e\] dark:text-\[\#7a6030\]', 'text-app-warning opacity-90', content)

with open('src/app/login/page.tsx', 'w') as f:
    f.write(content)
