"""Run: python3 audit-live.py [--external]. Read-only live HTTP crawl using curl."""
import concurrent.futures, json, pathlib, subprocess, sys
from html.parser import HTMLParser
from urllib.parse import urlsplit
base='https://sight.ieeekerala.org/'
class Links(HTMLParser):
    def __init__(self): super().__init__(); self.links=set()
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='a' and a.get('href','').startswith('https:'): self.links.add(a['href'].split('#')[0])
def check(url):
    p=subprocess.run(['curl','--http1.1','-sS','-L','--max-time','25','--retry','1','-o','/dev/null','-w','%{http_code} %{url_effective} %{content_type} %{time_total}',url],capture_output=True,text=True)
    return {'url':url,'result':p.stdout,'error':p.stderr.strip(),'ok':p.returncode==0 and p.stdout.startswith('200 ')}
paths=[p.relative_to('dist').as_posix() for p in pathlib.Path('dist').rglob('*') if p.is_file() and not p.name.startswith('.')]
urls=[base+('' if p=='index.html' else p) for p in paths if p!='404.html']
if '--external' in sys.argv:
    parser=Links()
    for p in pathlib.Path('dist').glob('*.html'): parser.feed(p.read_text())
    urls=sorted(u for u in parser.links if not u.startswith(base))
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool: results=list(pool.map(check,urls))
path=pathlib.Path('outputs/audit-external.json' if '--external' in sys.argv else 'outputs/audit-live.json')
path.parent.mkdir(exist_ok=True); path.write_text(json.dumps(results,indent=2))
print(f'{sum(r["ok"] for r in results)}/{len(results)} responses OK; report: {path}')
for r in results:
    if not r['ok']: print(r)
if '--external' not in sys.argv:
    for url in ['http://sight.ieeekerala.org/','https://sight.ieeekerala.org/index.html','https://sight.ieeekerala.org/audit-missing/page']:
        result=check(url); print(result)
        assert result['result'].startswith('404 ' if 'audit-missing' in url else '200 '+base+' '), result
    assert all(r['ok'] for r in results), 'See failed responses in audit report'
