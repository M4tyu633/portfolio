import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_heart_banner():
    font_dir = "C:/Windows/Fonts"
    font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 44)
    font_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
    font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 12)
    font_label = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
    font_score = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    font_small = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 13)
    font_code = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 13)
    font_code_bold = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 13)
    font_huge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 54)

    W, H = 1200, 750

    heart = Image.new("RGBA", (W, H), (8, 10, 15, 255))
    draw = ImageDraw.Draw(heart)

    # Grid
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 5), width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 5), width=1)

    # Rose / Crimson Glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(-80, -80), (450, 380)], fill=(244, 63, 94, 30))
    gdraw.ellipse([(850, 420), (1350, 850)], fill=(251, 113, 133, 24))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    heart.alpha_composite(glow)
    draw = ImageDraw.Draw(heart)

    # Header
    draw.text((60, 40), "Heart Disease Prediction", fill=(242, 244, 248), font=font_title)
    draw.text((62, 96), "SCIKIT-LEARN · GRADIENT BOOSTING · SHAP ATTRIBUTION", fill=(244, 63, 94), font=font_sub)

    # Main Glass Panel (1080 x 565)
    px, py, pw, ph = 60, 135, 1080, 565
    pbg = Image.new("RGBA", (pw, ph), (14, 18, 26, 240))
    heart.paste(pbg, (px, py), pbg)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(40, 48, 65), width=1)

    # Top Status Bar
    draw.line([(px, py + 38), (px + pw, py + 38)], fill=(30, 36, 50), width=1)
    draw.text((px + 20, py + 12), "● CARDIOSENSE AI · UCI CLINICAL COHORT (920 PATIENTS)", fill=(244, 63, 94), font=font_badge)
    draw.text((px + pw - 240, py + 12), "ROC-AUC: 0.919 · RECALL: 89.2%", fill=(150, 160, 180), font=font_badge)

    # Left: Real-Time Clinical Risk Cockpit
    lx = px + 25
    ly = py + 55
    lw = 480

    # Risk Meter Card
    draw.rounded_rectangle([lx, ly, lx + lw, ly + 210], radius=12, fill=(18, 23, 34), outline=(244, 63, 94, 90), width=1)
    draw.text((lx + 20, ly + 16), "PREDICTED CAD PROBABILITY", fill=(160, 170, 190), font=font_badge)
    
    # Risk Badge
    draw.rounded_rectangle([lx + lw - 120, ly + 14, lx + lw - 20, ly + 36], radius=12, fill=(244, 63, 94, 40), outline=(244, 63, 94, 180), width=1)
    draw.text((lx + lw - 105, ly + 18), "HIGH RISK", fill=(244, 63, 94), font=font_badge)

    # Huge Score
    draw.text((lx + 20, ly + 46), "86%", fill=(244, 63, 94), font=font_huge)
    draw.text((lx + 155, ly + 72), "probability of >50% stenosis", fill=(150, 160, 180), font=font_small)

    # Progress bar
    bar_x = lx + 20
    bar_y = ly + 125
    bar_w = lw - 40
    draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 8], radius=4, fill=(28, 35, 50))
    draw.rounded_rectangle([bar_x, bar_y, bar_x + int(bar_w * 0.86), bar_y + 8], radius=4, fill=(244, 63, 94))

    draw.text((bar_x, bar_y + 14), "0% Healthy", fill=(100, 110, 130), font=font_badge)
    draw.text((bar_x + int(bar_w * 0.35) - 20, bar_y + 14), "35% Moderate", fill=(100, 110, 130), font=font_badge)
    draw.text((bar_x + bar_w - 70, bar_y + 14), "65% Critical", fill=(100, 110, 130), font=font_badge)

    # Patient Vitals Strip
    vy = ly + 225
    vw = lw
    draw.rounded_rectangle([lx, vy, lx + vw, vy + 240], radius=12, fill=(16, 20, 30), outline=(35, 42, 58), width=1)
    draw.text((lx + 18, vy + 14), "ACTIVE PATIENT PROFILE", fill=(160, 170, 190), font=font_badge)

    vitals = [
        ("Demographics", "67yo Male · Asymptomatic CP"),
        ("Hemodynamics", "BP: 160 mm Hg · Chol: 286 mg/dl"),
        ("Cardiac Stress", "Max HR: 108 bpm · ST Dep: 2.8 mm"),
        ("Diagnostic Tests", "Fluoroscopy: 2 Vessels · Reversible Thal"),
    ]
    for vi, (vtitle, vval) in enumerate(vitals):
        cy = vy + 40 + vi * 46
        draw.text((lx + 18, cy), vtitle, fill=(120, 130, 150), font=font_small)
        draw.text((lx + 18, cy + 18), vval, fill=(242, 244, 248), font=font_label)

    # Vertical Separator
    sep_x = px + 535
    draw.line([(sep_x, py + 45), (sep_x, py + ph - 20)], fill=(32, 38, 52), width=1)

    # Right: SHAP Biomarker Attribution Waterfall
    rx = sep_x + 25
    ry = py + 55
    rw = pw - 580

    draw.text((rx, ry), "LOCAL SHAP / LOGIT FEATURE DRIVERS", fill=(160, 170, 190), font=font_badge)
    draw.text((rx + rw - 130, ry), "CONTRIBUTION", fill=(120, 130, 150), font=font_badge)

    drivers = [
        ("Chest Pain: Asymptomatic (Silent Ischemia)", "+ 1.28", True, 0.92),
        ("Fluoroscopy: 2 Colored Major Vessels", "+ 0.94", True, 0.75),
        ("Thalassemia: Reversible Perfusion Defect", "+ 0.85", True, 0.68),
        ("ST Depression: 2.8 mm (Oldpeak)", "+ 0.68", True, 0.58),
        ("Biological Sex: Male", "+ 0.48", True, 0.42),
        ("Resting Blood Pressure: 160 mm Hg", "+ 0.28", True, 0.28),
        ("Max HR Achieved: 108 bpm (Incompetence)", "+ 0.24", True, 0.22),
    ]

    r_y_start = ry + 30
    for idx, (label, val, is_risk, pct) in enumerate(drivers):
        cy = r_y_start + idx * 64
        draw.text((rx, cy), label, fill=(242, 244, 248), font=font_label)
        draw.text((rx + rw - 60, cy), val, fill=(244, 63, 94) if is_risk else (16, 185, 129), font=font_score)

        b_y = cy + 24
        draw.rounded_rectangle([rx, b_y, rx + rw, b_y + 6], radius=2, fill=(24, 30, 42))
        fill_w = int(rw * pct)
        draw.rounded_rectangle([rx, b_y, rx + fill_w, b_y + 6], radius=2, fill=(244, 63, 94) if is_risk else (16, 185, 129))

    # Corner reticles
    ret_col = (244, 63, 94, 160)
    draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

    heart_out = "C:/Users/matth/portfolio/public/images/project-heart.png"
    heart.save(heart_out, "PNG", quality=95)
    print("Saved Heart Disease banner to:", heart_out)

if __name__ == "__main__":
    generate_heart_banner()
