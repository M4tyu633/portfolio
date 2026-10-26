"""Build the portfolio's one-page, developer-focused resume from verified facts."""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
pdfmetrics.registerFont(TTFont("Arial", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("ArialBold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFontFamily("Arial", normal="Arial", bold="ArialBold", italic="Arial", boldItalic="ArialBold")
ink = colors.HexColor("#172231")
muted = colors.HexColor("#4f5b68")
blue = colors.HexColor("#153f83")
styles = {
    "name": ParagraphStyle("name", fontName="ArialBold", fontSize=22, leading=26, textColor=ink, spaceAfter=5),
    "tag": ParagraphStyle("tag", fontName="Arial", fontSize=10, leading=14, textColor=muted, spaceAfter=5),
    "contact": ParagraphStyle("contact", fontName="Arial", fontSize=9, leading=13, textColor=blue, spaceAfter=9),
    "section": ParagraphStyle("section", fontName="ArialBold", fontSize=9, leading=12, textColor=blue, spaceBefore=10, spaceAfter=6),
    "title": ParagraphStyle("title", fontName="ArialBold", fontSize=10.5, leading=14, textColor=ink, spaceAfter=2),
    "detail": ParagraphStyle("detail", fontName="Arial", fontSize=9, leading=12, textColor=muted, spaceAfter=3),
    "body": ParagraphStyle("body", fontName="Arial", fontSize=10, leading=13.3, textColor=ink, spaceAfter=3),
    "bullet": ParagraphStyle("bullet", fontName="Arial", fontSize=10, leading=13.3, textColor=ink, leftIndent=10, firstLineIndent=0, bulletIndent=0, spaceAfter=3),
}
story = []
def p(text, style="body"):
    return Paragraph(text, styles[style])
def section(text):
    story.append(p(text, "section"))
def link(text, slug):
    return f'<link href="https://matthewlabrador.vercel.app/work/{slug}" color="#153f83">{text}</link>'
def project(title, slug, stack, bullets):
    block = [p(link(title, slug), "title"), p(stack, "detail")]
    block += [Paragraph(text, styles["bullet"], bulletText="•") for text in bullets]
    block.append(Spacer(1, 5))
    story.append(KeepTogether(block))

story += [
    p("Matthew Emmanuel T. Labrador", "name"),
    p("Software developer | Web applications, systems and applied AI", "tag"),
    p('<link href="mailto:matthewtlabrador@gmail.com">matthewtlabrador@gmail.com</link>  |  '
      '<link href="https://matthewlabrador.vercel.app">matthewlabrador.vercel.app</link>  |  '
      '<link href="https://www.linkedin.com/in/m4tyuuu1/">LinkedIn</link>', "contact"),
]
section("EDUCATION")
story += [p("University of the Philippines Manila | BS Computer Science", "title"),
          p("Expected May 2029 | Cumulative GWA: 1.0375 (1.0 is highest) | DOST Undergraduate Scholar", "body")]
section("CURRENT ROLES")
story += [p("<b>NVIDIA Philippines</b> - Campus Ambassador | 2026-present"),
          p("<b>PC Express</b> - Intern | 2026-present")]
section("SELECTED ENGINEERING PROJECTS")
project("Khanpanion | Developer &amp; team lead", "khanpanion", "Next.js / React / TypeScript | Grand Champion, Khan Academy Education Impact Challenge 2026", [
    "Developed a college-preparation platform with a typed prerequisite graph, generated practice and targeted Khan Academy resources.",
    "Built device-local learning state and resumable timed practice. Separated assisted attempts from fresh independent checks in the learning engine.",
])
project("eGovMed | Full-stack development &amp; service integrations", "egovmed", "React / Express / Redis / eGovPH APIs | Grand Champion, eGov Hackathon PH 2026", [
    "Connected eight government services across patient intake, identity, triage, booking and payment through explicit service adapters.",
    "Implemented mock/live boundaries and production validation. The public walkthrough preserves the patient UI with simulated services; PGH remains a pilot target.",
])
project("Tumbang Preso | Sole developer", "tumbang-preso", "Godot / GDScript / ENet / Linux VPS | 1st Place, Gear Up NCR 2026", [
    "Built the four-player competition game in five days: gameplay, bots, interface, physics, level assembly and multiplayer networking.",
    "Implemented host-authoritative networking, LAN discovery and dedicated online lobbies. Validated collision behavior with a 36-contact probe.",
])
project("Knee MRI Reader | Data pipeline, model training &amp; web application", "knee-mri-reader", "Python / PyTorch / DINOv2 / ONNX / Next.js", [
    "Built DICOM normalization and multi-view model training for 12 knee findings across 4,407 studies, then delivered a browser reading station.",
    "Evaluated the ensemble at 0.843 strict out-of-fold macro ROC-AUC. The deployed research viewer uses a single-member ONNX model.",
])
section("ADDITIONAL TECHNICAL WORK")
story += [p(f'<b>{link("CHIP-8", "chip-8-emulator")}</b> - C++ interpreter, debugger and WebAssembly build; 35 instructions, 106 core assertions and six original ROMs.'),
          p(f'<b>{link("GlycoSwarm AI", "glycoswarm-ai")}</b> - LangGraph workflow with four parallel specialists, a FastAPI service and Next.js frontend; preserved hackathon prototype.')]
section("TECHNICAL SKILLS")
story += [p("<b>Languages:</b> TypeScript, JavaScript, Python, C/C++, SQL and GDScript."),
          p("<b>Web &amp; systems:</b> React, Next.js, Node.js, Express, FastAPI, Redis, WebAssembly, Git and Linux."),
          p("<b>ML &amp; data:</b> PyTorch, scikit-learn, pandas, DINOv2, ONNX and LangGraph.")]

target = ROOT / "public/Matthew_Labrador_Resume.pdf"
doc = SimpleDocTemplate(str(target), pagesize=A4, rightMargin=34, leftMargin=34, topMargin=27, bottomMargin=25,
                       title="Matthew Labrador - Software Developer", author="Matthew Emmanuel T. Labrador")
doc.build(story)
print(target)
