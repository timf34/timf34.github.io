# Script for converting .md files to .html files in the lists directory

import os
import subprocess

# Path to the directory with the .md files
directory = '../lists'  # Lists directory

# Full path to the template.html file
template_path = os.path.join(directory, 'template.html')

# Loop through each file in the directory
for filename in os.listdir(directory):
    if filename.endswith(".md"):
        full_md_path = os.path.join(directory, filename)
        output_name = filename.rsplit('.', 1)[0] + '.html'  # Replace .md with .html
        output_path = os.path.join(directory, output_name)
        # Run the pandoc command to convert .md to .html
        subprocess.run(['pandoc', '-s', full_md_path, f'--template={template_path}', '-o', output_path])

print("Conversion complete!")
