import os
import subprocess

DIRECTORY = '../lists'  # Path to the directory with .md files
TEMPLATE_PATH = os.path.join(DIRECTORY, 'template.html')  # Full path to the HTML template

def convert_md_to_html(directory: str, template_path: str) -> None:
    """
    Convert .md files in a directory to .html using pandoc with a specified template.

    Args:
        directory (str): Path to the directory containing the .md files.
        template_path (str): Full path to the HTML template to be used by pandoc.
    """

    # Iterate over all files in the specified directory
    for filename in os.listdir(directory):

        # Check if the file is a Markdown file
        if filename.endswith(".md"):
            # Combine the directory path with the filename to get the full path for the .md file
            full_md_path = os.path.join(directory, filename)

            # Replace the .md extension with .html for the output file
            output_path = os.path.join(directory, filename.rsplit('.', 1)[0] + '.html')

            # Run the pandoc command to convert the markdown file to HTML using the given template
            subprocess.run(['pandoc', '-s', full_md_path, f'--template={template_path}', '-o', output_path])

def main() -> None:
    convert_md_to_html(DIRECTORY, TEMPLATE_PATH)
    print("Conversion complete!")

if __name__ == "__main__":
    main()
