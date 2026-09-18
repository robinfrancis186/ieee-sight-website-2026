"""Run: python3 check.py — static site links and expected content."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.ids = set(); self.links = []; self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f"Duplicate ID: {attrs['id']}"
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs: self.links.append(attrs[key])
for file in Path('dist').glob('*.html'):
    page = Page(file.read_text())
    for link in page.links:
        parsed = urlsplit(link)
        if parsed.scheme or parsed.netloc: continue
        target = file.parent / parsed.path if parsed.path else file
        assert target.exists(), f'Missing target: {target}'
        if parsed.fragment:
            assert parsed.fragment in Page(target.read_text()).ids, f'Missing anchor: {link}'
text = Path('dist/index.html').read_text()
assert 'Switch Assembly' not in text and 'OCTOBER 2026' not in text
assert 'aria-expanded="false"' in text and 'prefers-reduced-motion' in Path('dist/style.css').read_text()
print('PASS: page assets, internal links, anchors, accessibility hooks and event-free scope')

import re
for css in Path('dist').glob('*.css'):
    for url in re.findall(r'url\(([^)]+)\)', css.read_text()):
        assert (css.parent / url.strip("\"' ")).exists(), f'Missing CSS asset: {url}'
for url in re.findall(r"image:'([^']+)'", Path('dist/app.mjs').read_text()):
    assert (Path('dist') / url).exists(), f'Missing dialog image: {url}'
print('PASS: stylesheet and dynamic project assets')
team = Path('dist/team.html').read_text()
assert team.count('class="person"') == 35
assert 'Robin Francis' in team and 'Inclusive Innovation Coordinator' in team
assert 'mailto:ieeekerala.sight@gmail.com' in Path('dist/contact.html').read_text()
print('PASS: 35-person leadership directory and enquiry destination')
