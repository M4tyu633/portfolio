"""Update the original Word resume in place without replacing its layout.

Run this script, then render its DOCX with the Documents skill's render_docx.py.
Only copy a visually verified, single-page PDF to public/Matthew_Labrador_Resume.pdf.
"""
from argparse import ArgumentParser
from copy import deepcopy
from pathlib import Path
from zipfile import ZipFile
from lxml import etree

ROOT = Path(__file__).resolve().parents[1]
parser = ArgumentParser()
parser.add_argument('--output', type=Path, default=ROOT / 'artifacts/resume-source/Matthew_Labrador_Resume.docx')
args = parser.parse_args()
reference = ROOT / 'scripts/resume-template.docx'
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(reference) as source:
    document = etree.fromstring(source.read('word/document.xml'))
    paragraphs = document.xpath('//w:body/w:p', namespaces=ns)
    def text(paragraph):
        return ''.join(paragraph.xpath('.//w:t/text()', namespaces=ns))
    role = next(p for p in paragraphs if text(p).startswith('PC Express | Intern'))
    bullet = next(p for p in paragraphs if 'Won 1st Place Champion with Team BH Studios' in text(p))
    experience = deepcopy(bullet)
    spans = experience.xpath('.//w:t', namespaces=ns)
    for span in spans[1:]:
        span.text = ''
    spans[1].text = 'Across these roles, develop local AI applications with NVIDIA RTX 5090 GPUs and deliver talks and training on using and deploying models on personal hardware.'
    role.addnext(experience)
    khan = next(p for p in paragraphs if 'Built a free college-preparation platform with exam-specific study plans' in text(p))
    spans = khan.xpath('.//w:t', namespaces=ns)
    for span in spans[1:]:
        span.text = ''
    spans[1].text = 'Developed a Next.js study platform with typed prerequisite routing, generated practice, resumable mock exams and device-local learning state, linked to targeted Khan Academy resources.'
    def replace(old, new):
        spans = [s for s in document.xpath('//w:t', namespaces=ns) if s.text and old in s.text]
        assert len(spans) == 1, (old, len(spans))
        spans[0].text = spans[0].text.replace(old, new)
    replace('Won 1st Place Champion with Team BH Studios', 'Won Grand Champion with Team BH Studios')
    replace('1st Place, Gear Up NCR (2026,', 'Grand Champion, Gear Up NCR (2026,')
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with ZipFile(args.output, 'w') as target:
        for item in source.infolist():
            data = etree.tostring(document, encoding='UTF-8', xml_declaration=True, standalone=True) if item.filename == 'word/document.xml' else source.read(item.filename)
            target.writestr(item, data)
with ZipFile(reference) as old, ZipFile(args.output) as new:
    changed = [name for name in old.namelist() if old.read(name) != new.read(name)]
    assert changed == ['word/document.xml'], changed
print(args.output)
print('Preserved every original package part except the intended document text.')
