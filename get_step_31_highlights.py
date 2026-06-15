import os

matches_path = r"C:\Users\Leharin\.gemini\antigravity\scratch\search_matches.txt"
out_path = r"C:\Users\Leharin\.gemini\antigravity\scratch\step_31_highlights_output.txt"

def get_highlights():
    if not os.path.exists(matches_path):
        print("Matches file not found.")
        return
        
    with open(matches_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Search for MATCH AT POSITION 11040
    pos = content.find("MATCH AT POSITION 11040")
    if pos == -1:
        print("Position 11040 match not found.")
        return
        
    # Write 2500 characters from there to a file
    with open(out_path, "w", encoding="utf-8") as out:
        out.write(content[pos:pos+2500])
    print(f"Wrote step 31 highlights to {out_path}")

if __name__ == "__main__":
    get_highlights()
