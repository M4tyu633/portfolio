from PIL import Image

def process_screenshot():
    img = Image.open("C:/Users/matth/portfolio/public/images/fullpage.png")
    W, H = img.size
    
    # We want a 16:10 aspect ratio centered around the Reading Station UI (around y = 650 to 1650)
    # Let's inspect horizontal content width: max-w is 1180px centered in 1600px width.
    # So left ~210px to ~1390px (width 1180px).
    # 1180 * (10/16) = 737.5px height.
    
    # Let's crop the Reading Station console with a balanced margin:
    crop_x1 = 150
    crop_x2 = 1450 # width = 1300
    target_h = int(1300 * (10 / 16)) # 812.5 -> 812
    
    # Let's find the y center for the reading station console (starts around 780px)
    crop_y1 = 820
    crop_y2 = crop_y1 + target_h
    
    cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    
    # Resize to standard 1200x750 (exact 16:10) with high quality LANCZOS
    final_img = cropped.resize((1200, 750), Image.Resampling.LANCZOS)
    
    out_path = "C:/Users/matth/portfolio/public/images/project-knee-mri.png"
    final_img.save(out_path, "PNG", optimize=True)
    print("Saved crisp 1200x750 real screenshot to:", out_path)

if __name__ == "__main__":
    process_screenshot()
