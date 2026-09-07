import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_banners():
    W, H = 1200, 750
    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images"))
    os.makedirs(out_dir, exist_ok=True)

    font_dir = "C:/Windows/Fonts"
    font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 44)
    font_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)

    projects_config = [
        {
            "src_file": os.path.join(out_dir, "project-glycoswarm.png"),
            "out_file": os.path.join(out_dir, "project-glycoswarm-light.png"),
            "title": "GlycoSwarm AI",
            "sub": "LangGraph · Python · FastAPI · Next.js",
            "accent": (15, 118, 110),
            "glow_col": (15, 118, 110, 22),
            "crop_box": (60, 150, 1140, 695),
            "radius": 20,
            "target_y": 145,
        },
        {
            "src_file": os.path.join(out_dir, "project-knee-mri.png"),
            "out_file": os.path.join(out_dir, "project-knee-mri-light.png"),
            "title": "Knee MRI Reader",
            "sub": "DINOv2 · PyTorch · ONNX",
            "accent": (217, 119, 6),
            "glow_col": (245, 158, 11, 20),
            "crop_box": (60, 135, 1140, 700),
            "radius": 16,
            "target_y": 135,
        },
        {
            "src_file": os.path.join(out_dir, "project-chip8.png"),
            "out_file": os.path.join(out_dir, "project-chip8-light.png"),
            "title": "CHIP-8 Emulator",
            "sub": "C++17 · RAYLIB VISUAL DEBUGGER · WEBASSEMBLY",
            "accent": (15, 118, 110),
            "glow_col": (15, 118, 110, 20),
            "crop_box": (60, 135, 1140, 700),
            "radius": 16,
            "target_y": 135,
        },
        {
            "src_file": os.path.join(out_dir, "project-heart.png"),
            "out_file": os.path.join(out_dir, "project-heart-light.png"),
            "title": "Heart Disease Prediction",
            "sub": "SCIKIT-LEARN · GRADIENT BOOSTING · SHAP ATTRIBUTION",
            "accent": (225, 29, 72),
            "glow_col": (225, 29, 72, 20),
            "crop_box": (60, 135, 1140, 700),
            "radius": 16,
            "target_y": 135,
        },
    ]

    for p in projects_config:
        src = Image.open(p["src_file"]).convert("RGBA")
        x1, y1, x2, y2 = p["crop_box"]
        pw = x2 - x1
        ph = y2 - y1
        rad = p["radius"]
        ty = p["target_y"]
        tx = 60

        panel = src.crop((x1, y1, x2, y2))

        mask = Image.new("L", (pw, ph), 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, pw, ph], radius=rad, fill=255)

        canvas = Image.new("RGBA", (W, H), (246, 248, 251, 255))
        draw = ImageDraw.Draw(canvas)

        # Subtle light tech grid
        for x in range(0, W, 48):
            draw.line([(x, 0), (x, H)], fill=(200, 210, 225, 60), width=1)
        for y in range(0, H, 48):
            draw.line([(0, y), (W, y)], fill=(200, 210, 225, 60), width=1)

        # Ambient glow
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gdraw = ImageDraw.Draw(glow)
        gdraw.ellipse([(-80, -80), (450, 380)], fill=p["glow_col"])
        gdraw.ellipse([(850, 420), (1350, 850)], fill=p["glow_col"])
        glow = glow.filter(ImageFilter.GaussianBlur(80))
        canvas.alpha_composite(glow)
        draw = ImageDraw.Draw(canvas)

        # Soft drop shadow
        shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        sdraw = ImageDraw.Draw(shadow)
        sdraw.rounded_rectangle([tx - 2, ty + 6, tx + pw + 2, ty + ph + 8], radius=rad + 2, fill=(15, 23, 42, 60))
        shadow = shadow.filter(ImageFilter.GaussianBlur(16))
        canvas.alpha_composite(shadow)
        draw = ImageDraw.Draw(canvas)

        # Header in dark slate + colored subtitle
        draw.text((60, 40), p["title"], fill=(15, 23, 42), font=font_title)
        draw.text((62, 96), p["sub"], fill=p["accent"], font=font_sub)

        # Paste the real untouched authentic workstation panel
        canvas.paste(panel, (tx, ty), mask)

        # Draw subtle clean border
        draw.rounded_rectangle([tx, ty, tx + pw, ty + ph], radius=rad, outline=(30, 41, 59, 140), width=1)

        # Corner reticles in accent color
        ret_col = (*p["accent"], 180)
        draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
        draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
        draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
        draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
        draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
        draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
        draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
        draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

        canvas.save(p["out_file"], "PNG", quality=95)
        print("Generated light mode banner with real screenshot:", p["out_file"])

if __name__ == "__main__":
    generate_banners()
