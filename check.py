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

# Guard metadata, canonical URLs and shared navigation on every generated page.
import json
from xml.etree import ElementTree
base = 'https://sight.ieeekerala.org/'
expected_nav = ['index.html','mission.html','projects.html','events.html','funding.html','team.html','contact.html']
titles = set()
for file in Path('dist').glob('*.html'):
    source = file.read_text()
    title = re.search(r'<title>(.*?)</title>', source).group(1)
    assert title not in titles, f'Duplicate title: {file}'
    titles.add(title)
    assert len(re.findall(r'<h1(?:\s|>)', source)) == 1, file
    canonical = re.findall(r'<link rel="canonical" href="([^"]+)"', source)
    assert canonical == [base + ('' if file.name == 'index.html' else file.name)], file
    for name in ['description', 'theme-color', 'twitter:card']:
        assert len(re.findall(f'<meta name="{name}"', source)) == 1, (file, name)
    assert '<meta property="og:image"' in source
    schema = re.findall(r'<script type="application/ld\+json">(.*?)</script>', source)
    assert len(schema) == 1, file
    graph = json.loads(schema[0])['@graph']
    assert graph[0]['email'] == 'ieeekerala.sight@gmail.com'
    nav = re.search(r'<nav[^>]*aria-label="Main navigation"[^>]*>(.*?)</nav>', source).group(1)
    assert re.findall(r'href="([^"]+)"', nav) == expected_nav, file
    assert source.count('aria-label="Breadcrumb"') == (0 if file.name in ['index.html','404.html'] else 1)
sitemap = ElementTree.parse('dist/sitemap.xml')
locations = {node.text for node in sitemap.findall('.//{*}loc')}
assert locations == {base + ('' if p.name == 'index.html' else p.name) for p in Path('dist').glob('*.html') if p.name != '404.html'}
assert 'content="noindex"' in Path('dist/404.html').read_text()
print('PASS: unique SEO metadata, structured data, shared navigation, breadcrumbs and complete sitemap')

# Crawler policy and collection schema must agree with visible page anchors.
from urllib.robotparser import RobotFileParser
robots = RobotFileParser(); robots.parse(Path('dist/robots.txt').read_text().splitlines())
assert robots.site_maps() == [base + 'sitemap.xml']
for crawler in ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot']:
    assert all(robots.can_fetch(crawler, url) for url in locations), crawler
for file in Path('dist').glob('*.html'):
    source = file.read_text()
    policies = re.findall(r'<meta name="robots" content="([^"]+)"', source)
    assert len(policies) == 1 and ('noindex' in policies[0]) == (file.name == '404.html'), file
    graph = json.loads(re.search(r'<script type="application/ld\+json">(.*?)</script>',source).group(1))['@graph']
    for node in graph:
        if node['@type'] != 'ItemList': continue
        assert [i['position'] for i in node['itemListElement']] == list(range(1,len(node['itemListElement'])+1))
        for item in node['itemListElement']:
            path=urlsplit(item['url']); target=Path('dist')/path.path.lstrip('/')
            assert target.exists()
            assert not path.fragment or path.fragment in Page(target.read_text()).ids
for link in re.findall(r'\]\((https://[^)]+)\)', Path('dist/llms.txt').read_text()):
    assert (Path('dist')/urlsplit(link).path.lstrip('/')).is_file(), link
assert 'https://sight.ieee.org/sight-groups/' not in Path('dist/index.html').read_text()
print('PASS: crawler access, robots directives, collection schema anchors and AI text directory links')
