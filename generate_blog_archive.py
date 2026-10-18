"""Refresh crawlable blog archive cards from published, canonical article HTML."""
from pathlib import Path
from html.parser import HTMLParser
from html import escape
import re

ROOT = Path(__file__).resolve().parent
CATEGORIES = {'education':'Education','general-knowledge':'General knowledge','finance':'Finance & money','health-fitness':'Health & fitness','travel':'Travel','sports':'Sports','technology':'Technology','business-career':'Business & career','lifestyle':'Lifestyle'}

class Metadata(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta={}; self.canonical=''; self.heading=[]; self.depth=0
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='h1': self.depth+=1
    def handle_endtag(self,tag):
        if tag=='h1': self.depth=0
    def handle_data(self,data):
        if self.depth:self.heading.append(data.strip())

def build():
    articles=[]
    for path in sorted((ROOT/'blog').rglob('index.html')):
        relative=path.relative_to(ROOT)
        if relative==Path('blog/index.html') or (len(relative.parts)==3 and relative.parts[1] in CATEGORIES):continue
        parser=Metadata();parser.feed(path.read_text())
        url='/'+str(relative.parent)+'/'
        if 'noindex' in parser.meta.get('robots','').lower():continue
        if parser.canonical and parser.canonical!='https://www.calcuportal.com'+url:continue
        title=' '.join(filter(None,parser.heading))
        if not title:continue
        category=relative.parts[1] if relative.parts[1] in CATEGORIES else 'everyday'
        if category=='everyday':
            slug=relative.parts[1]
            if 'iphone' in slug:category='technology'
            elif 'emi' in slug:category='finance'
            elif 'bmi' in slug:category='health-fitness'
            elif 'important-days' in slug:category='general-knowledge'
        articles.append((title,url,parser.meta.get('description','Explore this guide from CalcuPortal.'),category))
    articles.sort(key=lambda a:a[0].casefold())
    cards=[]
    labels={**CATEGORIES,'everyday':'Everyday & math'}
    for title,url,desc,category in articles:
        cards.append(f'<a class="latest-card" data-topic="{category}" href="{url}"><span class="story-tag">{escape(labels[category])}</span><h3>{escape(title)}</h3><p>{escape(desc)}</p><span class="text-link">Read article →</span></a>')
    path=ROOT/'blog/index.html';html=path.read_text()
    html=re.sub(r'<!-- ARTICLE_CARDS_START -->.*?<!-- ARTICLE_CARDS_END -->','<!-- ARTICLE_CARDS_START -->\n'+'\n'.join(cards)+'\n<!-- ARTICLE_CARDS_END -->',html,flags=re.S)
    options=''.join(f'<option value="{key}">{escape(value)}</option>' for key,value in labels.items() if any(a[3]==key for a in articles))
    html=re.sub(r'<!-- TOPIC_OPTIONS_START -->.*?<!-- TOPIC_OPTIONS_END -->','<!-- TOPIC_OPTIONS_START -->'+options+'<!-- TOPIC_OPTIONS_END -->',html,flags=re.S)
    path.write_text(html)
    print(f'Refreshed {len(articles)} crawlable article links.')

if __name__=='__main__':build()
