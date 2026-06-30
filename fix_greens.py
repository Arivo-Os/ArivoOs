import os
import re

directory = 'src'
replacements = {
    r'emerald-500': 'accent-primary',
    r'emerald-400': 'accent-primary',
    r'emerald-600': 'accent-primary',
    r'emerald-550': 'accent-primary',
    r'teal-500': 'accent-primary',
    r'brand-green': 'accent-primary',
    r'text-\[\#22C55E\]': 'text-accent-primary',
    r'text-\[\#4ADE80\]': 'text-accent-primary',
    r'hover:text-\[\#4ADE80\]': 'hover:text-accent-primary-hover',
    r'\#4ADE80': 'var(--accent-primary)',
}

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            new_content = content
            for pattern, replacement in replacements.items():
                new_content = re.sub(pattern, replacement, new_content)
                
            if new_content != content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
