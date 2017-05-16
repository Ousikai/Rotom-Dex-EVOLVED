#Credit to 'heltonbiker' at http://stackoverflow.com/questions/11350464/extract-image-links-from-the-webpage-using-python
import urllib, re

source = urllib.urlopen('http://www.serebii.net/sunmoon/zygarde.shtml').read()

for link in re.findall('zygarde/[a-zA-Z]*/[0-9]*.png', source):
    #[a-zA-Z_0-9]*
    #print link
    filename = link.split('/')[-2]+ "-"+  link.split('/')[-1]
    filelink = 'http://www.serebii.net/sunmoon/' + link
    #print filelink
    urllib.urlretrieve(filelink, filename)
