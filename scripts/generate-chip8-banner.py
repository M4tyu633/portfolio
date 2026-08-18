import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_chip8_banner():
    W, H = 1200, 750
    img = Image.new("RGBA", (W, H), (10, 12, 16, 255))
    draw = ImageDraw.Draw(img)

    # 1. Subtle Grid Pattern
    grid_color = (255, 255, 255, 6)
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=grid_color, width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=grid_color, width=1)

    # 2. Ambient Cyberpunk/Retro Cyan & Indigo Glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse([(-100, -100), (450, 400)], fill=(56, 189, 248, 32))
    glow_draw.ellipse([(850, 400), (1350, 850)], fill=(167, 139, 250, 24))
    glow_draw.ellipse([(300, 250), (800, 700)], fill=(94, 234, 212, 20))
    glow = glow.filter(ImageFilter.GaussianBlur(80))
    img.alpha_composite(glow)
    draw = ImageDraw.Draw(img)

    # Fonts
    font_dir = "C:/Windows/Fonts"
    font_title = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 46)
    font_sub = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 18)
    font_code = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 14)
    font_code_bold = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 14)
    font_label = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 15)
    font_badge = ImageFont.truetype(os.path.join(font_dir, "segoeuib.ttf"), 12)
    font_small = ImageFont.truetype(os.path.join(font_dir, "consola.ttf"), 12)

    # 3. Header
    draw.text((60, 45), "CHIP-8 Emulator", fill=(242, 244, 248), font=font_title)
    draw.text((62, 102), "C++17 · RAYLIB VISUAL DEBUGGER · WEBASSEMBLY", fill=(56, 189, 248), font=font_sub)

    # 4. Main Debugger Glass Container
    panel_x, panel_y, panel_w, panel_h = 60, 140, 1080, 555
    panel_bg = Image.new("RGBA", (panel_w, panel_h), (15, 17, 23, 230))
    img.paste(panel_bg, (panel_x, panel_y), panel_bg)
    draw.rounded_rectangle([panel_x, panel_y, panel_x + panel_w, panel_y + panel_h], radius=18, outline=(40, 45, 58, 255), width=1)

    # Top Tab Bar in Panel
    draw.line([(panel_x, panel_y + 40), (panel_x + panel_w, panel_y + 40)], fill=(32, 36, 48), width=1)
    draw.text((panel_x + 25, panel_y + 12), "● BRIX.CH8 (RUNNING)", fill=(94, 234, 212), font=font_badge)
    draw.text((panel_x + 200, panel_y + 12), "CLOCK: 700 Hz (11 ops/frame)", fill=(153, 161, 179), font=font_badge)
    draw.text((panel_x + panel_w - 220, panel_y + 12), "FPS: 60 · FRAME: #01428", fill=(153, 161, 179), font=font_badge)

    # Left Section: Retro 64x32 Monochrome Screen in 16:9 Frame
    disp_x = panel_x + 25
    disp_y = panel_y + 60
    disp_w = 540
    disp_h = 320

    # Screen Outer Bezel
    draw.rounded_rectangle([disp_x, disp_y, disp_x + disp_w, disp_y + disp_h], radius=12, fill=(8, 10, 14), outline=(45, 50, 65), width=2)

    # Draw Brix Game Pixels
    # Brick rows (6 rows x 12 cols of bricks)
    brick_cols = 12
    brick_rows = 6
    bw = 36
    bh = 12
    bx_start = disp_x + 45
    by_start = disp_y + 35

    # Some bricks hit, some remaining (cyan and teal)
    for r in range(brick_rows):
        for c in range(brick_cols):
            # simulate a game in progress
            if (r == 0 and c in [3, 4, 7]) or (r == 1 and c in [2, 3, 4, 5, 8]) or (r == 2 and c == 4):
                continue # destroyed bricks
            bx = bx_start + c * (bw + 5)
            by = by_start + r * (bh + 6)
            bcol = (56, 189, 248) if (r % 2 == 0) else (94, 234, 212)
            draw.rectangle([bx, by, bx + bw, by + bh], fill=bcol)

    # Ball (white glowing 8x8 pixel)
    ball_x = disp_x + 220
    ball_y = disp_y + 195
    draw.rectangle([ball_x, ball_y, ball_x + 10, ball_y + 10], fill=(255, 255, 255))
    # Paddle
    pad_x = disp_x + 185
    pad_y = disp_y + 275
    draw.rectangle([pad_x, pad_y, pad_x + 75, pad_y + 12], fill=(242, 244, 248))

    # CRT Scanlines over display
    for sy in range(disp_y + 2, disp_y + disp_h - 2, 4):
        draw.line([(disp_x + 2, sy), (disp_x + disp_w - 2, sy)], fill=(0, 0, 0, 45), width=1)

    # Screen Bottom Bar: Instructions / Controls
    draw.rounded_rectangle([disp_x, disp_y + disp_h + 15, disp_x + disp_w, disp_y + disp_h + 120], radius=10, fill=(18, 20, 28), outline=(35, 40, 52), width=1)
    draw.text((disp_x + 15, disp_y + disp_h + 28), "LIVE INSTRUCTION STREAM", fill=(153, 161, 179), font=font_badge)
    
    # Real Disassembly Stream
    ops = [
        ("0x02B4", "6028", "LD   V0, 0x28", "load paddle X-coord"),
        ("0x02B6", "D016", "DRW  V0, V1, 6", "render 6-byte sprite"),
        ("0x02B8", "3F01", "SE   VF, 0x01", "skip if collision flag true"),
        ("0x02BA", "1240", "JP   0x0240", "jump to input polling"),
    ]
    for oi, (addr, hexop, asm, comment) in enumerate(ops):
        oy = disp_y + disp_h + 50 + oi * 16
        draw.text((disp_x + 15, oy), addr, fill=(94, 234, 212), font=font_code)
        draw.text((disp_x + 85, oy), hexop, fill=(167, 139, 250), font=font_code)
        draw.text((disp_x + 145, oy), asm, fill=(242, 244, 248), font=font_code_bold)
        draw.text((disp_x + 300, oy), f"; {comment}", fill=(100, 110, 130), font=font_small)

    # Vertical Separator
    sep_x = panel_x + 590
    draw.line([(sep_x, panel_y + 55), (sep_x, panel_y + panel_h - 20)], fill=(35, 40, 52), width=1)

    # Right Section: Live CPU State & Register Grid
    rx = sep_x + 25
    rw = panel_w - 640

    # Section 1: Special Registers (PC, I, SP, DT, ST)
    draw.text((rx, panel_y + 55), "CPU REGISTERS & TIMERS", fill=(153, 161, 179), font=font_badge)

    spec_regs = [
        ("PC", "0x02B6", (56, 189, 248)),
        ("I", "0x0350", (167, 139, 250)),
        ("SP", "0x02", (242, 244, 248)),
        ("DT", "58", (94, 234, 212)),
        ("ST", "00", (153, 161, 179)),
    ]
    for si, (k, v, col) in enumerate(spec_regs):
        sx = rx + si * 88
        sy = panel_y + 78
        draw.rounded_rectangle([sx, sy, sx + 80, sy + 44], radius=6, fill=(22, 25, 35), outline=(40, 46, 60), width=1)
        draw.text((sx + 10, sy + 6), k, fill=(153, 161, 179), font=font_small)
        draw.text((sx + 10, sy + 22), v, fill=col, font=font_code_bold)

    # Section 2: General Purpose Registers V0 - VF in 4x4 Grid
    draw.text((rx, panel_y + 140), "GENERAL REGISTERS (V0 - VF)", fill=(153, 161, 179), font=font_badge)

    v_regs = [
        ("V0", "0x28"), ("V1", "0x12"), ("V2", "0x03"), ("V3", "0x00"),
        ("V4", "0x01"), ("V5", "0x40"), ("V6", "0x1F"), ("V7", "0x00"),
        ("V8", "0x08"), ("V9", "0x00"), ("VA", "0x14"), ("VB", "0x02"),
        ("VC", "0x00"), ("VD", "0x00"), ("VE", "0x00"), ("VF", "0x01"),
    ]

    for vi, (vk, vv) in enumerate(v_regs):
        row = vi // 4
        col = vi % 4
        vx = rx + col * 110
        vy = panel_y + 165 + row * 40
        
        # Highlight VF (collision flag) and V0 (active write)
        is_active = (vk in ["V0", "VF"])
        card_fill = (35, 40, 58) if is_active else (20, 23, 32)
        border_col = (56, 189, 248) if is_active else (35, 40, 52)
        
        draw.rounded_rectangle([vx, vy, vx + 102, vy + 34], radius=6, fill=card_fill, outline=border_col, width=1)
        draw.text((vx + 8, vy + 9), vk, fill=(94, 234, 212) if is_active else (140, 148, 165), font=font_code_bold)
        draw.text((vx + 45, vy + 9), vv, fill=(242, 244, 248) if is_active else (180, 185, 200), font=font_code)

    # Section 3: Call Stack & Hex Memory Dump
    draw.text((rx, panel_y + 345), "CALL STACK & LIVE MEMORY AROUND [I]", fill=(153, 161, 179), font=font_badge)
    
    draw.rounded_rectangle([rx, panel_y + 370, rx + rw, panel_y + 495], radius=8, fill=(18, 20, 28), outline=(35, 40, 52), width=1)
    
    mem_lines = [
        ("STACK[0]", "0x0200", "STACK[1]", "0x0240"),
        ("0x0350", "FF 81 81 81", "0x0354", "81 81 81 FF  (SPRITE)"),
        ("0x0358", "3C 42 81 81", "0x035C", "81 81 42 3C  (FONT '0')"),
        ("QUIRKS", "SHIFT: VY", "LOAD/STORE", "I INCREMENT: ON"),
        ("AUDIO", "BEEP: 440 Hz", "DISPLAY", "WAIT V-BLANK: ON"),
    ]
    for mi, (c1, v1, c2, v2) in enumerate(mem_lines):
        my = panel_y + 382 + mi * 22
        draw.text((rx + 15, my), c1, fill=(94, 234, 212), font=font_small)
        draw.text((rx + 95, my), v1, fill=(242, 244, 248), font=font_code)
        draw.text((rx + 220, my), c2, fill=(167, 139, 250), font=font_small)
        draw.text((rx + 310, my), v2, fill=(200, 205, 220), font=font_code)

    # 5. Corner Reticles on Outer Canvas
    reticle_col = (56, 189, 248, 180)
    draw.line([(30, 30), (55, 30)], fill=reticle_col, width=2)
    draw.line([(30, 30), (30, 55)], fill=reticle_col, width=2)
    draw.line([(W - 30, 30), (W - 55, 30)], fill=reticle_col, width=2)
    draw.line([(W - 30, 30), (W - 30, 55)], fill=reticle_col, width=2)
    draw.line([(30, H - 30), (55, H - 30)], fill=reticle_col, width=2)
    draw.line([(30, H - 30), (30, H - 55)], fill=reticle_col, width=2)
    draw.line([(W - 30, H - 30), (W - 55, H - 30)], fill=reticle_col, width=2)
    draw.line([(W - 30, H - 30), (W - 30, H - 55)], fill=reticle_col, width=2)

    out_path = "C:/Users/matth/portfolio/public/images/project-chip8.png"
    img.save(out_path, "PNG", quality=95)
    print("Saved high-res CHIP-8 debugger banner to:", out_path)

if __name__ == "__main__":
    create_chip8_banner()
