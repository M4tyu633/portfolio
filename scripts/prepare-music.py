"""Prepare a supplied/licensed music file without flattening its dynamics.

Usage: python scripts/prepare-music.py INPUT OUTPUT
Requires ffmpeg and ffprobe on PATH. Full composition is retained.
"""
import argparse
import json
import re
import subprocess
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument('source')
parser.add_argument('output')
args = parser.parse_args()
metadata = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'json', args.source]))
duration = float(metadata['format']['duration'])
analysis = subprocess.run(['ffmpeg', '-hide_banner', '-i', args.source, '-af', 'loudnorm=I=-19:TP=-2:LRA=11:print_format=json', '-f', 'null', '-'], capture_output=True, text=True, check=True)
match = re.search(r'\{\s*"input_i".*?\}', analysis.stderr, re.S)
if not match:
    raise SystemExit('Could not measure the source audio.')
levels = json.loads(match.group())
gain = min(-19 - float(levels['input_i']), -2 - float(levels['input_tp']))
Path(args.output).parent.mkdir(parents=True, exist_ok=True)
filters = f'volume={gain:.3f}dB,afade=t=in:d=0.7,afade=t=out:st={max(0,duration-1.8):.3f}:d=1.8'
subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-i', args.source, '-vn', '-af', filters, '-c:a', 'libmp3lame', '-q:a', '5', '-ar', '44100', '-ac', '2', args.output], check=True)
print(json.dumps({'source': args.source, 'output': args.output, 'duration': duration, 'input_lufs': levels['input_i'], 'gain_db': round(gain,3), 'stereo': True}, indent=2))
