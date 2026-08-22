import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def draw_star(draw, center_x, center_y, size=7, fill=(217, 119, 6)):
    points = []
    for i in range(10):
        r = size if i % 2 == 0 else size * 0.45
        angle = i * math.pi / 5 - math.pi / 2
        points.append((center_x + r * math.cos(angle), center_y + r * math.sin(angle)))
    draw.polygon(points, fill=fill)

def generate_light_banners():
    font_dir = "C:/Windows/Fonts"
    font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 44)
    font_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 17)
    font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 12)
    font_label = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
    font_score = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 16)
    font_small = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 13)
    font_code = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 13)
    font_code_bold = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 13)
    font_code_small = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 11)
    font_huge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 54)

    W, H = 1200, 750
    px, py, pw, ph = 60, 135, 1080, 565

    out_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "images"))
    os.makedirs(out_dir, exist_ok=True)

    # ─────────────────────────────────────────────────────────────
    # 1. KNEE MRI READER (LIGHT MODE)
    # ─────────────────────────────────────────────────────────────
    knee = Image.new("RGBA", (W, H), (246, 248, 251, 255))
    draw = ImageDraw.Draw(knee)

    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=(200, 210, 225, 60), width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=(200, 210, 225, 60), width=1)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(-80, -80), (450, 380)], fill=(245, 158, 11, 20))
    gdraw.ellipse([(850, 420), (1350, 850)], fill=(217, 119, 6, 16))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    knee.alpha_composite(glow)
    draw = ImageDraw.Draw(knee)

    # Header
    draw.text((60, 40), "Knee MRI Reader", fill=(15, 23, 42), font=font_title)
    draw.text((62, 96), "DINOv2 · PyTorch · ONNX", fill=(217, 119, 6), font=font_sub)

    # Main Card Panel
    pbg = Image.new("RGBA", (pw, ph), (255, 255, 255, 255))
    knee.paste(pbg, (px, py), pbg)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(218, 224, 233), width=1)

    # Left: Real MRI Slices
    mri_x = px + 25
    mri_y = py + 25
    mw, mh = 145, 145
    mgap = 16

    draw.text((mri_x, mri_y), "STUDY 100956877472 · 5 IMAGE SETS", fill=(100, 116, 139), font=font_badge)

    mri_files = [
        ("C:/Users/matth/knee-web/public/cases/100956877472_SAG_FLUID_FS.jpg", "SAG FS"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_COR_FLUID_FS.jpg", "COR FS"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_AX_FLUID_FS.jpg", "AX FS"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_SAG_FLUID_NOFS.jpg", "SAG PD"),
        ("C:/Users/matth/knee-web/public/cases/100956877472_COR_T1.jpg", "COR T1"),
    ]

    for idx, (path, tag) in enumerate(mri_files):
        col = idx % 3
        row = idx // 3
        ix = mri_x + col * (mw + mgap)
        iy = mri_y + 26 + row * (mh + mgap + 18)
        if os.path.exists(path):
            simg = Image.open(path).convert("RGBA").resize((mw, mh), Image.Resampling.LANCZOS)
            mask = Image.new("L", (mw, mh), 0)
            ImageDraw.Draw(mask).rounded_rectangle([0, 0, mw, mh], radius=10, fill=255)
            knee.paste(simg, (ix, iy), mask)
            bcol = (217, 119, 6, 240) if tag == "AX FS" else (203, 213, 225, 220)
            draw.rounded_rectangle([ix, iy, ix + mw, iy + mh], radius=10, outline=bcol, width=2 if tag == "AX FS" else 1)
            draw.rounded_rectangle([ix + 6, iy + mh - 24, ix + 66, iy + mh - 6], radius=4, fill=(255, 255, 255, 240) if tag == "AX FS" else (241, 245, 249, 230), outline=(217, 119, 6, 160) if tag == "AX FS" else (203, 213, 225, 200), width=1)
            draw.text((ix + 12, iy + mh - 22), tag, fill=(180, 83, 9) if tag == "AX FS" else (51, 65, 85), font=font_badge)

    # 6th Slot (SAG T1 not acquired)
    ix6 = mri_x + 2 * (mw + mgap)
    iy6 = mri_y + 26 + 1 * (mh + mgap + 18)
    draw.rounded_rectangle([ix6, iy6, ix6 + mw, iy6 + mh], radius=10, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((ix6 + 38, iy6 + 55), "SAG T1", fill=(100, 116, 139), font=font_label)
    draw.text((ix6 + 30, iy6 + 78), "not acquired", fill=(148, 163, 184), font=font_small)

    # Subtext under slices
    draw.text((mri_x, py + ph - 38), "DINOv2 cross-attention across 6 anatomical views · Macro AUC 0.843", fill=(100, 116, 139), font=font_small)

    # Vertical Separator
    sep_x = px + 520
    draw.line([(sep_x, py + 20), (sep_x, py + ph - 20)], fill=(226, 232, 240), width=1)

    # Right: Model Rankings
    rx = sep_x + 28
    ry = py + 25
    rw = pw - 576

    draw.text((rx, ry), "MODEL PREDICTION RANKINGS", fill=(100, 116, 139), font=font_badge)

    # Top Gold Highlight Banner with drawn Star
    draw.rounded_rectangle([rx, ry + 22, rx + rw, ry + 58], radius=6, fill=(254, 243, 199), outline=(245, 158, 11, 140), width=1)
    draw_star(draw, rx + 24, ry + 40, size=7, fill=(217, 119, 6))
    draw.text((rx + 38, ry + 32), "The 2 findings present were ranked #1, #2 of 12", fill=(146, 64, 14), font=font_small)

    findings = [
        ("1", "Effusion", "0.66", True, 0.66),
        ("2", "PF OA", "0.50", True, 0.50),
        ("3", "Synovitis", "0.39", False, 0.39),
        ("4", "Medial OA", "0.33", False, 0.33),
        ("5", "Medial Meniscus", "0.29", False, 0.29),
        ("6", "Lateral OA", "0.29", False, 0.29),
        ("7", "ACL Tear", "0.20", False, 0.20),
    ]

    r_y_start = ry + 74
    r_h = 50

    for idx, (rank, name, score_str, is_present, pct) in enumerate(findings):
        cy = r_y_start + idx * r_h
        draw.text((rx, cy + 2), rank, fill=(148, 163, 184), font=font_small)
        draw.text((rx + 20, cy), name, fill=(15, 23, 42) if is_present else (71, 85, 105), font=font_label)

        if is_present:
            draw.rounded_rectangle([rx + 150, cy - 2, rx + 230, cy + 18], radius=4, fill=(254, 243, 199), outline=(245, 158, 11, 160), width=1)
            draw.text((rx + 160, cy + 1), "PRESENT", fill=(180, 83, 9), font=font_badge)
        else:
            draw.rounded_rectangle([rx + 150, cy - 2, rx + 200, cy + 18], radius=4, fill=(241, 245, 249), outline=(226, 232, 240), width=1)
            draw.text((rx + 160, cy + 1), "< 0.5", fill=(100, 116, 139), font=font_badge)

        draw.text((rx + rw - 40, cy), score_str, fill=(217, 119, 6) if is_present else (100, 116, 139), font=font_score)

        bar_x = rx + 20
        bar_y = cy + 24
        bar_w = rw - 20
        draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 5], radius=2, fill=(241, 245, 249))
        fill_w = int(bar_w * pct)
        draw.rounded_rectangle([bar_x, bar_y, bar_x + fill_w, bar_y + 5], radius=2, fill=(217, 119, 6) if is_present else (203, 213, 225))

    ret_col = (217, 119, 6, 180)
    draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

    knee_out = os.path.join(out_dir, "project-knee-mri-light.png")
    knee.save(knee_out, "PNG", quality=95)
    print("Saved Knee MRI Light banner to:", knee_out)

    # ─────────────────────────────────────────────────────────────
    # 2. CHIP-8 EMULATOR (LIGHT MODE)
    # ─────────────────────────────────────────────────────────────
    chip = Image.new("RGBA", (W, H), (246, 248, 251, 255))
    cdraw = ImageDraw.Draw(chip)

    for x in range(0, W, 48):
        cdraw.line([(x, 0), (x, H)], fill=(200, 210, 225, 60), width=1)
    for y in range(0, H, 48):
        cdraw.line([(0, y), (W, y)], fill=(200, 210, 225, 60), width=1)

    cglow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cgdraw = ImageDraw.Draw(cglow)
    cgdraw.ellipse([(-80, -80), (450, 380)], fill=(15, 118, 110, 18))
    cgdraw.ellipse([(850, 420), (1350, 850)], fill=(14, 165, 233, 16))
    cglow = cglow.filter(ImageFilter.GaussianBlur(80))
    chip.alpha_composite(cglow)
    cdraw = ImageDraw.Draw(chip)

    # Header
    cdraw.text((60, 40), "CHIP-8 Emulator", fill=(15, 23, 42), font=font_title)
    cdraw.text((62, 96), "C++17 · RAYLIB VISUAL DEBUGGER · WEBASSEMBLY", fill=(15, 118, 110), font=font_sub)

    # Main Card Panel
    cpanel_bg = Image.new("RGBA", (pw, ph), (255, 255, 255, 255))
    chip.paste(cpanel_bg, (px, py), cpanel_bg)
    cdraw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(218, 224, 233), width=1)

    # Top Status Bar
    cdraw.line([(px, py + 38), (px + pw, py + 38)], fill=(226, 232, 240), width=1)
    cdraw.text((px + 20, py + 12), "● BRIX.CH8 (RUNNING)", fill=(15, 118, 110), font=font_badge)
    cdraw.text((px + 185, py + 12), "SPEED: 11 ops/frame (700 Hz)", fill=(100, 116, 139), font=font_badge)
    cdraw.text((px + pw - 180, py + 12), "FPS: 60 · FRAME #1428", fill=(100, 116, 139), font=font_badge)

    # Left: Screen + Disassembly
    disp_x = px + 20
    disp_y = py + 52
    disp_w = 510
    disp_h = 255

    # Screen Bezel
    cdraw.rounded_rectangle([disp_x, disp_y, disp_x + disp_w, disp_y + disp_h], radius=8, fill=(15, 23, 42), outline=(203, 213, 225), width=1)

    brick_cols = 12
    brick_rows = 5
    bw = 34
    bh = 10
    bx_start = disp_x + 40
    by_start = disp_y + 30

    for r in range(brick_rows):
        for c in range(brick_cols):
            if (r == 0 and c in [3, 4, 7]) or (r == 1 and c in [2, 3, 4, 8]) or (r == 2 and c == 4):
                continue
            bx = bx_start + c * (bw + 5)
            by = by_start + r * (bh + 6)
            cdraw.rectangle([bx, by, bx + bw, by + bh], fill=(52, 211, 153))

    ball_x = disp_x + 210
    ball_y = disp_y + 155
    cdraw.rectangle([ball_x, ball_y, ball_x + 8, ball_y + 8], fill=(255, 255, 255))
    pad_x = disp_x + 180
    pad_y = disp_y + 220
    cdraw.rectangle([pad_x, pad_y, pad_x + 70, pad_y + 10], fill=(248, 250, 252))

    for sy in range(disp_y + 2, disp_y + disp_h - 2, 4):
        cdraw.line([(disp_x + 2, sy), (disp_x + disp_w - 2, sy)], fill=(0, 0, 0, 50), width=1)

    # Disassembly Panel
    disasm_y = disp_y + disp_h + 12
    disasm_h = ph - (disasm_y - py) - 16
    cdraw.rounded_rectangle([disp_x, disasm_y, disp_x + disp_w, disasm_y + disasm_h], radius=8, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    cdraw.text((disp_x + 12, disasm_y + 10), "DISASSEMBLY", fill=(100, 116, 139), font=font_badge)

    disasm_ops = [
        ("02B0:", "6028", "LD   V0, 0x28", "paddle X"),
        ("02B2:", "6112", "LD   V1, 0x12", "paddle Y"),
        ("02B4:", "D016", "DRW  V0, V1, 6", "draw sprite (active)"),
        ("02B6:", "3F01", "SE   VF, 0x01", "check collision"),
        ("02B8:", "1240", "JP   0x0240", "loop"),
    ]

    for oi, (addr, hexop, asm, comm) in enumerate(disasm_ops):
        oy = disasm_y + 32 + oi * 18
        is_curr = (oi == 2)
        if is_curr:
            cdraw.rectangle([disp_x + 4, oy - 2, disp_x + disp_w - 4, oy + 15], fill=(204, 251, 241))
        cdraw.text((disp_x + 12, oy), addr, fill=(15, 118, 110) if is_curr else (100, 116, 139), font=font_code)
        cdraw.text((disp_x + 70, oy), hexop, fill=(71, 85, 105), font=font_code)
        cdraw.text((disp_x + 125, oy), asm, fill=(15, 23, 42) if is_curr else (51, 65, 85), font=font_code_bold if is_curr else font_code)
        cdraw.text((disp_x + 310, oy), f"; {comm}", fill=(148, 163, 184), font=font_code_small)

    # Vertical Separator
    csep_x = px + 550
    cdraw.line([(csep_x, py + 45), (csep_x, py + ph - 20)], fill=(226, 232, 240), width=1)

    # Right: CPU Registers & Memory
    crx = csep_x + 22
    crw = pw - 590

    # Special Registers
    cdraw.text((crx, py + 52), "SPECIAL REGISTERS", fill=(100, 116, 139), font=font_badge)
    sregs = [("PC", "0x02B4"), ("I", "0x0350"), ("SP", "0x02"), ("DT", "58"), ("ST", "00")]
    for si, (sk, sv) in enumerate(sregs):
        sx = crx + si * 95
        sy = py + 72
        cdraw.rounded_rectangle([sx, sy, sx + 86, sy + 38], radius=6, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
        cdraw.text((sx + 8, sy + 4), sk, fill=(15, 118, 110), font=font_small)
        cdraw.text((sx + 8, sy + 18), sv, fill=(15, 23, 42), font=font_code_bold)

    # General Registers (V0 - VF)
    cdraw.text((crx, py + 124), "REGISTERS (V0 - VF)", fill=(100, 116, 139), font=font_badge)
    v_regs = [
        ("V0", "0x28"), ("V1", "0x12"), ("V2", "0x03"), ("V3", "0x00"),
        ("V4", "0x01"), ("V5", "0x40"), ("V6", "0x1F"), ("V7", "0x00"),
        ("V8", "0x08"), ("V9", "0x00"), ("VA", "0x14"), ("VB", "0x02"),
        ("VC", "0x00"), ("VD", "0x00"), ("VE", "0x00"), ("VF", "0x01"),
    ]

    for vi, (vk, vv) in enumerate(v_regs):
        col = vi % 4
        row = vi // 4
        vx = crx + col * 120
        vy = py + 144 + row * 34
        is_mod = (vk in ["V0", "VF"])
        cdraw.rounded_rectangle([vx, vy, vx + 112, vy + 28], radius=5, fill=(254, 243, 199) if is_mod else (248, 250, 252), outline=(245, 158, 11) if is_mod else (226, 232, 240), width=1)
        cdraw.text((vx + 8, vy + 6), vk, fill=(180, 83, 9) if is_mod else (15, 118, 110), font=font_code_bold)
        cdraw.text((vx + 48, vy + 6), vv, fill=(15, 23, 42), font=font_code)

    # Memory @ I
    cdraw.text((crx, py + 295), "MEMORY @ I (0x0350)", fill=(100, 116, 139), font=font_badge)
    cdraw.rounded_rectangle([crx, py + 315, crx + crw, py + 395], radius=6, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    
    mems = [
        ("0350:", "FF 81 81 81  81 81 81 FF", "sprite: paddle"),
        ("0358:", "3C 42 81 81  81 81 42 3C", "font: '0'"),
        ("0360:", "18 28 48 08  08 08 08 3E", "font: '1'"),
    ]
    for mi, (maddr, mbytes, mlabel) in enumerate(mems):
        my = py + 325 + mi * 22
        cdraw.text((crx + 12, my), maddr, fill=(15, 118, 110), font=font_code)
        cdraw.text((crx + 70, my), mbytes, fill=(15, 23, 42), font=font_code)
        cdraw.text((crx + 320, my), f"; {mlabel}", fill=(148, 163, 184), font=font_code_small)

    # Keypad Map
    cdraw.text((crx, py + 410), "HEX KEYPAD MATRIX (16-KEY COSMAC VIP)", fill=(100, 116, 139), font=font_badge)
    kpad_keys = [
        ("1", "1"), ("2", "2"), ("3", "3"), ("C", "4"),
        ("4", "Q"), ("5", "W"), ("6", "E"), ("D", "R"),
        ("7", "A"), ("8", "S"), ("9", "D"), ("E", "F"),
        ("A", "Z"), ("0", "X"), ("B", "C"), ("F", "V")
    ]
    for ki, (c8k, pk) in enumerate(kpad_keys):
        kcol = ki % 4
        krow = ki // 4
        kx = crx + kcol * 120
        ky = py + 430 + krow * 28
        is_pressed = (pk in ["A", "D"])
        cdraw.rounded_rectangle([kx, ky, kx + 112, ky + 24], radius=4, fill=(204, 251, 241) if is_pressed else (248, 250, 252), outline=(20, 184, 166) if is_pressed else (226, 232, 240), width=1)
        cdraw.text((kx + 8, ky + 4), f"{c8k} ({pk})", fill=(15, 118, 110) if is_pressed else (100, 116, 139), font=font_code_small)

    # Corner reticles
    cret_col = (15, 118, 110, 180)
    cdraw.line([(30, 30), (55, 30)], fill=cret_col, width=2)
    cdraw.line([(30, 30), (30, 55)], fill=cret_col, width=2)
    cdraw.line([(W - 30, 30), (W - 55, 30)], fill=cret_col, width=2)
    cdraw.line([(W - 30, 30), (W - 30, 55)], fill=cret_col, width=2)
    cdraw.line([(30, H - 30), (55, H - 30)], fill=cret_col, width=2)
    cdraw.line([(30, H - 30), (30, H - 55)], fill=cret_col, width=2)
    cdraw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=cret_col, width=2)
    cdraw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=cret_col, width=2)

    chip_out = os.path.join(out_dir, "project-chip8-light.png")
    chip.save(chip_out, "PNG", quality=95)
    print("Saved CHIP-8 Light banner to:", chip_out)

    # ─────────────────────────────────────────────────────────────
    # 3. HEART DISEASE PREDICTION (LIGHT MODE)
    # ─────────────────────────────────────────────────────────────
    heart = Image.new("RGBA", (W, H), (246, 248, 251, 255))
    draw = ImageDraw.Draw(heart)

    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=(200, 210, 225, 60), width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=(200, 210, 225, 60), width=1)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(-80, -80), (450, 380)], fill=(225, 29, 72, 18))
    gdraw.ellipse([(850, 420), (1350, 850)], fill=(244, 63, 94, 15))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    heart.alpha_composite(glow)
    draw = ImageDraw.Draw(heart)

    # Header
    draw.text((60, 40), "Heart Disease Prediction", fill=(15, 23, 42), font=font_title)
    draw.text((62, 96), "SCIKIT-LEARN · GRADIENT BOOSTING · SHAP ATTRIBUTION", fill=(225, 29, 72), font=font_sub)

    # Main Card Panel
    pbg = Image.new("RGBA", (pw, ph), (255, 255, 255, 255))
    heart.paste(pbg, (px, py), pbg)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(218, 224, 233), width=1)

    # Top Status Bar
    draw.line([(px, py + 38), (px + pw, py + 38)], fill=(226, 232, 240), width=1)
    draw.text((px + 20, py + 12), "● CARDIOSENSE AI · UCI CLINICAL COHORT (920 PATIENTS)", fill=(225, 29, 72), font=font_badge)
    draw.text((px + pw - 240, py + 12), "ROC-AUC: 0.919 · RECALL: 89.2%", fill=(100, 116, 139), font=font_badge)

    # Left: Risk Cockpit
    lx = px + 25
    ly = py + 55
    lw = 480

    # Risk Meter Card
    draw.rounded_rectangle([lx, ly, lx + lw, ly + 210], radius=12, fill=(255, 255, 255), outline=(253, 205, 213), width=1)
    draw.text((lx + 20, ly + 16), "PREDICTED CAD PROBABILITY", fill=(100, 116, 139), font=font_badge)
    
    # Risk Badge
    draw.rounded_rectangle([lx + lw - 120, ly + 14, lx + lw - 20, ly + 36], radius=12, fill=(255, 228, 230), outline=(244, 63, 94, 160), width=1)
    draw.text((lx + lw - 105, ly + 18), "HIGH RISK", fill=(225, 29, 72), font=font_badge)

    # Huge Score
    draw.text((lx + 20, ly + 46), "86%", fill=(225, 29, 72), font=font_huge)
    draw.text((lx + 155, ly + 72), "probability of >50% stenosis", fill=(100, 116, 139), font=font_small)

    # Progress bar
    bar_x = lx + 20
    bar_y = ly + 125
    bar_w = lw - 40
    draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 8], radius=4, fill=(241, 245, 249))
    draw.rounded_rectangle([bar_x, bar_y, bar_x + int(bar_w * 0.86), bar_y + 8], radius=4, fill=(225, 29, 72))

    draw.text((bar_x, bar_y + 14), "0% Healthy", fill=(148, 163, 184), font=font_badge)
    draw.text((bar_x + int(bar_w * 0.35) - 20, bar_y + 14), "35% Moderate", fill=(148, 163, 184), font=font_badge)
    draw.text((bar_x + bar_w - 70, bar_y + 14), "65% Critical", fill=(148, 163, 184), font=font_badge)

    # Patient Vitals Strip
    vy = ly + 225
    vw = lw
    draw.rounded_rectangle([lx, vy, lx + vw, vy + 240], radius=12, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((lx + 18, vy + 14), "ACTIVE PATIENT PROFILE", fill=(100, 116, 139), font=font_badge)

    vitals = [
        ("Demographics", "67yo Male · Asymptomatic CP"),
        ("Hemodynamics", "BP: 160 mm Hg · Chol: 286 mg/dl"),
        ("Cardiac Stress", "Max HR: 108 bpm · ST Dep: 2.8 mm"),
        ("Diagnostic Tests", "Fluoroscopy: 2 Vessels · Reversible Thal"),
    ]
    for vi, (vtitle, vval) in enumerate(vitals):
        cy = vy + 40 + vi * 46
        draw.text((lx + 18, cy), vtitle, fill=(100, 116, 139), font=font_small)
        draw.text((lx + 18, cy + 18), vval, fill=(15, 23, 42), font=font_label)

    # Vertical Separator
    sep_x = px + 535
    draw.line([(sep_x, py + 45), (sep_x, py + ph - 20)], fill=(226, 232, 240), width=1)

    # Right: SHAP Drivers
    rx = sep_x + 25
    ry = py + 55
    rw = pw - 580

    draw.text((rx, ry), "LOCAL SHAP / LOGIT FEATURE DRIVERS", fill=(100, 116, 139), font=font_badge)
    draw.text((rx + rw - 130, ry), "CONTRIBUTION", fill=(100, 116, 139), font=font_badge)

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
        draw.text((rx, cy), label, fill=(15, 23, 42), font=font_label)
        draw.text((rx + rw - 60, cy), val, fill=(225, 29, 72) if is_risk else (16, 185, 129), font=font_score)

        b_y = cy + 24
        draw.rounded_rectangle([rx, b_y, rx + rw, b_y + 6], radius=2, fill=(241, 245, 249))
        fill_w = int(rw * pct)
        draw.rounded_rectangle([rx, b_y, rx + fill_w, b_y + 6], radius=2, fill=(225, 29, 72) if is_risk else (16, 185, 129))

    ret_col = (225, 29, 72, 180)
    draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

    heart_out = os.path.join(out_dir, "project-heart-light.png")
    heart.save(heart_out, "PNG", quality=95)
    print("Saved Heart Disease Light banner to:", heart_out)

    # ─────────────────────────────────────────────────────────────
    # 4. GLYCOSWARM AI (LIGHT MODE)
    # ─────────────────────────────────────────────────────────────
    glyco = Image.new("RGBA", (W, H), (246, 248, 251, 255))
    draw = ImageDraw.Draw(glyco)

    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=(200, 210, 225, 60), width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=(200, 210, 225, 60), width=1)

    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(-80, -80), (450, 380)], fill=(15, 118, 110, 18))
    gdraw.ellipse([(850, 420), (1350, 850)], fill=(20, 184, 166, 16))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    glyco.alpha_composite(glow)
    draw = ImageDraw.Draw(glyco)

    # Header
    draw.text((60, 40), "GlycoSwarm AI", fill=(15, 23, 42), font=font_title)
    draw.text((62, 96), "LangGraph · Python · FastAPI · Next.js", fill=(15, 118, 110), font=font_sub)

    # Main Card Panel
    pbg = Image.new("RGBA", (pw, ph), (255, 255, 255, 255))
    glyco.paste(pbg, (px, py), pbg)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(218, 224, 233), width=1)

    # Top Status Bar
    draw.line([(px, py + 38), (px + pw, py + 38)], fill=(226, 232, 240), width=1)
    draw.text((px + 20, py + 12), "● GLYCOSWARM MULTI-AGENT STATEGRAPH · NHANES COHORT", fill=(15, 118, 110), font=font_badge)
    draw.text((px + pw - 250, py + 12), "AMD MI300X INFERENCE · GEMMA 4 & GLM", fill=(100, 116, 139), font=font_badge)

    # Left: Anatomical Risk Map
    am_x = px + 25
    am_y = py + 52
    am_w = 470
    am_h = ph - 72

    draw.rounded_rectangle([am_x, am_y, am_x + am_w, am_y + am_h], radius=12, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
    draw.text((am_x + 18, am_y + 16), "ANATOMICAL RISK MAP", fill=(100, 116, 139), font=font_badge)

    # Subtle inner grid on map
    for gx in range(am_x + 20, am_x + am_w - 20, 32):
        draw.line([(gx, am_y + 40), (gx, am_y + am_h - 20)], fill=(226, 232, 240, 140), width=1)
    for gy in range(am_y + 40, am_y + am_h - 20, 32):
        draw.line([(am_x + 20, gy), (am_x + am_w - 20, gy)], fill=(226, 232, 240, 140), width=1)

    # Base platform ellipse rings with soft glow
    cx_body = am_x + am_w // 2
    cy_base = am_y + am_h - 65
    draw.ellipse([cx_body - 130, cy_base - 36, cx_body + 130, cy_base + 36], outline=(226, 232, 240), width=1)
    draw.ellipse([cx_body - 100, cy_base - 26, cx_body + 100, cy_base + 26], outline=(203, 213, 225), width=2)
    draw.ellipse([cx_body - 65, cy_base - 16, cx_body + 65, cy_base + 16], outline=(148, 163, 184), width=1)

    # Draw 3D Translucent Holographic Body (Multi-layer shading)
    body_base = (14, 116, 144)      # cyan-700
    body_mid  = (6, 182, 212)       # cyan-500
    body_lit  = (165, 243, 252)     # cyan-200
    
    # Head (Proportional oval)
    head_cx = cx_body
    head_cy = am_y + 110
    draw.ellipse([head_cx - 20, head_cy - 24, head_cx + 20, head_cy + 24], fill=body_base)
    draw.ellipse([head_cx - 17, head_cy - 21, head_cx + 17, head_cy + 21], fill=body_mid)
    draw.ellipse([head_cx - 10, head_cy - 16, head_cx + 4, head_cy - 6], fill=body_lit)

    # Neck
    draw.rectangle([cx_body - 6, head_cy + 20, cx_body + 6, head_cy + 34], fill=body_base)

    # Torso (Contoured chest and waist)
    torso_top = head_cy + 30
    torso_w, torso_h = 76, 125
    draw.rounded_rectangle([cx_body - torso_w//2, torso_top, cx_body + torso_w//2, torso_top + torso_h], radius=22, fill=body_base)
    draw.rounded_rectangle([cx_body - torso_w//2 + 4, torso_top + 4, cx_body + torso_w//2 - 4, torso_top + torso_h - 4], radius=18, fill=body_mid)
    draw.rounded_rectangle([cx_body - torso_w//2 + 10, torso_top + 8, cx_body + 6, torso_top + torso_h - 14], radius=12, fill=body_lit)

    # Arms (Natural hanging angle)
    arm_w = 18
    # Left Arm
    draw.rounded_rectangle([cx_body - torso_w//2 - 22, torso_top + 6, cx_body - torso_w//2 - 22 + arm_w, torso_top + 138], radius=9, fill=body_base)
    draw.rounded_rectangle([cx_body - torso_w//2 - 20, torso_top + 8, cx_body - torso_w//2 - 20 + arm_w - 4, torso_top + 136], radius=7, fill=body_mid)
    # Right Arm
    draw.rounded_rectangle([cx_body + torso_w//2 + 4, torso_top + 6, cx_body + torso_w//2 + 4 + arm_w, torso_top + 138], radius=9, fill=body_base)
    draw.rounded_rectangle([cx_body + torso_w//2 + 6, torso_top + 8, cx_body + torso_w//2 + 6 + arm_w - 4, torso_top + 136], radius=7, fill=body_mid)

    # Legs (Natural stance)
    leg_top = torso_top + torso_h - 8
    leg_w = 20
    leg_h = 132
    # Left Leg
    draw.rounded_rectangle([cx_body - 27, leg_top, cx_body - 27 + leg_w, leg_top + leg_h], radius=10, fill=body_base)
    draw.rounded_rectangle([cx_body - 25, leg_top + 2, cx_body - 25 + leg_w - 4, leg_top + leg_h - 2], radius=8, fill=body_mid)
    # Right Leg
    draw.rounded_rectangle([cx_body + 7, leg_top, cx_body + 7 + leg_w, leg_top + leg_h], radius=10, fill=body_base)
    draw.rounded_rectangle([cx_body + 9, leg_top + 2, cx_body + 9 + leg_w - 4, leg_top + leg_h - 2], radius=8, fill=body_mid)

    # Glowing Biomarker Risk Nodes
    # Retina / Eyes (Crimson)
    draw.ellipse([head_cx - 9, head_cy - 5, head_cx - 1, head_cy + 3], fill=(225, 29, 72))
    draw.ellipse([head_cx + 1, head_cy - 5, head_cx + 9, head_cy + 3], fill=(225, 29, 72))
    draw.ellipse([head_cx - 6, head_cy - 3, head_cx - 4, head_cy], fill=(255, 255, 255))
    draw.ellipse([head_cx + 4, head_cy - 3, head_cx + 6, head_cy], fill=(255, 255, 255))

    # Heart (Cardiology - Crimson High Risk Node with pulse glow)
    heart_nx, heart_ny = cx_body - 14, torso_top + 36
    draw.ellipse([heart_nx - 11, heart_ny - 11, heart_nx + 11, heart_ny + 11], fill=(255, 228, 230), outline=(225, 29, 72), width=2)
    draw.ellipse([heart_nx - 6, heart_ny - 6, heart_nx + 6, heart_ny + 6], fill=(225, 29, 72))
    draw.ellipse([heart_nx - 2, heart_ny - 2, heart_nx + 2, heart_ny + 2], fill=(255, 255, 255))

    # Kidneys (Nephropathy - Teal Nodes)
    kid_y = torso_top + 80
    for kx in [cx_body - 18, cx_body + 18]:
        draw.ellipse([kx - 8, kid_y - 8, kx + 8, kid_y + 8], fill=(204, 251, 241), outline=(13, 148, 136), width=2)
        draw.ellipse([kx - 4, kid_y - 4, kx + 4, kid_y + 4], fill=(13, 148, 136))

    # Nerves / Extremities (Amber Nodes)
    hand_y = torso_top + 136
    draw.ellipse([cx_body - torso_w//2 - 19, hand_y - 6, cx_body - torso_w//2 - 7, hand_y + 6], fill=(254, 243, 199), outline=(217, 119, 6), width=2)
    draw.ellipse([cx_body - torso_w//2 - 15, hand_y - 2, cx_body - torso_w//2 - 11, hand_y + 2], fill=(217, 119, 6))

    draw.ellipse([cx_body + torso_w//2 + 7, hand_y - 6, cx_body + torso_w//2 + 19, hand_y + 6], fill=(254, 243, 199), outline=(217, 119, 6), width=2)
    draw.ellipse([cx_body + torso_w//2 + 11, hand_y - 2, cx_body + torso_w//2 + 15, hand_y + 2], fill=(217, 119, 6))

    foot_y = leg_top + leg_h - 2
    draw.ellipse([cx_body - 23, foot_y - 6, cx_body - 11, foot_y + 6], fill=(254, 243, 199), outline=(217, 119, 6), width=2)
    draw.ellipse([cx_body - 19, foot_y - 2, cx_body - 15, foot_y + 2], fill=(217, 119, 6))

    draw.ellipse([cx_body + 11, foot_y - 6, cx_body + 23, foot_y + 6], fill=(254, 243, 199), outline=(217, 119, 6), width=2)
    draw.ellipse([cx_body + 15, foot_y - 2, cx_body + 19, foot_y + 2], fill=(217, 119, 6))

    # Vertical Separator
    sep_x = px + 520
    draw.line([(sep_x, py + 45), (sep_x, py + ph - 20)], fill=(226, 232, 240), width=1)

    # Right: Clinical Trajectory & Risk Grid
    rx = sep_x + 25
    rw = pw - 570

    # Highest Risk Trajectory Box
    traj_y = py + 52
    traj_h = 160
    draw.rounded_rectangle([rx, traj_y, rx + rw, traj_y + traj_h], radius=12, fill=(255, 255, 255), outline=(253, 205, 213), width=1)

    draw.text((rx + 16, traj_y + 14), "HIGHEST RISK TRAJECTORY", fill=(100, 116, 139), font=font_badge)
    draw.text((rx + 16, traj_y + 36), "Heart & Vessels (Cardiology)", fill=(15, 23, 42), font=font_label)

    # Score Pill
    draw.rounded_rectangle([rx + rw - 115, traj_y + 34, rx + rw - 16, traj_y + 58], radius=12, fill=(255, 228, 230), outline=(244, 63, 94, 160), width=1)
    draw.text((rx + rw - 95, traj_y + 38), "Score: 81%", fill=(225, 29, 72), font=font_badge)

    draw.line([(rx + 16, traj_y + 68), (rx + rw - 16, traj_y + 68)], fill=(241, 245, 249), width=1)
    draw.text((rx + 16, traj_y + 76), "Clinical Decision:", fill=(15, 118, 110), font=font_badge)
    
    dec_text = (
        "Refer the patient for intensive cardiovascular risk management, including lipid-\n"
        "lowering therapy and lifestyle modifications, due to high computed risk scores."
    )
    draw.text((rx + 16, traj_y + 98), dec_text, fill=(71, 85, 105), font=font_small)

    # 4 Organ Specialist Cards (2x2 grid)
    cg_y = traj_y + traj_h + 16
    cg_w = (rw - 16) // 2
    cg_h = 115

    organ_cards = [
        ("Nerves", "Neuropathy", "55%", (217, 119, 6), (254, 243, 199)),
        ("Kidneys", "Nephropathy", "14%", (13, 148, 136), (204, 251, 241)),
        ("Retina", "Retinopathy", "74%", (225, 29, 72), (255, 228, 230)),
        ("Heart & Vessels", "Cardiology", "81%", (225, 29, 72), (255, 228, 230)),
    ]

    for ci, (otitle, osub, oscor, ocol, obg) in enumerate(organ_cards):
        ccol = ci % 2
        crow = ci // 2
        cx_c = rx + ccol * (cg_w + 16)
        cy_c = cg_y + crow * (cg_h + 14)

        draw.rounded_rectangle([cx_c, cy_c, cx_c + cg_w, cy_c + cg_h], radius=10, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
        draw.text((cx_c + 16, cy_c + 14), otitle, fill=(15, 23, 42), font=font_label)
        draw.text((cx_c + 16, cy_c + 36), osub, fill=(100, 116, 139), font=font_small)

        draw.text((cx_c + 16, cy_c + 78), "RISK PROBABILITY", fill=(148, 163, 184), font=font_badge)

        draw.rounded_rectangle([cx_c + cg_w - 75, cy_c + 68, cx_c + cg_w - 14, cy_c + 100], radius=8, fill=obg, outline=ocol, width=1)
        draw.text((cx_c + cg_w - 65, cy_c + 72), oscor, fill=ocol, font=font_score)

    ret_col = (15, 118, 110, 180)
    draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

    glyco_out = os.path.join(out_dir, "project-glycoswarm-light.png")
    glyco.save(glyco_out, "PNG", quality=95)
    print("Saved GlycoSwarm Light banner to:", glyco_out)

if __name__ == "__main__":
    generate_light_banners()
