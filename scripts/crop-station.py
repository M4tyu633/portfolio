from PIL import Image

def generate_station_screenshot():
    # Load the high-res capture
    img = Image.open("C:/Users/matth/portfolio/public/images/fullpage.png")
    
    # In fullpage.png (1600 x 2600):
    # The reading station console is centered:
    # x: 210 to 1390 (width ~1180px)
    # y: ~830 to ~1570 (height ~740px)
    # 1180 * (10/16) = 737.5px (exact 16:10 aspect ratio)
    
    crop_x1 = 200
    crop_x2 = 1400  # width = 1200
    crop_y1 = 840
    crop_y2 = 840 + 750  # height = 750 (exact 1200x750 16:10)
    
    cropped = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    
    out_path = "C:/Users/matth/portfolio/public/images/project-knee-mri-station.png"
    cropped.save(out_path, "PNG", optimize=True)
    print("Saved station screenshot to:", out_path, "Size:", cropped.size)

if __name__ == "__main__":
    generate_station_screenshot()
