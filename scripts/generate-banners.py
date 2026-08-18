import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def generate_banners():
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

    W, H = 1200, 750

    # ─────────────────────────────────────────────────────────────
    # 1. KNEE MRI READER BANNER
    # ─────────────────────────────────────────────────────────────
    knee = Image.new("RGBA", (W, H), (10, 10, 12, 255))
    draw = ImageDraw.Draw(knee)

    # Grid
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=(255, 255, 255, 6), width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=(255, 255, 255, 6), width=1)

    # Amber Glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse([(-80, -80), (450, 380)], fill=(224, 164, 88, 32))
    gdraw.ellipse([(850, 420), (1350, 850)], fill=(217, 119, 6, 26))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    knee.alpha_composite(glow)
    draw = ImageDraw.Draw(knee)

    # Header
    draw.text((60, 40), "Knee MRI Reader", fill=(242, 242, 244), font=font_title)
    draw.text((62, 96), "DINOv2 · PyTorch · ONNX", fill=(224, 164, 88), font=font_sub)

    # Main Glass Panel
    px, py, pw, ph = 60, 135, 1080, 565
    pbg = Image.new("RGBA", (pw, ph), (18, 18, 22, 230))
    knee.paste(pbg, (px, py), pbg)
    draw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(48, 48, 56), width=1)

    # Left: Real MRI Slices
    mri_x = px + 25
    mri_y = py + 25
    mw, mh = 145, 145
    mgap = 16

    draw.text((mri_x, mri_y), "STUDY 100956877472 · 5 IMAGE SETS", fill=(168, 168, 178), font=font_badge)

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
            bcol = (224, 164, 88, 220) if tag == "AX FS" else (50, 50, 60, 180)
            draw.rounded_rectangle([ix, iy, ix + mw, iy + mh], radius=10, outline=bcol, width=2 if tag == "AX FS" else 1)
            draw.rounded_rectangle([ix + 6, iy + mh - 24, ix + 66, iy + mh - 6], radius=4, fill=(10, 10, 12, 230))
            draw.text((ix + 12, iy + mh - 22), tag, fill=(224, 164, 88) if tag == "AX FS" else (200, 200, 210), font=font_badge)

    # 6th Slot (SAG T1 not acquired)
    ix6 = mri_x + 2 * (mw + mgap)
    iy6 = mri_y + 26 + 1 * (mh + mgap + 18)
    draw.rounded_rectangle([ix6, iy6, ix6 + mw, iy6 + mh], radius=10, fill=(14, 14, 18, 200), outline=(40, 40, 50), width=1)
    draw.text((ix6 + 38, iy6 + 55), "SAG T1", fill=(100, 100, 115), font=font_label)
    draw.text((ix6 + 30, iy6 + 78), "not acquired", fill=(70, 70, 80), font=font_small)

    # Subtext under slices
    draw.text((mri_x, py + ph - 38), "DINOv2 cross-attention across 6 anatomical views · Macro AUC 0.843", fill=(138, 138, 149), font=font_small)

    # Vertical Separator
    sep_x = px + 520
    draw.line([(sep_x, py + 20), (sep_x, py + ph - 20)], fill=(40, 40, 50), width=1)

    # Right: Model Rankings
    rx = sep_x + 28
    ry = py + 25
    rw = pw - 576

    draw.text((rx, ry), "MODEL PREDICTION RANKINGS", fill=(168, 168, 178), font=font_badge)
    
    # Top Gold Highlight Banner
    draw.rounded_rectangle([rx, ry + 22, rx + rw, ry + 58], radius=6, fill=(224, 164, 88, 30), outline=(224, 164, 88, 120), width=1)
    draw.text((rx + 12, ry + 32), "★ The 2 findings present were ranked #1, #2 of 12", fill=(242, 242, 244), font=font_badge)

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

    r_y_start = ry + 74
    r_h = 50

    for idx, (rank, name, score_str, is_present, pct) in enumerate(findings):
        cy = r_y_start + idx * r_h
        draw.text((rx, cy + 2), rank, fill=(138, 138, 149), font=font_small)
        draw.text((rx + 20, cy), name, fill=(242, 242, 244) if is_present else (190, 190, 200), font=font_label)
        
        if is_present:
            draw.rounded_rectangle([rx + 150, cy - 2, rx + 230, cy + 18], radius=4, fill=(224, 164, 88, 45), outline=(224, 164, 88, 180), width=1)
            draw.text((rx + 160, cy + 1), "PRESENT", fill=(224, 164, 88), font=font_badge)
        else:
            draw.rounded_rectangle([rx + 150, cy - 2, rx + 200, cy + 18], radius=4, fill=(30, 30, 38, 180), outline=(50, 50, 60, 180), width=1)
            draw.text((rx + 160, cy + 1), "< 0.5", fill=(138, 138, 149), font=font_badge)

        draw.text((rx + rw - 40, cy), score_str, fill=(224, 164, 88) if is_present else (168, 168, 178), font=font_score)
        
        bar_x = rx + 20
        bar_y = cy + 24
        bar_w = rw - 20
        draw.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + 5], radius=2, fill=(26, 26, 32))
        fill_w = int(bar_w * pct)
        draw.rounded_rectangle([bar_x, bar_y, bar_x + fill_w, bar_y + 5], radius=2, fill=(224, 164, 88) if is_present else (65, 65, 80))

    # Corner reticles
    ret_col = (224, 164, 88, 160)
    draw.line([(30, 30), (55, 30)], fill=ret_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=ret_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=ret_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=ret_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=ret_col, width=2)

    knee_out = "C:/Users/matth/portfolio/public/images/project-knee-mri.png"
    knee.save(knee_out, "PNG", quality=95)
    print("Saved Knee MRI banner to:", knee_out)

    # ─────────────────────────────────────────────────────────────
    # 2. CHIP-8 EMULATOR BANNER (EXACT RAYLIB DEBUGGER LAYOUT)
    # ─────────────────────────────────────────────────────────────
    chip = Image.new("RGBA", (W, H), (14, 17, 23, 255))
    cdraw = ImageDraw.Draw(chip)

    for x in range(0, W, 48):
        cdraw.line([(x, 0), (x, H)], fill=(255, 255, 255, 5), width=1)
    for y in range(0, H, 48):
        cdraw.line([(0, y), (W, y)], fill=(255, 255, 255, 5), width=1)

    # Cyan / Teal Glow
    cglow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cgdraw = ImageDraw.Draw(cglow)
    cgdraw.ellipse([(-80, -80), (450, 380)], fill=(126, 231, 195, 26))
    cgdraw.ellipse([(850, 420), (1350, 850)], fill=(56, 189, 248, 20))
    cglow = cglow.filter(ImageFilter.GaussianBlur(80))
    chip.alpha_composite(cglow)
    cdraw = ImageDraw.Draw(chip)

    # Header
    cdraw.text((60, 40), "CHIP-8 Emulator", fill=(242, 244, 248), font=font_title)
    cdraw.text((62, 96), "C++17 · RAYLIB VISUAL DEBUGGER · WEBASSEMBLY", fill=(126, 231, 195), font=font_sub)

    # Main Glass Panel (1080 x 565)
    cpanel_bg = Image.new("RGBA", (pw, ph), (20, 24, 33, 240))
    chip.paste(cpanel_bg, (px, py), cpanel_bg)
    cdraw.rounded_rectangle([px, py, px + pw, py + ph], radius=16, outline=(40, 48, 65), width=1)

    # Top Status Bar
    cdraw.line([(px, py + 38), (px + pw, py + 38)], fill=(32, 38, 52), width=1)
    cdraw.text((px + 20, py + 12), "● BRIX.CH8 (RUNNING)", fill=(126, 231, 195), font=font_badge)
    cdraw.text((px + 185, py + 12), "SPEED: 11 ops/frame (700 Hz)", fill=(150, 160, 180), font=font_badge)
    cdraw.text((px + pw - 180, py + 12), "FPS: 60 · FRAME #1428", fill=(150, 160, 180), font=font_badge)

    # Left: 64x32 Display + Disassembly
    disp_x = px + 20
    disp_y = py + 52
    disp_w = 510
    disp_h = 255

    # Screen Bezel
    cdraw.rounded_rectangle([disp_x, disp_y, disp_x + disp_w, disp_y + disp_h], radius=8, fill=(10, 12, 16), outline=(45, 52, 70), width=1)

    # Brix Game Pixels in Mint Green (#7ee7c3)
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
            cdraw.rectangle([bx, by, bx + bw, by + bh], fill=(126, 231, 195))

    # Ball
    ball_x = disp_x + 210
    ball_y = disp_y + 155
    cdraw.rectangle([ball_x, ball_y, ball_x + 8, ball_y + 8], fill=(255, 255, 255))
    # Paddle
    pad_x = disp_x + 180
    pad_y = disp_y + 220
    cdraw.rectangle([pad_x, pad_y, pad_x + 70, pad_y + 10], fill=(242, 244, 248))

    # CRT Scanlines
    for sy in range(disp_y + 2, disp_y + disp_h - 2, 4):
        cdraw.line([(disp_x + 2, sy), (disp_x + disp_w - 2, sy)], fill=(0, 0, 0, 40), width=1)

    # Disassembly Panel Under Screen
    disasm_y = disp_y + disp_h + 12
    disasm_h = ph - (disasm_y - py) - 16
    cdraw.rounded_rectangle([disp_x, disasm_y, disp_x + disp_w, disasm_y + disasm_h], radius=8, fill=(15, 18, 25), outline=(35, 42, 58), width=1)
    cdraw.text((disp_x + 12, disasm_y + 10), "DISASSEMBLY", fill=(150, 160, 180), font=font_badge)

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
            cdraw.rectangle([disp_x + 4, oy - 2, disp_x + disp_w - 4, oy + 15], fill=(126, 231, 195, 30))
        cdraw.text((disp_x + 12, oy), addr, fill=(126, 231, 195) if is_curr else (110, 122, 145), font=font_code)
        cdraw.text((disp_x + 70, oy), hexop, fill=(160, 170, 190), font=font_code)
        cdraw.text((disp_x + 125, oy), asm, fill=(242, 244, 248) if is_curr else (190, 200, 215), font=font_code_bold if is_curr else font_code)
        cdraw.text((disp_x + 310, oy), f"; {comm}", fill=(110, 122, 145), font=font_code_small)

    # Vertical Separator
    csep_x = px + 550
    cdraw.line([(csep_x, py + 45), (csep_x, py + ph - 20)], fill=(35, 42, 58), width=1)

    # Right: CPU Registers & Memory
    crx = csep_x + 22
    crw = pw - 590

    # Special Registers
    cdraw.text((crx, py + 52), "SPECIAL REGISTERS", fill=(150, 160, 180), font=font_badge)

    sregs = [("PC", "0x02B4"), ("I", "0x0350"), ("SP", "0x02"), ("DT", "58"), ("ST", "00")]
    for si, (sk, sv) in enumerate(sregs):
        sx = crx + si * 95
        sy = py + 72
        cdraw.rounded_rectangle([sx, sy, sx + 86, sy + 38], radius=6, fill=(15, 18, 26), outline=(38, 45, 62), width=1)
        cdraw.text((sx + 8, sy + 4), sk, fill=(126, 231, 195), font=font_small)
        cdraw.text((sx + 8, sy + 18), sv, fill=(242, 244, 248), font=font_code_bold)

    # General Registers (V0 - VF) in 4x4 Grid
    cdraw.text((crx, py + 124), "REGISTERS (V0 - VF)", fill=(150, 160, 180), font=font_badge)

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
        cdraw.rounded_rectangle([vx, vy, vx + 112, vy + 28], radius=5, fill=(240, 180, 100, 25) if is_mod else (15, 18, 26), outline=(240, 180, 100) if is_mod else (35, 42, 58), width=1)
        cdraw.text((vx + 8, vy + 6), vk, fill=(240, 180, 100) if is_mod else (126, 231, 195), font=font_code_bold)
        cdraw.text((vx + 48, vy + 6), vv, fill=(242, 244, 248), font=font_code)

    # Memory @ I
    cdraw.text((crx, py + 295), "MEMORY @ I (0x0350)", fill=(150, 160, 180), font=font_badge)
    cdraw.rounded_rectangle([crx, py + 315, crx + crw, py + 395], radius=6, fill=(15, 18, 26), outline=(35, 42, 58), width=1)
    
    mems = [
        ("0350:", "FF 81 81 81  81 81 81 FF", "sprite: paddle"),
        ("0358:", "3C 42 81 81  81 81 42 3C", "font: '0'"),
        ("0360:", "18 28 48 08  08 08 08 3E", "font: '1'"),
    ]
    for mi, (maddr, mbytes, mlabel) in enumerate(mems):
        my = py + 325 + mi * 22
        cdraw.text((crx + 12, my), maddr, fill=(126, 231, 195), font=font_code)
        cdraw.text((crx + 70, my), mbytes, fill=(242, 244, 248), font=font_code)
        cdraw.text((crx + 320, my), f"; {mlabel}", fill=(110, 122, 145), font=font_code_small)

    # Keypad Map
    cdraw.text((crx, py + 410), "HEX KEYPAD MATRIX (16-KEY COSMAC VIP)", fill=(150, 160, 180), font=font_badge)
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
        cdraw.rounded_rectangle([kx, ky, kx + 112, ky + 24], radius=4, fill=(126, 231, 195, 35) if is_pressed else (15, 18, 26), outline=(126, 231, 195) if is_pressed else (35, 42, 58), width=1)
        cdraw.text((kx + 8, ky + 4), f"{c8k} ({pk})", fill=(126, 231, 195) if is_pressed else (150, 160, 180), font=font_code_small)

    # Corner reticles
    cret_col = (126, 231, 195, 160)
    cdraw.line([(30, 30), (55, 30)], fill=cret_col, width=2)
    cdraw.line([(30, 30), (30, 55)], fill=cret_col, width=2)
    cdraw.line([(W - 30, 30), (W - 55, 30)], fill=cret_col, width=2)
    cdraw.line([(W - 30, 30), (W - 30, 55)], fill=cret_col, width=2)
    cdraw.line([(30, H - 30), (55, H - 30)], fill=cret_col, width=2)
    cdraw.line([(30, H - 30), (30, H - 55)], fill=cret_col, width=2)
    cdraw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=cret_col, width=2)
    cdraw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=cret_col, width=2)

    chip_out = "C:/Users/matth/portfolio/public/images/project-chip8.png"
    chip.save(chip_out, "PNG", quality=95)
    print("Saved CHIP-8 banner to:", chip_out)

if __name__ == "__main__":
    generate_banners()
