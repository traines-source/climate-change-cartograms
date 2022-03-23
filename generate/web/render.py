import jinja2
import gettext
import markdown
from pathlib import Path
import sys
sys.path.append('../')
import utils

credits_html = ""
with open("credits.md", "r") as file:
    credits_html = markdown.markdown(file.read())

env = jinja2.Environment(
    extensions=['jinja2.ext.i18n'],
    loader=jinja2.FileSystemLoader('./')
)

mappings = utils.read_json("../emissions/mappings.json")

binaries = []
binaries.extend(mappings["year"]["mapping"])
binaries.extend(mappings["parameters"]["mapping"])
binaries.extend(mappings["metrics"]["mapping"])
binaries.extend(mappings["impacts"]["mapping"])

locales = ["en", "de"]
for locale in locales:
    print(locale)
    tr = gettext.translation(domain='messages', localedir='locale/', languages=[locale])
    tr.install()
    env.install_gettext_translations(tr, newstyle=True)

    tm = env.get_template('index.tmpl.html')
    html = tm.render(mappings=mappings, binaries=binaries, credits=credits_html)
   
    Path("working/"+locale).mkdir(parents=True, exist_ok=True)
    with open("working/"+locale+"/index.html", "w") as outf:
        outf.write(html)