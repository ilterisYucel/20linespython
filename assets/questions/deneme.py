import urllib.request as u_req
from html.parser import HTMLParser

def get_html_content(url):
    try:
        connection = u_req.urlopen(url)
        html = connection.read()
        connection.close()
    except u_req.HTTPError:
        print("Error while fetching {}".format(url))
        return
    return(html.decode("utf-8"))
    
class ExtractLinks(HTMLParser):
    def handle_starttag(self, tag, attrs):
        if tag == "a":
            for k,v in attrs:
                if(k == "href"):
                    print(v)
content = get_html_content("https://www.gnu.org/")
parser = ExtractLinks()
parser.feed(content)

