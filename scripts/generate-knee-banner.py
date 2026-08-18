import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_banner():
    W, H = 1200, 750
    img = Image.new("RGBA", (W, H), (10, 10, 12, 255))
    draw = ImageDraw.Draw(img)

    # 1. Subtle Grid Pattern
    grid_color = (255, 255, 255, 7)
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # 2. Ambient Warm Amber Glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(-100, -100), (450, 400)], fill=(224, 164, 88, 30))
    glow_draw.ellipse([(850, 400), (1350, 850)], fill=(217, 119, 6, 25))
    glow_draw.ellipse([(350, 200), (850, 700)], fill=(224, 164, 88, 15))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img.alpha_composite(glow)
    draw = ImageDraw.Draw(img)

    # Fonts
    font_dir = "C:/Windows/Fonts"
    font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 46)
    font_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 18)
    font_label = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    font_body = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 15)
    font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 12)
    font_score = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
    font_small = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 13)

    # 3. Top Header
    draw.text((60, 50), "Knee MRI Reader", fill=(242, 242, 244), font=font_title)
    draw.text((62, 108), "RSNA 2026 · 12-FINDING MULTI-VIEW DIAGNOSTIC STATION", fill=(224, 164, 88), font=font_sub)

    # 4. Main Workstation Panel (Glass Container)
    panel_x, panel_y, panel_w, panel_h = 60, 150, 1080, 540
    
    # Glass backdrop
    panel_bg = Image.new("RGBA", (panel_w, panel_h), (18, 18, 22, 220))
    img.paste(panel_bg, (panel_x, panel_y), panel_bg)
    draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=20, outline=(53, 53, 61, 255), width=1)

    # Left Section: 3 Real MRI Images from public/cases
    mri_paths = [
        ("C:/Users/matth/knee-web/public/cases/100956877472_SAG_FLUID_FS.jpg", "SAG FS · Lateral View"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_COR_FLUID_FS.jpg", "COR FS · Coronal Cut"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_AX_FLUID_FS.jpg", "AX FS · Joint Effusion"),
    ]

    mri_x = panel_x + 30
    mri_y = panel_y + 30
    mri_w = 140
    mri_h = 140
    gap = 20

    draw.text((mri_x, mri_y), "STUDY 100956877472 · MULTI-SERIES INPUTS", fill=(168, 168, 178), font=font_badge)

    for i, (path, label) in enumerate(mri_paths):
        ix = mri_x + (i % 3) * (mri_w + gap)
        iy = mri_y + 32 + (i // 3) * (mri_h + gap + 25)
        
        # Load and paste real MRI slice
        if os.path.exists(path):
            slice_img = Image.open(path).convert("RGBA")
            slice_img = slice_img.resize((mri_w, mri_h), Image.Resampling.LANCZOS)
            
            # Rounded mask for slice
            mask = Image.new("L", (mri_w, mri_h), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.rounded_rectangle([0, 0, mri_w, mri_h], radius=12, fill=255)
            
            img.paste(slice_img, (ix, iy), mask)
            
            # Gold frame for middle/effusion slice
            border_col = (224, 164, 88, 220) if i == 2 else (60, 60, 70, 180)
            draw.rounded_rectangle([ix, iy, ix + mri_w, iy + mri_h], radius=12, outline=border_col, width=2 if i == 2 else 1)
            
            # Slice label pill
            draw.rounded_rectangle([ix + 8, iy + mri_h - 26, ix + mri_w - 8, iy + mri_h - 6], radius=4, fill=(10, 10, 12, 230))
            draw.text((ix + 14, iy + mri_h - 24), label, fill=(224, 164, 88) if i == 2 else (200, 200, 210), font=font_badge)

    # Add 2 more slots on second row (SAG PD and COR T1)
    extra_paths = [
        ("C:/Users/matth/knee-web/public/cases/100956877472_SAG_FLUID_NOFS.jpg", "SAG PD · Proton Density"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_COR_T1.jpg", "COR T1 · Bone Anatomy"),
    ]
    for i, (path, label) in enumerate(extra_paths):
        ix = mri_x + i * (mri_w + gap)
        iy = mri_y + 32 + (mri_h + gap + 10)
        if os.path.exists(path):
            slice_img = Image.open(path).convert("RGBA")
            slice_img = slice_img.resize((mri_w, mri_h), Image.Resampling.LANCZOS)
            mask = Image.new("L", (mri_w, mri_h), 0)
            mask_draw = ImageDraw.Draw(mask)
            mask_draw.rounded_rectangle([0, 0, mri_w, mri_h], radius=12, fill=255)
            img.paste(slice_img, (ix, iy), mask)
            draw.rounded_rectangle([ix, iy, ix + mri_w, iy + mri_h], radius=12, outline=(60, 60, 70, 180), width=1)
            draw.rounded_rectangle([ix + 8, iy + mri_h - 26, ix + mri_w - 8, iy + mri_h - 6], radius=4, fill=(10, 10, 12, 230))
            draw.text((ix + 14, iy + mri_h - 24), label, fill=(200, 200, 210), font=font_badge)

    # Placeholder 6th slot ("SAG T1 · not acquired")
    ix6 = mri_x + 2 * (mri_w + gap)
    iy6 = mri_y + 32 + (mri_h + gap + 10)
    draw.rounded_rectangle([ix6, iy6, ix6 + mri_w, iy6 + mri_h], radius=12, fill=(16, 16, 20, 180), outline=(45, 45, 55, 180), width=1)
    draw.text((ix6 + 35, iy6 + 55), "SAG T1", fill=(100, 100, 110), font=font_label)
    draw.text((ix6 + 28, iy6 + 78), "not acquired", fill=(70, 70, 80), font=font_small)

    # Small footnote under left panel
    draw.text((mri_x, panel_y + panel_h - 45), "DINOv2 cross-attention aggregates across all 5 series simultaneously.", fill=(138, 138, 149), font=font_small)

    # Vertical Separator between MRI grid and Rankings
    sep_x = panel_x + 510
    draw.line([(sep_x, panel_y + 25), (sep_x, panel_y + panel_h - 25)], fill=(45, 45, 55), width=1)

    # Right Section: Real Model Rankings & Amber Truth Indicators
    rx = sep_x + 35
    ry = panel_y + 30
    rw = panel_w - 565

    draw.text((rx, ry), "MODEL FINDINGS RANKING", fill=(168, 168, 178), font=font_badge)
    
    # Top Gold Highlight Banner
    draw.rounded_rectangle([rx, ry + 25, rx + rw, ry + 65], radius=8, fill=(224, 164, 88, 30), outline=(224, 164, 88, 120), width=1)
    draw.text((rx + 16, ry + 36), "★  The 2 findings present were ranked #1, #2 of 12", fill=(242, 242, 244), font=font_badge)

    # Finding Rows
    findings = [
        ("1", "Effusion", "0.66", True, 0.66),
        ("2", "PF OA", "0.50", True, 0.50),
        ("3", "Synovitis", "0.39", False, 0.39),
        ("4", "Medial OA", "0.33", False, 0.33),
        ("5", "Medial Meniscus", "0.29", False, 0.29),
        ("6", "Lateral OA", "0.29", False, 0.29),
        ("7", "ACL Tear", "0.20", False, 0.20),
    ]

    row_y_start = ry + 85
    row_h = 52

    for idx, (rank, name, score_str, is_present, pct) in enumerate(findings):
        curr_y = row_y_start + idx * row_h
        
        # Rank num
        draw.text((rx, curr_y + 2), rank, fill=(138, 138, 149), font=font_small)
        
        # Name
        name_color = (242, 242, 244) if is_present else (190, 190, 200)
        draw.text((rx + 22, curr_y), name, fill=name_color, font=font_label)
        
        # Badges (PRESENT in Gold, <0.5 in Gray)
        if is_present:
            # Gold pill
            draw.rounded_rectangle([rx + 160, curr_y - 2, rx + 245, curr_y + 20], radius=5, fill=(224, 164, 88, 45), outline=(224, 164, 88, 180), width=1)
            draw.text((rx + 172, curr_y + 1), "PRESENT", fill=(224, 164, 88), font=font_badge)
        else:
            draw.rounded_rectangle([rx + 160, curr_y - 2, rx + 215, curr_y + 20], radius=5, fill=(35, 35, 42, 180), outline=(55, 55, 65, 180), width=1)
            draw.text((rx + 172, curr_y + 1), "< 0.5", fill=(138, 138, 149), font=font_badge)
            
        # Score on right
        score_color = (224, 164, 88) if is_present else (168, 168, 178)
        draw.text((rx + rw - 45, curr_y), score_str, fill=score_color, font=font_score)
        
        # Progress bar
        bar_x = rx + 22
        bar_y = curr_y + 25
        bar_w = rw - 22
        
        # Track
        draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 6], radius=3, fill=(28, 28, 34))
        
        # Fill
        fill_w = int(bar_w * pct)
        bar_fill = (224, 164, 88) if is_present else (70, 70, 85)
        draw.rounded_rectangle([bar_x, bar_y, bar_x + fill_w, bar_y + 6], radius=3, fill=bar_fill)

    # 5. Corner Reticles on Outer Canvas
    reticle_col = (224, 164, 88, 160)
    # Top Left
    draw.line([(30, 30), (55, 30)], fill=reticle_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=reticle_col, width=2)
    # Top Right
    draw.line([(W - 30, 30), (W - 55, 30)], fill=reticle_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=reticle_col, width=2)
    # Bottom Left
    draw.line([(30, H - 30), (55, H - 30)], fill=reticle_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=reticle_col, width=2)
    # Bottom Right
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=reticle_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=reticle_col, width=2)

    # Save to portfolio images
    out_path = "C:/Users/matth/portfolio/public/images/project-knee-mri.png"
    img.save(out_path, "PNG", quality=95)
    print("Successfully generated high-res workstation banner at:", out_path)

if __name__ == "__main__":
    create_banner()
