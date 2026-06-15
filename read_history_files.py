import os

sections_path = r"C:\Users\Leharin\.gemini\antigravity\scratch\original_sections.txt"
index_steps_path = r"C:\Users\Leharin\.gemini\antigravity\scratch\index_steps.txt"
output_path = r"C:\Users\Leharin\.gemini\antigravity\scratch\search_matches.txt"

def search_file(path, query, out_f):
    if not os.path.exists(path):
        out_f.write(f"{path} not found.\n")
        return
    out_f.write(f"Searching in {path} for '{query}':\n")
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    pos = 0
    while True:
        pos = content.lower().find(query.lower(), pos)
        if pos == -1:
            break
        start = max(0, pos - 200)
        end = min(len(content), pos + 2500) # Get larger context
        out_f.write(f"\n--- MATCH AT POSITION {pos} ---\n")
        out_f.write(content[start:end] + "\n")
        out_f.write("---------------------------------\n\n")
        pos += len(query)

if __name__ == "__main__":
    with open(output_path, "w", encoding="utf-8") as out_f:
        search_file(sections_path, "More About Nolita", out_f)
        search_file(sections_path, "The Sourdough, The Grill", out_f)
        search_file(index_steps_path, "main-header", out_f)
    print("Done. Wrote matches to C:\\Users\\Leharin\\.gemini\\antigravity\\scratch\\search_matches.txt")
